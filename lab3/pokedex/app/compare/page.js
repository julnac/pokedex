'use client'
import PokemonDetails from "@/app/components/PokemonDetails";
import {useEffect, useState} from "react";
import fetchPokemons from "@/app/components/FetchPokemon";

export default function ComparePage (){

    const [compared, setCompared] = useState([])

    useEffect(() => {
        const savedCompared = JSON.parse(localStorage.getItem('comparison') || '[]');
        setCompared(savedCompared);
    }, []);

    const clearComparison = () => {
        setCompared([]);
        localStorage.removeItem('comparison');
    };

    return (
        <div>
            <div className="detail-nav-buttons">
                <button
                    className="detail-nav-button"
                    onClick={clearComparison}
                >
                    Delete comparison
                </button>
            </div>
                <div className="compare-cards-container">
                    {/*{*/}
                    {/*    compared.map((id) => (*/}
                    {/*        <PokemonDetails id={id} key={id}/>*/}
                    {/*    ))*/}
                    {/*}*/}
                    <PokemonDetails id={compared[0]} key={compared[0]}/>
                    <PokemonDetails id={compared[1]} key={compared[1]}/>
                </div>
        </div>
    )
}