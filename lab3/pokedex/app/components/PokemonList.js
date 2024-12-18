import {useSearchParams} from "next/navigation";
import PokemonCard from "@/app/components/PokemonCard";

export default function PokemonList({ pokemons }) {
    const searchParams = useSearchParams();

    const typeFilter = searchParams.get("type") || '';
    const searchFilter = searchParams.get("search") || '';
    const limit = parseInt(searchParams.get('limit') || '20', 10);

    const filteredPokemons = pokemons
        .filter((pokemon) => {
            const matchesName = pokemon.name.toLowerCase().includes(searchFilter.toLowerCase());
            const matchesType = typeFilter
                ? pokemon.types.some((t) => t.type.name.toLowerCase() === typeFilter.toLowerCase())
                : true;
            return matchesName && matchesType;
        })
        .slice(0, limit);

    return (
      <div className="pokemon-list-container">
        {filteredPokemons.map((pokemon) => (
            <PokemonCard pokemon={pokemon} key={pokemon.id} />
        ))}
      </div>
    );
}
