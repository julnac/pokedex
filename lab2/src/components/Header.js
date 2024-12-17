function Header() {
    return (
        <header>
            <div className="header">
                <h2>Gotta Know 'Em All!</h2>
                <p>Calling all Pokémon Trainers! Dive into the ultimate PokéDex at your fingertips. With PokéFinder, you can Search any Pokémon by name. 
                    Discover their abilities and find out what makes your favorite Pokémon a true champion.
                </p>
            </div>
            <form>
                <input type="text" placeholder="Enter name"/>
                <button id="fetch-data-btn">Go</button>
            </form>
        </header>
    );
}