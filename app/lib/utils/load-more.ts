import fetcher from "@/app/actions/fetcher";
import { ProductsResponse } from "../types/products";

export const loadmore = async (folder: string = "", offset: number) => {
  await console.log("BASE:", process.env.NEXT_PUBLIC_BASE_URL);
  if (!process.env.NEXT_PUBLIC_BASE_URL) {
    throw new Error("BASE_URL environment variable is not defined");
  }

  const url = new URL(
    `${folder}?limit=10&skip=${offset}`,
    process.env.NEXT_PUBLIC_BASE_URL
  );
  console.log("Fetching from:", url.toString());

  return await fetcher<ProductsResponse>({
    url: url.toString(),
    method: "GET",
    cache: "force-cache",
    nextOptions: { revalidate: 60 }, // ISR-like caching
  });
};
