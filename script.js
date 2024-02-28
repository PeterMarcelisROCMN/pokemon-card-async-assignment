const poke_container = document.getElementById('poke_container');

// amount of pokemons to retrieve
const pokemons_to_retrieve = 1;

// color palette's for each type
const colors = {
	fire: '#FDDFDF',
	grass: '#DEFDE0',
	electric: '#FCF7DE',
	water: '#DEF3FD',
	ground: '#f4e7da',
	rock: '#d5d5d4',
	fairy: '#fceaff',
	poison: '#98d7a5',
	bug: '#f8d5a3',
	dragon: '#97b3e6',
	psychic: '#eaeda1',
	flying: '#F5F5F5',
	fighting: '#E6E0D4',
	normal: '#F5F5F5'
};

const main_types = Object.keys(colors);

// fetching all pokemons with a minor delay
async function fetchPokemons(){
	for (let i = 1; i <= pokemons_to_retrieve; i++) {
		await getPokemonWithDelay(i, 100); 
	}
}

// small delay to set up each card (otherwise they all paste really quickly)
async function getPokemonWithDelay(id, delay) {
	await new Promise(resolve => setTimeout(resolve, delay));
	await getPokemon(id);
};

 
// Get pokemon data for an id
async function getPokemon(id) {
	const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
	const res = await fetch(url);
	const pokemon = await res.json();
	createPokemonCard(pokemon);
};


// creating a new div per pokemon that is retrieved and putting all the data on the card
async function createPokemonCard(pokemon) {
	const pokemonEl = document.createElement('div');
	pokemonEl.classList.add('pokemon');

    // mapping some of the values to get basic pokemon card data
	const poke_types = pokemon.types.map(type => type.type.name);
	const type = main_types.find(type => poke_types.indexOf(type) > -1);
	const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
	const color = colors[type];
	
	pokemonEl.style.backgroundColor = color;

    // Use the fetchPokemonImage function to retrieve the path needed for the image
    // the fetchPokemonImage method is async. We need to wait for it to complete. 
    // What do we need to add to wait for a function to finish?
    let imagePath = "";


    // creating the HTML (the card)
	const pokeInnerHTML = `
        <div class="img-container">
            <img src="${imagePath}" />
        </div>
        <div class="info">
            <span class="number">#${pokemon.id
							.toString()
							.padStart(3, '0')}</span>
            <h3 class="name">${name}</h3>
            <small class="type">Type: <span>${type}</span></small>
        </div>
    `;

    // changing the html
	pokemonEl.innerHTML = pokeInnerHTML;

    // add to the existing container (so we don't reset it per pokemon fetched)
	poke_container.appendChild(pokemonEl);
}

// Retrieving an image from a separate API to practice async / await
async function fetchPokemonImage(pokemon) {
    let imageUrl = "";

   
    // https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png
    let response = ""; /* fetch image of each pokemon from this API | hint: use await fetch(url_here); */ 

    // a blob is used to represent raw data. It is used in this case so we can get all data from that other page.
    // get the blob from the url
   // const blob = await response.blob();
    
    // Now that we have the 'blob', we want to create an object URL, this will contain the actual imagepath
    // imageURL = URL.createObjectURL(blob);
    
    // return the image path
    return imageUrl;
}

fetchPokemons();