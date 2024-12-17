export default function FavoritesLayout({ children }) {
    return (
        <div>
            <header>
                <h2>Your Favorites</h2>
            </header>
            <section>{children}</section>
        </div>
    );
}