
import { NextResponse } from 'next/server';


import prismadb from '@/lib/prismadb';
import { checkItemGroups } from '@/app/(storefront)/build-pc/_componenets/Processor';
import { NextApiResponse } from 'next';
import { checkItemGroupsRam } from '@/app/(storefront)/build-pc/_componenets/Ram';

export async function POST(
  req: Request,
  { params }: { params: { } }
) {
  try {
    

    const body = await req.json(); 

    const { name, price, categoryId,  images, isFeatured, isArchived ,marqueId,numberId
,typeId,frequencyId,rgb,
description,
stock,
dicountPrice,
additionalDetails
} = body; 
   
    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!images || !images.length) {
      return new NextResponse("Images are required", { status: 400 });
    }

    if (!price) {
      return new NextResponse("Price is required", { status: 400 });
    }

    if (!categoryId) {
      return new NextResponse("Category id is required", { status: 400 });
    }
console.log("dazdz")


    const product = await prismadb.memory.create({
        data:{
            frequencyId,
            typeId,
            marqueId,
            numberId,
            rgb,
            products:{
                create:{
                   
               
      name,
      price: price,
      isFeatured: isFeatured,
      isArchived: isArchived,
      description:description,
      categoryId: categoryId,
      stock:stock,
      dicountPrice:dicountPrice,
      additionalDetails: {
        createMany: {
          data: [...additionalDetails]
        },},
      images: {
        createMany: {
          data: images.map((image: { url: string }) => ({
            url: image.url,
          })),
        }
         // Replace any with the actual data types from your Prisma schema
    
     
    },}
        }
     
      }
    });
  
    return NextResponse.json(product);
  } catch (error) {
    console.log('[PRODUCTS_POST]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export async function GET(req: Request, res: NextApiResponse) {
  try {
    const { searchParams } = new URL(req.url || '', 'http://localhost');

    const page = parseInt(searchParams.get('page') || '0');
    const units = parseInt(searchParams.get('units') || '14') || 14;
    const q = searchParams.get('q') || '';
    const isFeatured = searchParams.get('isFeatured');
    const sort = searchParams.get('sort') || '';
    const whereClause: Record<string, any> = {
      memories: {
        some: {},
      },
    };

    if (q) {
      whereClause.name = {
        contains: q,
        mode: 'insensitive',
      };
    }
    let orderByClause: Record<string, 'asc' | 'desc'> = {};

    if (sort && sort.length > 0) {
      switch (sort) {
        case 'Les plus populaires':
          orderByClause = {
            soldnumber: 'desc',
          };
          break;
        case 'Les plus récents':
          orderByClause = {
            price: 'desc', // or 'desc' depending on your preference
          };
          break;
        case 'Les plus récents':
          orderByClause = {
            createdAt: 'asc', // or 'desc' depending on your preference
          };
          break;
        case 'Prix : Croissant':
          orderByClause = {
            price: 'asc', // or 'desc' depending on your preference
          };
          break;
        case 'Prix : Décroissant':
          orderByClause = {
            price: 'desc', // or 'desc' depending on your preference
          };
          break;
        // Add more cases for other fields you want to support
        default:
          // Default sorting if no match is found
          orderByClause = {
            createdAt: 'desc',
          };
      }
    }
 

    const filterListParam = searchParams.get('filterList');
    if (filterListParam) {
      const decodedFilterList = JSON.parse(decodeURIComponent(filterListParam)) as checkItemGroupsRam;
     
    
      
      const motherboardcpusupportFilter = decodedFilterList.memoryFrequency;
    
      if (motherboardcpusupportFilter && motherboardcpusupportFilter.length > 0) {
        whereClause.memories = {
         some :{
          frequency: {
            name: {
              in: decodedFilterList.memoryFrequency.map(item => item.searchKey),
            },
          },}
         } 
      }
      const motherboardformatFilter = decodedFilterList.memoryNumber;
    
      if (motherboardformatFilter && motherboardformatFilter.length > 0) {
        whereClause.memories = {
         some :{
          number: {
            name: {
              in: decodedFilterList.memoryNumber.map(item => item.searchKey),
            },
          },}
         } 
      }
      
      const motherboardmanufacturerFilter = decodedFilterList.memoryType;
    
      if (motherboardmanufacturerFilter && motherboardmanufacturerFilter.length > 0) {
        whereClause.memories = {
         some :{
          type: {
            name: {
              in: decodedFilterList.memoryType.map(item => item.searchKey),
            },
          },}
         } 
      }
      const memoryMarqueFilter = decodedFilterList.memoryMarque;
    
      if (memoryMarqueFilter && memoryMarqueFilter.length > 0) {
        whereClause.memories = {
         some :{
          marque: {
            name: {
              in: decodedFilterList.memoryMarque.map(item => item.searchKey),
            },
          },}
         } 
      }
    
      
    } 

    const products = await prismadb.product.findMany({
      where: whereClause,
      include: {
        motherboard: true,
        images: true,
      },
      orderBy: orderByClause,
      take: units,
      skip: page * units,
    });
    const total=  await prismadb.product.count({
      where: whereClause,
    
   
    });
    console.log();
    return NextResponse.json({data:products,total});
  } catch (error) {
    console.error('[PRODUCTS_GET]', error);
    res.status(500).json({ error: 'Internal error' });
  }
}