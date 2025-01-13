import PokemonDetails from "@/app/components/PokemonDetails";
import Link from "next/link";
import NotesList from "@/app/components/NotesList";

export default async function PokemonPage ({ params }){
    const p = await params;
    const id = parseInt(p.id);

    return (
        <div>
            <div className="detail-nav-buttons">
                {id > 1 && (
                    <Link className="detail-nav-button" href={`/pokemon/${id - 1}`}>Previous</Link>
                )}
                <Link className="detail-nav-button" href={`/pokemon/${id + 1}`}>Next</Link>
            </div>
            <PokemonDetails id={id}/>
            <NotesList id={id}/>
        </div>
    )
}