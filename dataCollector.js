const url = "https://pokeapi.co/api/v2/pokemon/";

async function fetchPokemonData(responseUrl) {
    let response = await fetch(responseUrl);
    let data = await response.json();
    return data;
}

let startData = fetchPokemonData(url);

let pokemonNamesAndUrls = [];

startData.then(data => {
    let counter = 0;
    for (const pokemon of data.results) {
        pokemonNamesAndUrls[counter] = {"name": pokemon.name, "url": pokemon.url};
        counter+=1;
    }
})

let allPokemonsData = [];
let eachPokemonSpecs = {};

function collectNeededData(pokemonData) {
    let pokemonCounter = 0;
    for (const pokemon of pokemonNamesAndUrls) {
        let furtherData = fetchPokemonData(pokemon.url);    
        furtherData.then(data => {
            let fourMoves = [];
            let movesCounter = 0;

            for (let m of data.moves) {
                movesCounter+=1;
                let move = document.createElement("li")
                if (movesCounter <= 4) {
                    fourMoves[movesCounter-1] = m.move.name;
                }
            }
            movesCounter = 0;

            let allPokemonStats = [];
            let eachPokemonStat = {};
       
            let statsCounter = 0;
            for (let s of data.stats) {
                statsCounter+=1;
                let stat = document.createElement("h2");
                eachPokemonStat.name = s.stat.name;
                eachPokemonStat.stats = s.base_stat;
                allPokemonStats[statsCounter-1] = {name: eachPokemonStat.name, stats: eachPokemonStat.stats};
            }
            statsCounter=0;

            eachPokemonSpecs = new Pokemon(data.sprites.back_default, data.sprites.front_default, pokemon.name, data.abilities[0].ability.name, fourMoves, allPokemonStats);
            allPokemonsData[pokemonCounter] = eachPokemonSpecs;
            pokemonCounter+=1
        })
    }
}

function getSelectedPokemonsData(allData, pokemon) {
    let pokemonData = {};
    for(let i=0;i<allData.length;i++) {
        if(allData[i].name == pokemon) { // checking if the selected pokemon's name is in the list if all pokemons
            pokemonData = allData[i];
        }
    }
    return pokemonData;
}

function removeSelectedPokemon(allData, pokemon) {
    allData.splice(allData.indexOf(pokemon), 1)
    return allData;
}