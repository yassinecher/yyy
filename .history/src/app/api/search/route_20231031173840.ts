import prismadb from "@/lib/prismadb";
import { Product } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function GET(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const { q: query } = req.query;

      if (typeof query !== "string") {
        throw new Error("Invalid request");
      }

      /**
       * Search posts
       */
      const posts: Array<Product> = await prismadb.product.findMany({
        where: {
          OR: [
            {
              name: {
                contains: query,
                mode: "insensitive",
              },
            },
            {
              category: {
                name: {
                  contains: query,
                  mode: "insensitive",
                },
              },
            },
          ],
        },
        include: {
          category: true,
        },
      });

      /**
       * Save search
       */
      await prismadb.searchQuery.create({
        data: {
          query,
        },
      });

      return NextResponse.json(posts);
    } catch (error: any) {
      console.log(error);
      res.status(500).end();
    }
  }
}