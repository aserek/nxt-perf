import Comments from "../components/comments"
import Product from "../components/products"
import Quotes from "../components/quotes"

export const dynamicParams = true; // Allow runtime generation (default)

export async function generateStaticParams() {
    return ['comments', 'quotes', 'products'].map((folder) => ({ folder }));
}


export default async function NextPerf({ params }: { params: Promise<{ folder: string }> }) {
    const { folder } = await params

    switch (folder.trim().toLowerCase()) {
        case "comments": return <Comments />
        case "products": return <Product /> 
        case "quotes": return <Quotes />
        default: return <div>NextPerf Main</div>
    }
}
