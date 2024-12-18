'use client';
import PokemonList from '../components/PokemonList';
import fetchPokemons from "@/app/components/FetchPokemon";
import {useEffect, useState} from "react";
import Filters from "@/app/components/Filters";

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
        <div>
            <h1>Pokédex</h1>
            <Filters />
            {/*<SearchBar filter={filter} setFilter={setFilter}/>*/}
            <PokemonList pokemons={pokemons}/>
        </div>
    );
}