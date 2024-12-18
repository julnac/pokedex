'use client'
import FavorietsList from "@/app/components/FavorietsList";
import fetchPokemons from "@/app/components/FetchPokemon";
import {useEffect, useState} from "react";

export default function FavouritePage() {
    const [pokemons, setPokemons] = useState([]);

    useEffect(() => {
        const getPokemons = async () => {
            const { pokemons } = await fetchPokemons();
            setPokemons(pokemons);
        };

        getPokemons();
    }, []);

    return(
        <div>
            <h3>Favorite Pokémon</h3>
            <p>Your favorite Pokémon will appear here!</p>
            <FavorietsList pokemons={pokemons} />
        </div>
    );
}