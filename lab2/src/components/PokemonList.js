function getBackgroundColor(types) {
    if (types.includes('fire')) return '#EABBB8';
    if (types.includes('water')) return '#BEDCDE';
    if (types.includes('grass')) return '#C5E4D4';
    if (types.includes('electric')) return '#FFD966';
    if (types.includes('psychic')) return '#F7C8E0';
    if (types.includes('rock')) return '#A9A9A9';
    if (types.includes('ground')) return '#D9B99B';
    if (types.includes('ice')) return '#BEDCDE';
    if (types.includes('dragon')) return '#EABBB8';
    if (types.includes('dark')) return '#A9A9A9';
    if (types.includes('fairy')) return '#F7C8E0';
    if (types.includes('steel')) return '#A9A9A9';
    if (types.includes('poison')) return '#C5E4D4';
    if (types.includes('flying')) return '#BEDCDE';
    if (types.includes('bug')) return '#C5E4D4';
    if (types.includes('ghost')) return '#EBF3F5';
    if (types.includes('fighting')) return '#EABBB8';
    return '#EBF3F5';
}

function PokemonList({ pokemons, onPokemonClick }) {
    return (
      <div className="pokedex">
        {pokemons.map((pokemon) => (
          <div
            key={pokemon.id}
            className="container"
            style={{ backgroundColor: getBackgroundColor(pokemon.types) }}
            onClick={() => onPokemonClick(pokemon.id)}
          >
            <img
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
              width="200"
              height="200"
            />
            <div className="container-description">
              <h2>{pokemon.name}</h2>
              <h3>ID: {pokemon.id}</h3>
            </div>
          </div>
        ))}
      </div>
    );
  }
  