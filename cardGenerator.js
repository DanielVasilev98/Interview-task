function movesGenerator(moves, parent) {
    let movesCounter = 0;
    for (let j = 0; j < moves.length; j++) {
        movesCounter = j+1;
        let eachMove = document.createElement("li");
        parent.appendChild(eachMove).textContent = "Move" + movesCounter + ": " + moves[j];
    }
}

function statsGenerator(stats, parent) {
    for (let j = 0; j < stats.length; j++) {
        let eachStat = document.createElement("h2");
        parent.appendChild(eachStat).textContent = stats[j].name + ": " + stats[j].stats;
    }
}

function pokemonCardGenerator(allData) {
    let parent = document.getElementById("allPokemons");

    for (let i = 0; i < allData.length; i++) {
        let pokemonCard = document.createElement("div")
        let img = document.createElement("img");
        let name = document.createElement("h2");
        let ability = document.createElement("h2");
        let moves = document.createElement("ul");
        let eachMove = document.createElement("li");

        parent.appendChild(pokemonCard);
        pokemonCard.setAttribute("id", i+1)
        pokemonCard.appendChild(img);
        img.setAttribute("src", allData[i].frontImg);
        pokemonCard.appendChild(name).textContent = "Name: " + allData[i].name;
        pokemonCard.appendChild(ability).textContent = "Ability: " + allData[i].ability;
        pokemonCard.appendChild(moves);

        movesGenerator(allData[i].moves, pokemonCard);
        statsGenerator(allData[i].stats, pokemonCard)
    }
}

setTimeout(function(){
    collectNeededData(pokemonNamesAndUrls);
},400)

setTimeout(function(){
    pokemonCardGenerator(allPokemonsData);
},800)
