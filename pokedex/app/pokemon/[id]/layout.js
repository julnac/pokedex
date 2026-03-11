import Link from "next/link";
import '@/app/components/PokemonDetails.css';

export default function PokemonDetailLayout({ children }) {
    return (
        <div className="pokemon-detail-layout">
            {children}
        </div>
    )
}