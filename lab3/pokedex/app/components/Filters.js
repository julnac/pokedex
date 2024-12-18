'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Filters() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [search, setSearch] = useState(searchParams.get('search') || '');
    const [type, setType] = useState(searchParams.get('type') || '');
    const [limit, setLimit] = useState(parseInt(searchParams.get('limit') || '20', 10));

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
        updateURL('search', search);
    }, [search]);

    useEffect(() => {
        updateURL('type', type);
    }, [type]);

    useEffect(() => {
        updateURL('limit', limit);
    }, [limit]);

    return (
        <div style={{ marginBottom: '20px' }}>
            <input
                type="text"
                placeholder="Search Pokémon..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                    padding: '10px',
                    marginRight: '10px',
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                }}
            />
            <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                style={{
                    padding: '10px',
                    marginRight: '10px',
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                }}
            >
                <option value="">All Types</option>
                <option value="fire">Fire</option>
                <option value="water">Water</option>
                <option value="grass">Grass</option>
                <option value="electric">Electric</option>
            </select>
            <select
                value={limit}
                onChange={(e) => setLimit(parseInt(e.target.value, 10))}
                style={{
                    padding: '10px',
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                }}
            >
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
            </select>
        </div>
    );
}
