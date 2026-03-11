'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import './PokemonCard.css';

const TYPE_COLORS = {
    normal: '#a8a878',
    fire: '#fd7d24',
    water: '#4592c4',
    electric: '#f5c731',
    grass: '#49d0b0',
    ice: '#98d8d8',
    fighting: '#c03028',
    poison: '#a040a0',
    ground: '#e0c068',
    flying: '#a890f0',
    psychic: '#f85888',
    bug: '#a8b820',
    rock: '#b8a038',
    ghost: '#705898',
    dragon: '#7038f8',
    dark: '#705848',
    steel: '#b8b8d0',
    fairy: '#ee99ac',
};

export default function PokemonCard({ pokemon }) {
    const [isFavorite, setIsFavorite] = useState(false);
    const [isCompared, setIsCompared] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
            setIsFavorite(favorites.includes(pokemon.name));

            const comparison = JSON.parse(localStorage.getItem('comparison') || '[]');
            setIsCompared(comparison.includes(pokemon.id));
        }
    }, [pokemon]);

    const toggleCompared = () => {
        const compare = JSON.parse(localStorage.getItem('comparison') || '[]');
        if (isCompared) {
            const updatedCompare = compare.filter((id) => id !== pokemon.id);
            localStorage.setItem('comparison', JSON.stringify(updatedCompare));
            setIsCompared(false);
        } else if (compare.length < 2) {
            compare.push(pokemon.id);
            localStorage.setItem('comparison', JSON.stringify(compare));
            setIsCompared(true);
        } else {
            // Replace the first one
            alert('Comparison is full (2/2). Remove one first.');
            return;
        }
        window.dispatchEvent(new Event('comparisonUpdated'));
    };

    const toggleFavorite = () => {
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        if (isFavorite) {
            const updatedFavorites = favorites.filter((name) => name !== pokemon.name);
            localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        } else {
            favorites.push(pokemon.name);
            localStorage.setItem('favorites', JSON.stringify(favorites));
        }
        setIsFavorite(!isFavorite);
        window.dispatchEvent(new Event('favoritesUpdated'));
    };

    const types = pokemon.types.map((t) => t.type.name);

    return (
        <div className="pokemon-card" id={`pokemon-card-${pokemon.id}`}>
            <Link href={`/pokemon/${pokemon.id}`} prefetch={false}>
                <div className="pokemon-image-container">
                    <span className="pokemon-id-tag">#{String(pokemon.id).padStart(3, '0')}</span>
                    <Image
                        src={pokemon.image}
                        alt={pokemon.name}
                        width={140}
                        height={140}
                    />
                </div>
                <div className="pokemon-card-body">
                    <h2 className="pokemon-name">{pokemon.name}</h2>
                    <div className="pokemon-types">
                        {types.map((type) => (
                            <span
                                key={type}
                                className="pokemon-type-badge"
                                style={{ backgroundColor: TYPE_COLORS[type] || '#888' }}
                            >
                                {type}
                            </span>
                        ))}
                    </div>
                </div>
            </Link>
            <div className="pokemon-card-actions">
                <button
                    onClick={toggleCompared}
                    className={`pokemon-compare-btn ${isCompared ? 'compared' : ''}`}
                    id={`compare-btn-${pokemon.id}`}
                    title={isCompared ? 'Remove from Compare' : 'Add to Compare'}
                >
                    <span className="compare-icon">⚖</span>
                    {isCompared ? 'Compared' : 'Compare'}
                </button>
                <button
                    onClick={toggleFavorite}
                    className={`pokemon-heart-btn ${isFavorite ? 'hearted' : ''}`}
                    id={`heart-btn-${pokemon.id}`}
                    title={isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                >
                    {isFavorite ? '♥' : '♡'}
                </button>
            </div>
        </div>
    );
}