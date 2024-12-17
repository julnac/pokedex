'use client';
import PokemonList from '../components/PokemonList';
import fetchPokemons from "@/app/components/FetchPokemon";
import SearchBar from "@/app/components/SearchBar";
import {useEffect, useState} from "react";

export default function PokemonPage() {
    const [pokemons, setPokemons] = useState([]);
    const [filter, setFilter] = useState('');

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
            <SearchBar filter={filter} setFilter={setFilter}/>
            <PokemonList pokemons={pokemons} filter={filter}/>
        </div>
    );
}