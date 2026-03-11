'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import './Sidebar.css';

const POKEMON_TYPES = [
    { name: 'normal', color: '#a8a878' },
    { name: 'fire', color: '#fd7d24' },
    { name: 'water', color: '#4592c4' },
    { name: 'electric', color: '#f5c731' },
    { name: 'grass', color: '#49d0b0' },
    { name: 'ice', color: '#98d8d8' },
    { name: 'fighting', color: '#c03028' },
    { name: 'poison', color: '#a040a0' },
    { name: 'ground', color: '#e0c068' },
    { name: 'flying', color: '#a890f0' },
    { name: 'psychic', color: '#f85888' },
    { name: 'bug', color: '#a8b820' },
    { name: 'rock', color: '#b8a038' },
    { name: 'ghost', color: '#705898' },
    { name: 'dragon', color: '#7038f8' },
    { name: 'dark', color: '#705848' },
    { name: 'steel', color: '#b8b8d0' },
    { name: 'fairy', color: '#ee99ac' },
];

const LIMIT_STEPS = [20, 50, 100];

export default function Sidebar() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [selectedTypes, setSelectedTypes] = useState([]);
    const [limit, setLimit] = useState(50);
    const [sort, setSort] = useState('numerical');
    const [initialized, setInitialized] = useState(false);

    // Initialize from URL params (once)
    useEffect(() => {
        const typesParam = searchParams.get('types');
        if (typesParam) {
            setSelectedTypes(typesParam.split(','));
        }
        const limitParam = searchParams.get('limit');
        if (limitParam) setLimit(parseInt(limitParam, 10));
        const sortParam = searchParams.get('sort');
        if (sortParam) setSort(sortParam);
        setInitialized(true);
    }, []);

    // Sync state → URL after state changes (not during render)
    useEffect(() => {
        if (!initialized) return;

        const params = new URLSearchParams(searchParams.toString());

        if (selectedTypes.length > 0) {
            params.set('types', selectedTypes.join(','));
        } else {
            params.delete('types');
        }

        if (limit !== 50) {
            params.set('limit', limit.toString());
        } else {
            params.delete('limit');
        }

        if (sort !== 'numerical') {
            params.set('sort', sort);
        } else {
            params.delete('sort');
        }

        router.push(`/pokemon?${params.toString()}`);
    }, [selectedTypes, limit, sort, initialized]);

    const toggleType = (typeName) => {
        setSelectedTypes(prev =>
            prev.includes(typeName)
                ? prev.filter(t => t !== typeName)
                : [...prev, typeName]
        );
    };

    const handleLimitChange = (newLimit) => {
        setLimit(newLimit);
    };

    const handleSortChange = (e) => {
        setSort(e.target.value);
    };

    const clearFilters = () => {
        setSelectedTypes([]);
        setLimit(50);
        setSort('numerical');
    };

    const hasActiveFilters = selectedTypes.length > 0 || limit !== 50 || sort !== 'numerical';

    return (
        <aside className="sidebar" id="sidebar-filters">
            {/* Type Filters */}
            <div className="sidebar-section">
                <h3 className="sidebar-section-title">Types</h3>
                <div className="sidebar-types-grid">
                    {POKEMON_TYPES.map((type) => (
                        <label key={type.name} className="sidebar-type-label" id={`type-filter-${type.name}`}>
                            <input
                                type="checkbox"
                                checked={selectedTypes.includes(type.name)}
                                onChange={() => toggleType(type.name)}
                            />
                            <span className="sidebar-type-check">✓</span>
                            <span
                                className="sidebar-type-dot"
                                style={{ backgroundColor: type.color }}
                            />
                            <span style={{ textTransform: 'capitalize' }}>{type.name}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Quantity per page */}
            <div className="sidebar-section">
                <h3 className="sidebar-section-title">Quantity per page</h3>
                <div className="sidebar-slider-wrapper">
                    <div className="sidebar-slider-header">
                        <span className="sidebar-slider-value">{limit}</span>
                    </div>
                    <input
                        type="range"
                        id="limit-slider"
                        className="sidebar-slider"
                        min="0"
                        max="2"
                        step="1"
                        value={LIMIT_STEPS.indexOf(limit) !== -1 ? LIMIT_STEPS.indexOf(limit) : 1}
                        onChange={(e) => {
                            const newLimit = LIMIT_STEPS[parseInt(e.target.value, 10)];
                            setLimit(newLimit);
                        }}
                    />
                    <div className="sidebar-slider-ticks">
                        {LIMIT_STEPS.map((step) => (
                            <span
                                key={step}
                                className={`sidebar-slider-tick ${limit === step ? 'active' : ''}`}
                                onClick={() => setLimit(step)}
                            >
                                {step}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Sort */}
            <div className="sidebar-section">
                <h3 className="sidebar-section-title">Sort By</h3>
                <div className="sidebar-select-wrapper">
                    <select
                        id="sort-select"
                        className="sidebar-select"
                        value={sort}
                        onChange={handleSortChange}
                    >
                        <option value="numerical">Numerical (#)</option>
                        <option value="alphabetical">Alphabetical (A-Z)</option>
                        <option value="alphabetical-desc">Alphabetical (Z-A)</option>
                    </select>
                </div>
            </div>

            {/* Clear */}
            {hasActiveFilters && (
                <button
                    className="sidebar-clear-btn"
                    onClick={clearFilters}
                    id="clear-filters-btn"
                >
                    ✕ Clear All Filters
                </button>
            )}
        </aside>
    );
}
