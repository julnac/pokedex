import Link from "next/link";

export default function PokemonDetailLayout({children}) {
    return (
        <div className="pokemon-detail-layout">
            <nav className="details-navbar">
                <Link href="/pokemon">Back to List</Link>
            </nav>
            {children}
        </div>
    )
}