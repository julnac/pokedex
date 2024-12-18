'use client';
import PokemonList from '../components/PokemonList';
import fetchPokemons from "@/app/components/FetchPokemon";
import SearchBar from "@/app/components/SearchBar";
import {useEffect, useState} from "react";
import Filters from "@/app/components/Filters";

export default function PokemonPage() {
    const [pokemons, setPokemons] = useState([]);
    // const [filter, setFilter] = useState('');

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