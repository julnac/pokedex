import PokemonDetails from "@/app/components/PokemonDetails";
import Link from "next/link";

export default function PokemonPage ({ params }){
    const id = parseInt(params.id, 10);

    return (
        <div>
            <div>
                {id > 1 && (
                    <Link href={`/pokemon/${id - 1}`}>Previous</Link>
                )}
                <Link href={`/pokemon/${id + 1}`}>Next</Link>
            </div>
            <PokemonDetails id={id}/>
        </div>
    )
}