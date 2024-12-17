'use client';
import {useState} from "react";

export default function SearchBar() {

    const [filter, setFilter] = useState('');

    const handleFilterChange = (event) => {
        setFilter(event.target.value.toLowerCase());
    }
    return (
        <header>
            <h2>Pokemon Section</h2>
            <input
                type="text"
                placeholder="Filter Pokémon by name..."
                value={filter}
                onChange={handleFilterChange}
            />
        </header>
    )
}