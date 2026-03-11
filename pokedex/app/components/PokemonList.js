'use client';

import { useSearchParams } from 'next/navigation';
import PokemonCard from '@/app/components/PokemonCard';

export default function PokemonList({ pokemons }) {
    const searchParams = useSearchParams();

    const typesFilter = searchParams.get('types') || '';
    const searchFilter = searchParams.get('search') || '';
    const limit = parseInt(searchParams.get('limit') || '50', 10);
    const sort = searchParams.get('sort') || 'numerical';

    const selectedTypes = typesFilter ? typesFilter.split(',') : [];

    const filteredPokemons = pokemons
        .filter((pokemon) => {
            // Search by name or ID
            const matchesSearch =
                pokemon.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
                String(pokemon.id).includes(searchFilter);

            // Multi-type filter: if any type selected, pokemon must match at least one
            const matchesType =
                selectedTypes.length === 0 ||
                pokemon.types.some((p) =>
                    selectedTypes.includes(p.type.name.toLowerCase())
                );

            return matchesSearch && matchesType;
        })
        .sort((a, b) => {
            switch (sort) {
                case 'alphabetical':
                    return a.name.localeCompare(b.name);
                case 'alphabetical-desc':
                    return b.name.localeCompare(a.name);
                case 'numerical':
                default:
                    return a.id - b.id;
            }
        })
        .slice(0, limit);

    if (pokemons.length === 0) {
        return (
            <div className="pokemon-loading">
                <div className="pokemon-loading-spinner" />
                <span>Loading Pokémon...</span>
            </div>
        );
    }

    if (filteredPokemons.length === 0) {
        return (
            <div className="pokemon-empty">
                <span className="pokemon-empty-icon">🔍</span>
                <h3>No Pokémon Found</h3>
                <p>Try adjusting your filters or search query.</p>
            </div>
        );
    }

    return (
        <>
            <div className="pokemon-grid-header">
                <h1 className="pokemon-grid-title">Pokédex</h1>
                <span className="pokemon-grid-count">
                    Showing {filteredPokemons.length} of {pokemons.length}
                </span>
            </div>
            <div className="pokemon-list-container">
                {filteredPokemons.map((pokemon) => (
                    <PokemonCard pokemon={pokemon} key={pokemon.id} />
                ))}
            </div>
        </>
    );
}
