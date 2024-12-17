import PokemonDetails from "@/app/components/PokemonDetails";

export default function PokemonPage ({ params }){
    const { id } = params;

    return (
        <div>
            <PokemonDetails id={id}/>
        </div>
    )
}