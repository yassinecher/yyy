
import prismadb from "@/lib/prismadb";
import { ImageResponse } from "next/server";

export const size = {
  width: 900,
  height: 450,
};

export const contentType = "image/png";

interface Props {
  params: {
    productId: string;
  };
}

export default async function og({ params }: Props) {
  const prod = await prismadb.product.findFirst({
    where:{id:params.productId},
    include:{
        images:true
    }
  })
  return new ImageResponse(
    (
      <div tw="relative flex items-center justify-center">
      

      </div>
    ),
    size
  );
}