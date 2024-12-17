import Image from "next/image";
import Link from "next/link";

export default function PokemonList({ pokemons, filter }) {

    const filteredPokemons = pokemons.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(filter)
    );

    return (
      <div className="pokedex">
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
