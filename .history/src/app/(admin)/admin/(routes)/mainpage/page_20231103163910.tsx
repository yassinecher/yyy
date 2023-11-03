import { format } from "date-fns";

import prismadb from "@/lib/prismadb";

import { BillboardClient } from "./components/client";
import {Navbar} from "./components/Navbar";
type LocalCathegorilab = {
  id  :            String  ,        
 index  :         number ,
 catId :          String , 
 Label  :         String
}
type LocalCathegoryCollection={
  id       :       String        
  Label     :      String
  index      :     number 
  CathegoryCollectiondata :LocalCathegorilab[]
}
interface NavbarCollection {
  data: LocalCathegoryCollection[];
}
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
  const NavbarCollection = await prismadb.cathegoryCollection.findMany({
    include:{
      catgories:true
    }
  });
  const NavbarCollections: LocalCathegoryCollection[] = NavbarCollection.map((i) => ({
    id: i.id,
    CathegoryCollectiondata: i.catgories.map((val) => ({
      id: val.id,
      index: parseInt(val.index.toString()),
      catId: val.catId,
      Label: val.Label,
      
    }) ),
    Label: i.Label,
    index:parseInt(i.index.toString())
  }) );

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
        <Navbar  data={NavbarCollections} />
        <BillboardClient data={formattedBillboards} />
      </div>
    </div>
  );
};

export default BillboardsPage;
