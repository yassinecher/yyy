import { format } from "date-fns";

import prismadb from "@/lib/prismadb";
import { formatter } from "@/lib/utils";

import { ProductsClient } from "./components/client";
import { ProductColumn } from "./components/columns";


const ProductsPage = async ({
  params
}: {
  params: { storeId: string }
}) => {
  const products = await prismadb.product.findMany({
    where:{
      FullPack:{
      some: {}
     },
    },
    include: { 
      category: true,
      FullPackOrderScreen:true,
      FullPackOrderUnity:true,
      FullPack:{
        include:{
          Product:true
        }
      }

    },
    orderBy: {
      createdAt: 'desc'
    }
  });

console.log(products)
  const formattedProducts: ProductColumn[] = products.map((item) => ({
    id: item.id,
    name: item.name,
    isFeatured: item.isFeatured,
    isArchived: item.isArchived,
    price: formatter.format(item.price.toNumber()),
    category: item.category.name,

    createdAt: format(item.createdAt, 'MMMM do, yyyy'),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductsClient data={formattedProducts} />
      </div>
    </div>
  );
};

export default ProductsPage;
