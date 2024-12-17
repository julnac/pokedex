function App() {
    var pokemons = [];
    var selectedPokemon;
  
    const fetchPokemons = () => {
        fetch('https://pokeapi.co/api/v2/pokemon?limit=20')
            .then((res) => res.json())
            .then((data) => {
                const promises = data.results.map((p) => fetch(p.url).then((res) => res.json()));
                Promise.all(promises).then((pokemonDetails) => {
                    pokemons = pokemonDetails;
                    render();
                });
            });
    };
  
    const fetchPokemonDetails = (id) => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
            .then((res) => res.json())
            .then((pokemon) => {
                selectedPokemon = pokemon;
                render();
            });
    };

    fetchPokemons();

    const render = () => {
        const rootElement = document.getElementById('root');
        ReactDOM.render(
            <body>
                <main className="main-section">
                    <Nav/>
                    <Header/>
                    <section className="pokemon-list">
                        <h2>Pokémon List</h2>
                        <PokemonList pokemons={pokemons} onPokemonClick={fetchPokemonDetails} />
                    </section>
                </main>
                <aside className="aside-section">
                    <div className="aside-container">
                        {selectedPokemon && <PokemonDetails pokemon={selectedPokemon} />}
                    </div>
                </aside>
            </body>,
            rootElement
        );
    };
  
    return null;
  }

  
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

