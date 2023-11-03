import { format } from "date-fns";

import prismadb from "@/lib/prismadb";

import { BillboardClient } from "./components/client";
import {Navbar} from "./components/Navbar";

 type SlidesColumn = {
  id: string
  title: string;
  imageUrl: string;
  description: string;
  url: string;
  discount:number;
  createdAt: string;
}
const BillboardsPage = async ({
  params
}: {
  params: { storeId: string }
}) => {
  const billboards = await prismadb.slide.findMany({
  });

  const formattedBillboards: SlidesColumn[] = billboards.map((item) => ({
    id: item.id,
    title: item.title,
    description:item.description,
    imageUrl:item.imageUrl,
    url:item.url,
    discount:item.discount,
    createdAt: format(item.createdAt, 'MMMM do, yyyy'),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Navbar  data={formattedBillboards} />
        <BillboardClient data={formattedBillboards} />
      </div>
    </div>
  );
};

export default BillboardsPage;
