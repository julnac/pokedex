import Image from "next/image";
import Link from "next/link";
import {useSearchParams} from "next/navigation";

export default function PokemonList({ pokemons }) {
    const searchParams = useSearchParams();

    const typeFilter = searchParams.get("type") || '';
    const searchFilter = searchParams.get("search") || '';
    const limit = parseInt(searchParams.get('limit') || '20', 10);

    const filteredPokemons = pokemons
        .filter((pokemon) => {
            console.log(pokemon.types);
            const matchesName = pokemon.name.toLowerCase().includes(searchFilter.toLowerCase());
            const matchesType = typeFilter
                ? pokemon.types.some((t) => t.type.name.toLowerCase() === typeFilter.toLowerCase())
                : true;
            return matchesName && matchesType;
        })
        .slice(0, limit);

    // const filteredPokemons = pokemons.filter((pokemon) =>
    //     pokemon.name.toLowerCase().includes(filter)
    // );

    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', padding: '20px' }}>
        {filteredPokemons.map((pokemon) => (
            <Link key={pokemon.id} href={`/pokemon/${pokemon.id}`} preload={false}>
                <Image
                    src={pokemon.image}
                    alt={pokemon.name}
                    width="200"
                    height="200"
                />
                <div className="container-description">
                    <h2>{pokemon.name}</h2>
                    <h3>ID: {pokemon.id}</h3>
                </div>
            </Link>
        ))}
      </div>
    );
}
