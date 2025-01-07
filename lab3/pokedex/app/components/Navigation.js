import Link from 'next/link';
import './Navigation.css';

export default function Navigation() {
    return (
        <nav className="navigation">
            <ul className="nav-list">
                <li className="nav-item">
                    <Link href="/">Home</Link>
                </li>
                <li className="nav-item">
                    <Link href="/pokemon">Pokémon</Link>
                </li>
                <li className="nav-item">
                    <Link href="/favorites">Favorites</Link>
                </li>
                <li>
                    <Link href="/compare">Compare</Link>
                </li>
            </ul>
        </nav>
    );
}


