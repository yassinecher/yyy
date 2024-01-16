
import { NextResponse } from 'next/server';


import prismadb from '@/lib/prismadb';
import { NextApiRequest, NextApiResponse } from 'next';


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
interface MyQuery {
  filterList?: string; // assuming 'filterList' is a string, adjust as needed
  // Add other query parameters if needed
}
export async function GET(
  req: NextApiRequest & { query: MyQuery }, res: NextApiResponse
  
) {
  try {
   
    console.log(req)
    const { filterList } = req.query;

    const decodedFilterList = filterList ? JSON.parse(decodeURIComponent(filterList as string)) : null;

    const { searchParams } = new URL(req.url || '', '/api/motherboard/component'); // Use a base URL, replace with your actual base URL
 const categoryId = searchParams.get('categoryId') || undefined;
    const page = parseInt(searchParams.get('page') ||'0');
    const units =parseInt(searchParams.get('units') ||'4')|| 4 ;
    const q = searchParams.get('q') ||'';
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



    const products = await prismadb.product.findMany({
     where: whereClause,
      include: {
        motherboard: true,
        images:true,
  
      },
      orderBy: {
        createdAt: 'desc',
      },
      take:units,
      skip:  page * (units || 0) ,
    });
    
    return NextResponse.json(products);
  } catch (error) {
    console.log('[PRODUCTS_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
