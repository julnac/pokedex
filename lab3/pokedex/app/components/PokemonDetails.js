'use client';
import {useEffect, useState} from "react";
import Image from "next/image";
import './PokemonDetails.css';

export default function PokemonDetails({id}) {
    const [pokemon, setPokemon] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (id === undefined || id === null) {
            setPokemon("empty")
            return
        }
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
        return (
            <div className="pokemon-detail-container">
                <div className="pokemon-detail-card">
                    <p>Loading...</p>
                </div>
            </div>);
    }

    if (pokemon === "empty") {
        return (
            <div className="pokemon-detail-container">
                <div className="pokemon-detail-card">
                    <p>Empty</p>
                </div>
            </div>);
    }

    return (
        <div key={pokemon.id} className="pokemon-detail-container">
            <div className="pokemon-detail-card">
                <h2 className="pokemon-name">{pokemon.name}</h2>
                <Image
                    src={pokemon.sprites.front_default}
                    alt={pokemon.name}
                    width="300"
                    height="300"
                    className="pokemon-image"
                />
                <div key={pokemon.id} className="details-container">
                    <p><strong>Type:</strong> {pokemon.types.map(type => type.type.name).join(', ')}</p>
                    <p><strong>Height:</strong> {pokemon.height / 10} m</p>
                    <p><strong>Weight:</strong> {pokemon.weight / 10} kg</p>
                </div>
            </div>
        </div>
    )
}
