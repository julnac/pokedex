import Link from "next/link";

export default function PokemonDetailLayout({children}) {
    return (
        <div>
            <nav>
                <Link href="/pokemon">Back to List</Link>
                <span> / </span>
                <Link href="#">Details</Link>
            </nav>
            <div>
                <button>Previous</button>
                <button>Next</button>
            </div>
            {children}
        </div>
    )
}