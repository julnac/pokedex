'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import './Filters.css';

export default function Filters() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [search, setSearch] = useState(searchParams.get('search') || '');
    const [type, setType] = useState(searchParams.get('type') || '');
    const [limit, setLimit] = useState(parseInt(searchParams.get('limit') || '50', 10));

    const updateURL = (key, value) => {
        const params = new URLSearchParams(searchParams.toString());
        if (value) {
            params.set(key, value);
        } else {
            params.delete(key);
        }
        router.push(`?${params.toString()}`);
    };

    useEffect(() => {
        const savedSearch = JSON.parse(localStorage.getItem('search') || null);
        const savedType = JSON.parse(localStorage.getItem('type') || null);
        const savedLimit = JSON.parse(localStorage.getItem('limit') || null);
        if (savedSearch) {
            setSearch(savedSearch);
        }
        if (savedType) {
            setType(savedType);
        }
        if (savedLimit) {
            setLimit(savedLimit);
        }
    }, []);

    useEffect(() => {
        updateURL('search', search);
        localStorage.setItem('search', JSON.stringify(search));
    }, [search]);

    useEffect(() => {
        updateURL('type', type);
        localStorage.setItem('type', JSON.stringify(type));
    }, [type]);

    useEffect(() => {
        updateURL('limit', limit);
        localStorage.setItem('limit', JSON.stringify(limit));
    }, [limit]);

    return (
        <div className="filters-container">
            <input
                type="text"
                placeholder="Search Pokémon..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="filters-input"
            />
            <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="filters-select"
            >
                <option value="">All Types</option>
                <option value="normal">Normal</option>
                <option value="fire">Fire</option>
                <option value="water">Water</option>
                <option value="electric">Electric</option>
                <option value="grass">Grass</option>
                <option value="ice">Ice</option>
                <option value="fighting">Fighting</option>
                <option value="poison">Poison</option>
                <option value="ground">Ground</option>
                <option value="flying">Flying</option>
                <option value="psychic">Psychic</option>
                <option value="bug">Bug</option>
                <option value="rock">Rock</option>
                <option value="ghost">Ghost</option>
                <option value="dragon">Dragon</option>
                <option value="dark">Dark</option>
                <option value="steel">Steel</option>
                <option value="fairy">Fairy</option>
            </select>
            <select
                value={limit}
                onChange={(e) => setLimit(parseInt(e.target.value, 10))}
                className="filters-select"
            >
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
                <option value="100">100</option>
            </select>
        </div>
    );
}
