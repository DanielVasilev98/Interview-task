setTimeout(function(){
    let selectedPokemonName = "";
    
    for(let i=1;i<=allPokemonsData.length;i++) {
        document.getElementById(i).addEventListener("click", function(){ // finding which pokemon is clicked
            let battleArea = document.getElementById("battleArea").setAttribute("style", "display: block;"); // showing the battle area
            selectedPokemonName = document.getElementById(i).getElementsByTagName("h2")[0].textContent.slice(6); // taking the name of the selected pokemon fo further logic
    
            let selectedPokemonData = getSelectedPokemonsData(allPokemonsData, selectedPokemonName);        
    
            let firstBackImgElement = document.getElementById("firstBackImg");
            firstBackImgElement.setAttribute("src", selectedPokemonData.backImg)
            let pokemon = document.getElementById("battleField");
            let context = pokemon.getContext("2d");
            let firstPokemonSpeed = selectedPokemonData.stats[5].stats;
            let allDataWithoutSelectedPokemon = removeSelectedPokemon(allPokemonsData, selectedPokemonData)
    
            let randomPockemon = allDataWithoutSelectedPokemon[Math.floor(Math.random() * allDataWithoutSelectedPokemon.length)]; // getting random opponent
            let secondPokemonName = randomPockemon.name;
            let secondPokemonSpeed = randomPockemon.stats[5].stats;
            let secondImg = randomPockemon.frontImg;
            let secondImgElement = document.getElementById("secondBackImg");
            secondImgElement.setAttribute("src", secondImg)
    
            setTimeout(function(){ //drawing
                let secondCtx = context;
                context.font = "15px Arial";
                context.fillStyle="black";
                context.fillText(selectedPokemonName, 60, 50); // drawing the selected pokemon name
                context.drawImage(firstBackImgElement,30, 50); // and img
                context.fill()
                secondCtx.fillText(secondPokemonName, pokemon.width/2, pokemon.height/3);
                secondCtx.drawImage(secondImgElement, 150, pokemon.height/3);
                secondCtx.fill();
                
                let xFirst = 30;
                let xSecond = 150;
    
                let firstHealth= selectedPokemonData.stats[0].stats;
                let firstPokemonDamage = (selectedPokemonData.stats[2].stats / randomPockemon.stats[2].stats)* Math.floor(Math.random() * 201);
                context.fillStyle="green";
                context.fillRect(20,10,firstHealth,20);
    
                let secondHealth=randomPockemon.stats[0].stats;
                let secondPokemonDamage = (randomPockemon.stats[2].stats / selectedPokemonData.stats[2].stats)* Math.floor(Math.random() * 201);
                secondCtx.fillStyle="green";
                secondCtx.fillRect(175,10,secondHealth,20);
                secondCtx.fill()
    
                let battle = setInterval(function(){
                if(firstPokemonDamage > 0 && secondPokemonDamage > 0 && firstPokemonSpeed >= secondPokemonSpeed) {
                    
                    moveFirstPokemon(context, xFirst, firstBackImgElement, pokemon)
                    setTimeout(function(){
                        blinkThreeTimes(secondCtx, secondImgElement, xSecond, pokemon)
                    },300)
    
                    setTimeout(function(){
                        secondCtx.clearRect(175,10,secondHealth, 20)
                        secondHealth-=firstPokemonDamage;
                        if(secondHealth > 0) {
                            secondCtx.fillRect(175,10,secondHealth,20);
                            moveSecondPokemon(secondCtx, xSecond, secondImgElement, pokemon)
                            setTimeout(function(){
                                blinkThreeTimes(context, firstBackImgElement, xFirst, pokemon)
                                context.clearRect(20,10,firstHealth, 20)
                                firstHealth-=secondPokemonDamage;
                                if(firstHealth > 0) {
                                    context.fillRect(20,10,firstHealth,20);
                                } else{
                                    toggleWinOrLoseElements("loss", context, allPokemonsData, selectedPokemonData, pokemon)
                                }
                            }, 1000)
                        } else {
                            
                            toggleWinOrLoseElements("win", context, allPokemonsData, selectedPokemonData, pokemon)
                            
    
                        } 
                    }, 1500)
                } else if(firstPokemonDamage > 0 && secondPokemonDamage > 0 && firstPokemonSpeed < secondPokemonSpeed){
                    moveSecondPokemon(secondCtx, xSecond, secondImgElement, pokemon)
                    setTimeout(function(){
                        blinkThreeTimes(context, firstBackImgElement, xFirst, pokemon)
                    },300)
                    setTimeout(function(){
                        context.clearRect(20,10,firstHealth, 20)
                        firstHealth-=secondPokemonDamage;
                        if(firstHealth < 0){
                            firstHealth = 0;
                        }
                        if(firstHealth > 0) {
                            context.fillRect(20,10,firstHealth,20);
                            moveFirstPokemon(context, xFirst, firstBackImgElement, pokemon)
                            setTimeout(function(){
                                blinkThreeTimes(secondCtx, secondImgElement, xSecond, pokemon)
                                secondCtx.clearRect(175,10,secondHealth, 20)
                                secondHealth-=firstPokemonDamage;
                                if(secondHealth > 0) {
                                    secondCtx.fillRect(175,10,secondHealth,20);
                                } else{
                                    toggleWinOrLoseElements("win", context, allPokemonsData, selectedPokemonData, pokemon)
                                }
                            }, 1000)
                        } else {
                            toggleWinOrLoseElements("loss", context, allPokemonsData, selectedPokemonData, pokemon)
                        }
                    }, 1500)
                }
            },6000)
            setInterval(function(){
                if(firstHealth<=0) {
                    clearInterval(battle)
                } else if(secondHealth<=0) {
                    clearInterval(battle)
                }
            },500)
            }, 1000)
    
        })
    }
},2000)
    