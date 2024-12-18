'use client'

import {useEffect, useState} from "react";
import Image from "next/image";
import Link from "next/link";

export default function PokemonCard({ pokemon }) {

    const [isFavorite, setIsFavorite] = useState(false)

    useEffect(() => {
        const favorites = JSON.parse(localStorage.getItem("favorites") || '[]');
        setIsFavorite(favorites.includes(pokemon.name));
    }, [pokemon.name]);

    const toggleFavorite = () => {
        const favorites = JSON.parse(localStorage.getItem("favorites") || '[]');
        if (isFavorite) {
            const updatedFavorites = favorites.filter(name => name !== pokemon.name);
            localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        } else {
            favorites.push(pokemon.name);
            localStorage.setItem('favorites', JSON.stringify(favorites));
        }
        setIsFavorite(!isFavorite);
    }

    return (
        <div>
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
            <button
                onClick={toggleFavorite}
                style={{
                    marginTop: '10px',
                    padding: '8px 12px',
                    backgroundColor: isFavorite ? '#ff6961' : '#77dd77',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                }}
            >
                {isFavorite ? 'Usuń z ulubionych' : 'Dodaj do ulubionych'}
            </button>
        </div>
)
}