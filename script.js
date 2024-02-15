class Pokemon{

    constructor(name, type, hp, attack,sprite)
    {
        this.name = name;
        this.type = type;
        this.hp = hp;
        this.attack = attack;
        this.sprite = sprite;
    }
}
function fetchPokemon(){
let pokemonName = document.getElementById("pokemonName").value.toLowerCase();
getPokemon(pokemonName);

}

async function getPokemon(pokemonName) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);

        if (!response.ok) {
            throw new Error("Could not fetch resource");
        }

        const data = await response.json();

        const name = data.name;
        const type = data.types.map(type => type.type.name).join(', ');
        const hp = data.stats[0].base_stat;
        const attack = data.stats[1].base_stat;
        const sprite = data.sprites.front_default;

        const pokemon = new Pokemon(name, type, hp, attack, sprite);

        renderPokemon(pokemon);

    } catch (error) {
        console.error(error);
    }
}
function renderPokemon(pokemon) {
    const container = document.getElementById('pokemonContainer');
    container.innerHTML = '';
    const pokemonElement = document.createElement('div');
    pokemonElement.classList.add('pokemon');

    pokemonElement.innerHTML = `
        <img src="${pokemon.sprite}" alt="${pokemon.name}">
        <h2>${pokemon.name}</h2>
        <p>Type: ${pokemon.type}</p>
        <p>HP: ${pokemon.hp}</p>
        <p>Attack: ${pokemon.attack}</p>
    `;

    container.appendChild(pokemonElement);
}



    