// document.getElementById('fetch-pokemon-btn').addEventListener('click', fetchPokemon);


function fetchPokemonList() {
    const pokeList = document.getElementById('data-container');
    pokeList.innerHTML = '<p>Loading...</p>';

    fetch('https://pokeapi.co/api/v2/pokemon?limit=20')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            pokeList.innerHTML = '';
            const pokemonPromises = data.results.map(pokemon => fetch(pokemon.url).then(res => res.json()));

            Promise.all(pokemonPromises).then(pokemonDetails => {
                pokemonDetails.forEach(pokemon => {
                    const div = document.createElement('div');
                    div.classList.add('container');

                    const types = pokemon.types.map(typeInfo => typeInfo.type.name);
                    const bgColor = getBackgroundColor(types);
                    div.style.backgroundColor = bgColor;
                    div.dataset.id = pokemon.id

                    div.innerHTML = `
                        <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" width="200" height="200">
                        <div class="container-description">
                            <h2>${pokemon.name}</h2>
                            <h3>ID: ${pokemon.id}</h3>
                        </div>
                    `;
                    // div.onclick = fetchPokemon(pokemon.id);
                    div.addEventListener('click', () => fetchPokemon(pokemon.id));
                    pokeList.appendChild(div);
                });
            });
        })
        .catch(error => {
            pokeList.innerHTML = `<p>Error: ${error.message}</p>`;
        })
};

fetchPokemonList()

function fetchPokemon(pokemonId) {

    const detailsDiv = document.getElementById('details-container');
    const imageDiv = document.getElementById('details-img');
    const titleDiv = document.getElementById('details-title');

    detailsDiv.innerHTML = '<p>Loading details...</p>';
    imageDiv.innerHTML = '<p>Loading details...</p>';
    titleDiv.innerHTML = '<p>Loading details...</p>';


    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(pokemon => {
            detailsDiv.innerHTML = `
                <p><strong>Type:</strong> ${pokemon.types.map(type => type.type.name).join(', ')}</p>
                <p><strong>Height:</strong> ${pokemon.height / 10} m</p>
                <p><strong>Weight:</strong> ${pokemon.weight / 10} kg</p>
                <p><strong>Base Stats:</strong></p>
                <ul>
                    ${pokemon.stats.map(stat => `<li><p>${stat.stat.name}: ${stat.base_stat}</p></li>`).join('')}
                </ul>
            `;

            imageDiv.innerHTML = `
                <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" width="600" height="600">
            `;

            titleDiv.innerHTML = `
                <h2>${pokemon.name}</h2>
                <h3>ID: ${pokemon.id}</h3>
            `;
        })
        .catch(error => {
            detailsDiv.innerHTML = `<p>Error: ${error.message}</p>`;
        });
}

function getBackgroundColor(types) {
    if (types.includes('fire')) return '#EABBB8'; // Ognisty - jasnoczerwony
    if (types.includes('water')) return '#BEDCDE'; // Wodny - jasnoniebieski
    if (types.includes('grass')) return '#C5E4D4'; // Trawiasty - jasnozielony
    if (types.includes('electric')) return '#FFD966'; // Elektryczny - złoty
    if (types.includes('psychic')) return '#F7C8E0'; // Psychiczny - różowy
    if (types.includes('rock')) return '#A9A9A9'; // Kamienny - jasnobrązowy
    if (types.includes('ground')) return '#D9B99B'; // Ziemny - beżowy
    if (types.includes('ice')) return '#BEDCDE'; // Lodowy - jasnoturkusowy
    if (types.includes('dragon')) return '#EABBB8'; // Smoczy - jasnofioletowy
    if (types.includes('dark')) return '#A9A9A9'; // Ciemny - ciemnoszary
    if (types.includes('fairy')) return '#F7C8E0'; // Baśniowy - jasnoróżowy
    if (types.includes('steel')) return '#A9A9A9'; // Stalowy - srebrny
    if (types.includes('poison')) return '#C5E4D4'; // Trujący - jasny fiolet
    if (types.includes('flying')) return '#BEDCDE'; // Latający - błękitny
    if (types.includes('bug')) return '#C5E4D4'; // Robak - jasnozielony
    if (types.includes('ghost')) return '#EBF3F5'; // Duch - szarofioletowy
    if (types.includes('fighting')) return '#EABBB8'; // Walczący - czerwony
    return '#EBF3F5';
}


