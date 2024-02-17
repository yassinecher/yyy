import ProductCard from "@/components/ui/product-card";
import { Product } from "@/types";
import NoResults from "@/components/ui/no-results";

interface ProductListProps {
  title: string;
  items: Product[]
}

const ProductList: React.FC<ProductListProps> = ({
  title,
  items
}) => {
  return (
    <div className={"lg:container  my-28 py-0 sm:mx-0 lg:py-5 rounded-md " + (title.includes(" Similaires") ? "bg-transparent" : "dark:bg-[#26143ad5] bg-[#ffffffa8]")}>

      
      <h3 className="font-bold text-3xl my-5">{title}</h3>
      {items.length === 0 && <NoResults />}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item) => (
          <ProductCard key={item.id} data={item} />
        ))}
      </div>
    </div>
   );
}
 
export default ProductList;
