
import { NextResponse } from 'next/server';


import prismadb from '@/lib/prismadb';
import { NextApiRequest, NextApiResponse } from 'next';
import { checkItemGroups } from '@/app/(storefront)/build-pc/_componenets/Motherboard';


export async function POST(
  req: Request,
  { params }: { params: { } }
) {
  try {
    const body = await req.json();

    const {
      name,
      price,
      categoryId,
      images,
      isFeatured,
      isArchived,
      chipsetId,
      cpusupportId,
      formatId,
      manufacturerId,
      ramslotsId,
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
    if (!chipsetId) {
      return new NextResponse("chipsetId is required", { status: 400 });
    }

    if (!cpusupportId ) {
      return new NextResponse("cpusupportId are required", { status: 400 });
    }

    if (!formatId) {
      return new NextResponse("formatId is required", { status: 400 });
    }

    if (!ramslotsId) {
      return new NextResponse("Category id is required", { status: 400 });
    }
    if (!stock) {
      return new NextResponse("Category id is required", { status: 400 });
    }





   const motherboard = await prismadb.motherboard.create({
  data: {
    chipsetId: chipsetId,
    cpusupportId: cpusupportId,
    formatId: formatId,
    manufacturerId: manufacturerId,
    ramslotsId: ramslotsId,
    products: {
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
      }

    },
    images: {
      createMany: {
        data: images.map((image: { url: string }) => ({
          url: image.url,
        })),
      }
       // Replace any with the actual data types from your Prisma schema
  
   
  },
    }
   }}
});

    

    return  NextResponse.json(motherboard);
  } catch (error) {
    console.log('[MOTHERBOARD_POST]', error);
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

    const whereClause: Record<string, any> = {
      motherboard: {
        some: {},
      },
    };

    if (q) {
      whereClause.name = {
        contains: q,
        mode: 'insensitive',
      };
    }

   

    const filterListParam = searchParams.get('filterList');
    if (filterListParam) {
      const decodedFilterList = JSON.parse(decodeURIComponent(filterListParam)) as checkItemGroups;
     
    
      const chipsetFilter = decodedFilterList.motherboardchipset;
    
      if (chipsetFilter && chipsetFilter.length > 0) {
        whereClause.motherboard = {
         some :{
          chipset: {
            name: {
              in: decodedFilterList.motherboardchipset.map(item => item.searchKey),
            },
          },}
         } 
      }
      const motherboardcpusupportFilter = decodedFilterList.motherboardcpusupport;
    
      if (motherboardcpusupportFilter && motherboardcpusupportFilter.length > 0) {
        whereClause.motherboard = {
         some :{
          cpusupport: {
            name: {
              in: decodedFilterList.motherboardcpusupport.map(item => item.searchKey),
            },
          },}
         } 
      }
      const motherboardformatFilter = decodedFilterList.motherboardformat;
    
      if (motherboardformatFilter && motherboardformatFilter.length > 0) {
        whereClause.motherboard = {
         some :{
          format: {
            name: {
              in: decodedFilterList.motherboardformat.map(item => item.searchKey),
            },
          },}
         } 
      }
      
      const motherboardmanufacturerFilter = decodedFilterList.motherboardmanufacturer;
    
      if (motherboardmanufacturerFilter && motherboardmanufacturerFilter.length > 0) {
        whereClause.motherboard = {
         some :{
          manufacturer: {
            name: {
              in: decodedFilterList.motherboardmanufacturer.map(item => item.searchKey),
            },
          },}
         } 
      }
      
      const motherboardramslotsFilter = decodedFilterList.motherboardramslots;
    
      if (motherboardramslotsFilter && motherboardramslotsFilter.length > 0) {
        whereClause.motherboard = {
         some :{
          ramslots: {
            name: {
              in: decodedFilterList.motherboardramslots.map(item => item.searchKey),
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
      orderBy: {
        createdAt: 'desc',
      },
      take: units,
      skip: page * units,
    });
    const total=  await prismadb.product.count({
      where: whereClause,
      orderBy: {
        createdAt: 'desc',
      },
      take: units,
      skip: page * units,
    });
    console.log();
    return NextResponse.json({data:products,total});
  } catch (error) {
    console.error('[PRODUCTS_GET]', error);
    res.status(500).json({ error: 'Internal error' });
  }
}