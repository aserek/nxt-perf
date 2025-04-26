import fetcher from "../actions/fetcher"
import { ProductsResponse } from "../lib/types/products"

import LoadMore from "./load-more"

export default async function Product() {
    const { products, total, skip } = await fetcher<ProductsResponse>({
        url: `${process.env.BASE_URL}/products`,
        method: 'GET'
    })

    console.log(skip, "skip range")

    return (
        <div className="flex justify-center mx-auto">
            <LoadMore offset={skip + 30} initialItems={products} />
        </div >
    )
}