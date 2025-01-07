'use client'

import {useEffect, useState} from "react";
import Image from "next/image";
import Link from "next/link";
import './PokemonCard.css';

function getBackgroundColor(types) {
    if (types.includes('fire')) return '#EABBB8'; // Ognisty - jasnoczerwony
    if (types.includes('water')) return '#BEDCDE'; // Wodny - jasnoniebieski
    if (types.includes('grass')) return '#C5E4D4'; // Trawiasty - jasnozielony
    if (types.includes('electric')) return '#FFD966'; // Elektryczny - złoty
    if (types.includes('psychic')) return '#F7C8E0'; // Psychiczny - różowy
    if (types.includes('rock')) return '#A9A9A9'; // Kamienny - jasnobrązowy
    if (types.includes('ground')) return '#D9B99B'; // Ziemny - beżowy
    if (types.includes('ice')) return '#BEDCDE'; // Lodowy - jasnoturkusowy
    if (types.includes('dragon')) return '#EABBB8'; // Smoczy - jasnofioletowy
    if (types.includes('dark')) return '#A9A9A9'; // Ciemny - ciemnoszary
    if (types.includes('fairy')) return '#F7C8E0'; // Baśniowy - jasnoróżowy
    if (types.includes('steel')) return '#A9A9A9'; // Stalowy - srebrny
    if (types.includes('poison')) return '#C5E4D4'; // Trujący - jasny fiolet
    if (types.includes('flying')) return '#BEDCDE'; // Latający - błękitny
    if (types.includes('bug')) return '#C5E4D4'; // Robak - jasnozielony
    if (types.includes('ghost')) return '#EBF3F5'; // Duch - szarofioletowy
    if (types.includes('fighting')) return '#EABBB8'; // Walczący - czerwony
    return '#EBF3F5';
}

export default function PokemonCard({ pokemon }) {

    const [isFavorite, setIsFavorite] = useState(false)
    const [isCompared, setIsCompared] = useState(false)
    const [isComparisonFull, setIsComparisonFull] = useState(false)

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const favorites = JSON.parse(localStorage.getItem("favorites") || '[]');
            setIsFavorite(favorites.includes(pokemon.name));

            const comparison = JSON.parse(localStorage.getItem("comparison") || '[]');
            setIsCompared(comparison.includes(pokemon.id));
        }
    }, [pokemon]);

    const toggleCompared = () => {
        const compare = JSON.parse(localStorage.getItem("comparison") || '[]');
        if (isCompared) {
            const updatedCompare = compare.filter(id => id !== pokemon.id);
            localStorage.setItem('comparison', JSON.stringify(updatedCompare));
            setIsCompared(!isCompared);
        } else if (compare.length < 2) {
            compare.push(pokemon.id);
            localStorage.setItem('comparison', JSON.stringify(compare));
            setIsCompared(!isCompared);
        } else {
            alert("Comparison is full 2/2")
        }
        if (compare.length === 2){
            setIsComparisonFull(true)
        } else {
            setIsComparisonFull(false)
        }
    }

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

    const backgroundColor = getBackgroundColor(pokemon.types.map(type => type.type.name));

    return (
        <div className="pokemon-card" style={{ backgroundColor }}>
            <Link href={`/pokemon/${pokemon.id}`} prefetch={false}>
                <div className="pokemon-image-container">
                    <Image
                        src={pokemon.image}
                        alt={pokemon.name}
                        width="200"
                        height="200"
                    />
                </div>
                <div className="pokemon-description">
                    <h2 className="pokemon-name">{pokemon.name}</h2>
                    <h3 className="pokemon-id">ID: {pokemon.id}</h3>
                </div>
            </Link>
            <div className="pokemon-detail-buttons-container">
                <button
                    onClick={toggleFavorite}
                    className={`favorite-button ${isFavorite ? 'favorite' : 'not-favorite'}`}
                >
                    {isFavorite ? 'Usuń z ulubionych' : 'Dodaj do ulubionych'}
                </button>
                <button
                    onClick={toggleCompared}
                    // disabled={isComparisonFull && !isCompared}
                    className={`favorite-button ${isCompared ? 'favorite' : 'not-favorite'}`}
                >
                    {isCompared ? 'Usuń z porównania' : 'Porównaj'}
                </button>
            </div>
        </div>
    )
}