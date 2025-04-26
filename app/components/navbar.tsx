import Link from "next/link";


export default function NavBar() {
    return (
        <nav className="flex items-center justify-center w-full p-3 max-h-10 gap-3 border-b ">
            <Link href="/products">
                <button className="cursor-pointer text-white p-2 rounded">Products</button>
            </Link>
            <Link href="/comments">
                <button className="cursor-pointer text-white p-2 rounded"> Comments</button>
            </Link>
            <Link href="/quotes">
                <button className="cursor-pointer text-white p-2 rounded"> Quotes</button>
            </Link>
        </nav>
    )
}