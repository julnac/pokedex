export default async function fetchPokemons() {
    try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const pokemonDetails = await Promise.all(
            data.results.map(async (pokemon) => {
                const res = await fetch(pokemon.url);
                const details = await res.json();
                return {
                    id: details.id,
                    name: details.name,
                    image: details.sprites.front_default,
                    types: details.types,
                    height: details.height,
                    weight: details.weight,
                };
            })
        );
        return { pokemons: pokemonDetails };
    } catch (error) {
        console.error('Fetch error:', error);
        return [];
    }
}