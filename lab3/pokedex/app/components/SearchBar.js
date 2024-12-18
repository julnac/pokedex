//not used
export default function SearchBar({ filter, setFilter}) {
    const handleFilterChange = (event) => {
        setFilter(event.target.value.toLowerCase());
    }
    return (
        <header>
            <p>Search your pokemon:</p>
            <input
                type="text"
                placeholder="Filter Pokémon by name..."
                value={filter}
                onChange={handleFilterChange}
            />
        </header>
    )
}
