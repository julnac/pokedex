'use client';

import { Suspense } from 'react';
import PokemonList from '../components/PokemonList';
import fetchPokemons from '@/app/components/FetchPokemon';
import { useEffect, useState } from 'react';
import Sidebar from '@/app/components/Sidebar';
import ComparisonDrawer from '@/app/components/ComparisonDrawer';

export default function PokemonPage() {
    const [pokemons, setPokemons] = useState([]);

    useEffect(() => {
        const getPokemons = async () => {
            const { pokemons } = await fetchPokemons();
            setPokemons(pokemons);
        };
        getPokemons();
    }, []);

    return (
        <Suspense fallback={<div className="pokemon-loading"><div className="pokemon-loading-spinner" /><span>Loading...</span></div>}>
            <div className="pokemon-page-layout">
                <Sidebar />
                <div className="pokemon-main-content">
                    <PokemonList pokemons={pokemons} />
                </div>
                <ComparisonDrawer />
            </div>
        </Suspense>
    );
}