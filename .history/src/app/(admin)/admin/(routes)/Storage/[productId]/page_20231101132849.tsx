import prismadb from "@/lib/prismadb";

import { ProductForm } from "./components/product-form";

const ProductPage = async ({
  params
}: {
  params: { productId: string, storeId: string }
}) => {
  const product = await prismadb.product.findUnique({
    where: {
      id: params.productId,
    },
    include: {
      images: true,
      storages:true
    }
  });
 
  const categories = await prismadb.category.findMany({
  });
  const HarddiskType = await prismadb.harddiskType.findMany()
  const HarddiskComputerinterface= await prismadb.harddiskComputerinterface.findMany()
  const HarddiskCapacity= await prismadb.harddiskCapacity.findMany()
  const harddiskDiscFormat= await prismadb.harddiskDiscFormat.findMany()
 const HarddiskBrand= await prismadb.harddiskBrand.findMany()
  return ( 
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductForm 


          categories={categories}
          HarddiskBrand={HarddiskBrand}
          HarddiskType={HarddiskType}
          HarddiskComputerinterface={HarddiskComputerinterface}
          HarddiskCapacity={HarddiskCapacity}
          HarddiskDiscFormat={harddiskDiscFormat} 

          initialData={product}        />
      </div>
    </div>
  );
}

export default ProductPage;
