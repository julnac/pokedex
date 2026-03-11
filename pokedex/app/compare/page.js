'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import PokemonDetails from '@/app/components/PokemonDetails';
import '@/app/components/PokemonDetails.css';

export default function ComparePage() {
    const [compared, setCompared] = useState([]);

    useEffect(() => {
        const savedCompared = JSON.parse(localStorage.getItem('comparison') || '[]');
        setCompared(savedCompared);
    }, []);

    const clearComparison = () => {
        setCompared([]);
        localStorage.removeItem('comparison');
        window.dispatchEvent(new Event('comparisonUpdated'));
    };

    if (compared.length === 0) {
        return (
            <div className="compare-page">
                <div className="compare-empty">
                    <span className="compare-empty-icon">⚖️</span>
                    <h3>No Pokémon Selected for Comparison</h3>
                    <p>
                        Head to the Pokédex and click "Compare" on two Pokémon
                        to see them side by side!
                    </p>
                    <Link href="/pokemon" className="compare-empty-link">
                        Browse Pokédex →
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="compare-page">
            <div className="compare-header">
                <h1 className="compare-page-title">Compare Pokémon</h1>
                <button
                    className="compare-clear-btn"
                    onClick={clearComparison}
                >
                    ✕ Clear Comparison
                </button>
            </div>
            <div className="compare-cards-container">
                <PokemonDetails id={compared[0]} key={compared[0]} />
                {compared.length === 2 && <span className="compare-vs-badge">VS</span>}
                <PokemonDetails id={compared[1]} key={compared[1]} />
            </div>
        </div>
    );
}