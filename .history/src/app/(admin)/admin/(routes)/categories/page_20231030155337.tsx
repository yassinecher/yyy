import { format } from "date-fns";

import prismadb from "@/lib/prismadb";

import { CategoryColumn } from "./components/columns"
import { CategoriesClient } from "./components/client";

const CategoriesPage = async ({
  params
}: {
  params: {  }
}) => {
  const categories = await prismadb.category.findMany({
 
    orderBy: {
      createdAt: 'desc'
    }
  });
console.log(categories)
  const formattedCategories: CategoryColumn[] = categories.map((item) => ({
    id: item.id,
    name: item.name,
    createdAt: format(item.createdAt, 'MMMM do, yyyy'),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoriesClient data={formattedCategories} />
      </div>
    </div>
  );
};

export default CategoriesPage;
