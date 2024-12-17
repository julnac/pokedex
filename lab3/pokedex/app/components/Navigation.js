import Link from 'next/link';

export default function Navigation() {
  return (
    <nav>
      <Link href='/'>Home</Link>
      <Link href='/pokemon'>Pokémon</Link>
      <Link href='/favorites'>Favorites</Link>
    </nav>
  );
}

