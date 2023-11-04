import Container from "@/components/ui/container";
import Skeleton from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <Container>
    <div className="w-full h-full p-8">
      <div className="mx-auto px-4 py-10 sm:px-6 max-w-7xl lg:px-8">
        
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <Skeleton className="aspect-square rounded-xl" />
          <Skeleton className="aspect-square rounded-xl" />
          <Skeleton className="aspect-square rounded-xl" />
        </div>
      </div>
    </div>
  </Container>
  );
}
 
export default Loading;
