import ProductList from '@/components/product-list'
import Gallery from '@/components/gallery';
import Info from '@/components/info';
import getProduct from '@/actions/get-product';
import Container from '@/components/ui/container';
import prismadb from '@/lib/prismadb';
import { Product } from '@/types';

export const revalidate = 0;

interface ProductPageProps {
  params: {
    productId: string;
  },
}

const ProductPage: React.FC<ProductPageProps> = async ({ 
  params
 }) => {
  const product = await getProduct(params.productId);
  const suggestedProducts = await prismadb.product.findMany({
    where:{
      categoryId: product?.category?.id
    } ,
    include:{
      images:true,
      category:true
    }
  });


  const formattedproducts: Product[] = suggestedProducts.map((item) => ({
    id: item.id,
    name: item.name,
    images:item.images,
    price: parseFloat(item.price.toString()),
    category: item.category
  }));
  if (!product) {
    return null;
  }

  return (
    <div className="bg-white">
      <Container>
        <div className="px-4 py-10 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
            <Gallery images={product.images} />
            <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
              <Info data={product} />
            </div>
          </div>
          <hr className="my-10" />
          <ProductList title="Related Items" items={suggestedProducts} />
        </div>
      </Container>
    </div>  
  )
}

export default ProductPage;
