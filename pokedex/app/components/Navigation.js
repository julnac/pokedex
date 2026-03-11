'use client';

import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import './Navigation.css';

export default function Navigation() {
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();
    const [favCount, setFavCount] = useState(0);
    const [searchValue, setSearchValue] = useState('');

    // Sync search with URL params when on /pokemon page
    useEffect(() => {
        if (pathname === '/pokemon') {
            setSearchValue(searchParams.get('search') || '');
        }
    }, [pathname, searchParams]);

    // Update favorites count
    useEffect(() => {
        const updateCount = () => {
            const favs = JSON.parse(localStorage.getItem('favorites') || '[]');
            setFavCount(favs.length);
        };
        updateCount();

        // Listen for storage changes (cross-tab and custom events)
        window.addEventListener('storage', updateCount);
        window.addEventListener('favoritesUpdated', updateCount);
        return () => {
            window.removeEventListener('storage', updateCount);
            window.removeEventListener('favoritesUpdated', updateCount);
        };
    }, []);

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchValue(value);

        // If not on pokemon page, navigate there with search param
        const params = new URLSearchParams(searchParams.toString());
        if (value) {
            params.set('search', value);
        } else {
            params.delete('search');
        }

        if (pathname !== '/pokemon') {
            router.push(`/pokemon?${params.toString()}`);
        } else {
            router.push(`/pokemon?${params.toString()}`);
        }
    };

    const isActive = (path) => pathname === path;

    return (
        <>
            <nav className="navigation" id="main-navigation">
                <Link href="/" className="nav-logo">
                    <span className="nav-logo-icon">⚡</span>
                    <span>Pokédex</span>
                </Link>

                <div className="nav-search-wrapper">
                    <div className="nav-search">
                        <input
                            id="search-bar"
                            type="text"
                            className="nav-search-input"
                            placeholder="Search by Name or ID..."
                            value={searchValue}
                            onChange={handleSearch}
                            autoComplete="off"
                        />
                    </div>
                </div>

                <div className="nav-right">
                    <Link
                        href="/pokemon"
                        className={`nav-link ${isActive('/pokemon') ? 'active' : ''}`}
                    >
                        Pokémon
                    </Link>
                    <Link
                        href="/compare"
                        className={`nav-link ${isActive('/compare') ? 'active' : ''}`}
                    >
                        Compare
                    </Link>
                    <Link href="/favorites" className="nav-liked-btn" id="liked-button" title="Favorites">
                        ♥
                        {favCount > 0 && (
                            <span className="nav-liked-badge">{favCount}</span>
                        )}
                    </Link>
                </div>
            </nav>
            <div className="nav-spacer" />
        </>
    );
}
