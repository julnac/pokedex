'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import './ComparisonDrawer.css';

export default function ComparisonDrawer() {
    const [slots, setSlots] = useState([]);
    const [pokemonData, setPokemonData] = useState({});

    const loadComparison = () => {
        const compared = JSON.parse(localStorage.getItem('comparison') || '[]');
        setSlots(compared);
    };

    useEffect(() => {
        loadComparison();
        window.addEventListener('comparisonUpdated', loadComparison);
        window.addEventListener('storage', loadComparison);
        return () => {
            window.removeEventListener('comparisonUpdated', loadComparison);
            window.removeEventListener('storage', loadComparison);
        };
    }, []);

    // Fetch pokemon data for each slot
    useEffect(() => {
        slots.forEach(async (id) => {
            if (!pokemonData[id]) {
                try {
                    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
                    const data = await res.json();
                    setPokemonData((prev) => ({
                        ...prev,
                        [id]: {
                            name: data.name,
                            image: data.sprites.front_default,
                            id: data.id,
                        },
                    }));
                } catch (err) {
                    console.error('Failed to fetch pokemon:', err);
                }
            }
        });
    }, [slots]);

    const removeSlot = (id) => {
        const compare = JSON.parse(localStorage.getItem('comparison') || '[]');
        const updated = compare.filter((cid) => cid !== id);
        localStorage.setItem('comparison', JSON.stringify(updated));
        setSlots(updated);
        window.dispatchEvent(new Event('comparisonUpdated'));
    };

    const isVisible = slots.length > 0;

    return (
        <div
            className={`comparison-drawer ${isVisible ? 'visible' : ''}`}
            id="comparison-drawer"
        >
            {/* Slot 1 */}
            {slots[0] && pokemonData[slots[0]] ? (
                <div className="drawer-slot">
                    <div className="drawer-slot-img">
                        <Image
                            src={pokemonData[slots[0]].image}
                            alt={pokemonData[slots[0]].name}
                            width={36}
                            height={36}
                        />
                    </div>
                    <div className="drawer-slot-info">
                        <span className="drawer-slot-name">{pokemonData[slots[0]].name}</span>
                        <span className="drawer-slot-id">#{String(pokemonData[slots[0]].id).padStart(3, '0')}</span>
                    </div>
                    <button
                        className="drawer-slot-remove"
                        onClick={() => removeSlot(slots[0])}
                        title="Remove"
                    >
                        ✕
                    </button>
                </div>
            ) : (
                <div className="drawer-slot-empty">
                    <span>+</span> Select Pokémon
                </div>
            )}

            <span className="drawer-vs">VS</span>

            {/* Slot 2 */}
            {slots[1] && pokemonData[slots[1]] ? (
                <div className="drawer-slot">
                    <div className="drawer-slot-img">
                        <Image
                            src={pokemonData[slots[1]].image}
                            alt={pokemonData[slots[1]].name}
                            width={36}
                            height={36}
                        />
                    </div>
                    <div className="drawer-slot-info">
                        <span className="drawer-slot-name">{pokemonData[slots[1]].name}</span>
                        <span className="drawer-slot-id">#{String(pokemonData[slots[1]].id).padStart(3, '0')}</span>
                    </div>
                    <button
                        className="drawer-slot-remove"
                        onClick={() => removeSlot(slots[1])}
                        title="Remove"
                    >
                        ✕
                    </button>
                </div>
            ) : (
                <div className="drawer-slot-empty">
                    <span>+</span> Select Pokémon
                </div>
            )}

            {/* Compare Now */}
            {slots.length === 2 ? (
                <Link
                    href="/compare"
                    className="drawer-compare-btn"
                    id="compare-now-btn"
                >
                    Compare Now →
                </Link>
            ) : (
                <button className="drawer-compare-btn disabled" disabled>
                    Compare Now →
                </button>
            )}
        </div>
    );
}
