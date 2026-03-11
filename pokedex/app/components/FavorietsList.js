import PokemonCard from "@/app/components/PokemonCard";
import {useEffect, useState} from "react";

export default function FavorietsList( {pokemons} ) {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const savedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        setFavorites(savedFavorites);
    }, []);

    const filteredFavorites = pokemons.filter((pokemon) => favorites.includes(pokemon.name));

    return (
        <div className="pokemon-list-container">
            {favorites.length === 0 ? (
                <p>No favoriet pokemons</p>
            ) : (
                filteredFavorites.map((pokemon) => (
                    <PokemonCard pokemon={pokemon} key={pokemon.id}/>
                ))
            )}
        </div>
    )
}