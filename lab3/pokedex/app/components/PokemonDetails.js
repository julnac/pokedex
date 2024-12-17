'use client';
import {useEffect, useState} from "react";
import Image from "next/image";

export default function PokemonDetails({id}) {
    const [pokemon, setPokemon] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchPokemon() {
            try {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
                if (!response.ok) throw new Error('Failed to fetch Pokémon details');
                const data = await response.json();
                setPokemon(data);
            } catch (err) {
                setError(err.message);
            }
        }
        fetchPokemon();
    }, [id]);

    if (error) {
        return <p>{error}</p>;
    }

    if (!pokemon) {
        return <p>Loading...</p>;
    }

    return (
        <aside>
            <div key={pokemon.id}>
                <h2>{pokemon.name}</h2>
                <Image
                    src={pokemon.sprites.front_default}
                    alt={pokemon.name}
                    width="200"
                    height="200"
                />
                <div key="details-container" className="aside-description">
                    <p><strong>Type:</strong> {pokemon.types.map(type => type.type.name).join(', ')}</p>
                    <p><strong>Height:</strong> {pokemon.height / 10} m</p>
                    <p><strong>Weight:</strong> {pokemon.weight / 10} kg</p>
                </div>
            </div>
        </aside>
    )
}
