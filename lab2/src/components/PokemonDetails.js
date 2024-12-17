function PokemonDetails({ pokemon }) {
    if (!pokemon) return <div>Loading...</div>;
  
    return (
      <div className="aside-container">
        <h2 className="aside-title">{pokemon.name}</h2>
        <img 
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
          width="600"
          height="600"
          className="aside-img"
        />
        <div className="aside-description">
            <p><strong>Type:</strong> {pokemon.types.map((t) => t.type.name).join(', ')}</p>
            <p><strong>Height:</strong> {pokemon.height / 10} m</p>
            <p><strong>Weight:</strong> {pokemon.weight / 10} kg</p>
        </div>
      </div>
    );
  }


  
  