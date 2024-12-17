'use client';
import Image from "next/image";
import Link from "next/link";
import {useEffect, useState} from "react";

// function getBackgroundColor(types) {
//     if (types.includes('fire')) return '#EABBB8';
//     if (types.includes('water')) return '#BEDCDE';
//     if (types.includes('grass')) return '#C5E4D4';
//     if (types.includes('electric')) return '#FFD966';
//     if (types.includes('psychic')) return '#F7C8E0';
//     if (types.includes('rock')) return '#A9A9A9';
//     if (types.includes('ground')) return '#D9B99B';
//     if (types.includes('ice')) return '#BEDCDE';
//     if (types.includes('dragon')) return '#EABBB8';
//     if (types.includes('dark')) return '#A9A9A9';
//     if (types.includes('fairy')) return '#F7C8E0';
//     if (types.includes('steel')) return '#A9A9A9';
//     if (types.includes('poison')) return '#C5E4D4';
//     if (types.includes('flying')) return '#BEDCDE';
//     if (types.includes('bug')) return '#C5E4D4';
//     if (types.includes('ghost')) return '#EBF3F5';
//     if (types.includes('fighting')) return '#EABBB8';
//     return '#EBF3F5';
// }

export default function PokemonList() {

    const [pokemons, setPokemons] = useState([]);

    useEffect(() => {
        async function fetchPokemons() {
            try {
                const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setPokemons(data.results);
            } catch (error) {
                console.error('Fetch error:', error);
            }
        }
        fetchPokemons();
    }, []);

    // const filteredPokemons = pokemons.filter((pokemon) => {
    //     pokemon.name.toLowerCase().includes(filter);
    // });

    return (
      <div className="pokedex">
        {pokemons.map((pokemon) => (
            <Link key={pokemon.id} href={`/pokemon/${pokemon.id}`} preload={false}>
                <div className="container">
                    {/*<Image*/}
                    {/*    src={pokemon.sprites.front_default}*/}
                    {/*    alt={pokemon.name}*/}
                    {/*    width="200"*/}
                    {/*    height="200"*/}
                    {/*/>*/}
                    <div className="container-description">
                        <h2>{pokemon.name}</h2>
                        <h3>ID: {pokemon.id}</h3>
                    </div>
                </div>
            </Link>
        ))}
      </div>
    );
}
