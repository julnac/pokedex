import PokemonFullDetail from "@/app/components/PokemonFullDetail";
import Link from "next/link";
import NotesList from "@/app/components/NotesList";

export default async function PokemonPage({ params }) {
    const p = await params;
    const id = parseInt(p.id);

    return (
        <div className="pfd-page-wrapper">
            {/* Integrated top bar with back + prev/next */}
            <div className="pfd-topbar">
                <Link className="pfd-topbar-back" href="/pokemon">
                    ← Pokédex
                </Link>
                <div className="pfd-topbar-nav">
                    {id > 1 && (
                        <Link className="pfd-topbar-btn" href={`/pokemon/${id - 1}`}>
                            ‹ Prev
                        </Link>
                    )}
                    <span className="pfd-topbar-id">#{String(id).padStart(3, '0')}</span>
                    <Link className="pfd-topbar-btn" href={`/pokemon/${id + 1}`}>
                        Next ›
                    </Link>
                </div>
            </div>
            <PokemonFullDetail id={id} />
            <NotesList id={id} />
        </div>
    )
}