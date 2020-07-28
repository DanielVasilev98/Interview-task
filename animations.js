function moveFirstPokemon(context, x, firstImgElement, pokemon) {
    let y = pokemon.height/3;
            //
    let isMoved = false;
    let firstPokemonMove = setInterval(function() {
    context.clearRect(x,y+10,100,90)
    context.beginPath()
    context.drawImage(firstImgElement, x, y);
    context.fill();
    context.closePath();
    if(x == 70) {
        isMoved=true;
        context.clearRect(x,y+10,100,100)
    }
    if(isMoved) {
        context.clearRect(x,y+10,100,100)
        context.beginPath();
        context.drawImage(firstImgElement, x, y);
        context.fill();
        context.closePath();
        x-=10;

    } else {
        x+=10;
    }
    },100);
            
    setInterval(function(){
        if(x>80 || x==30) {
            clearInterval(firstPokemonMove)
        }
    }, 100)
}

function moveSecondPokemon(secondCtx, x, secondImgElement, pokemon) {
    let y = pokemon.height/3;
            //
    let isMoved = false;
    let secondPokemonMove = setInterval(function() {
    secondCtx.clearRect(x,y+10,100,100)
    secondCtx.beginPath()
    secondCtx.drawImage(secondImgElement, x, y);
    secondCtx.fill();
    secondCtx.closePath();
    if(x == 120) {
        isMoved=true;
        secondCtx.clearRect(x,y+10,100,100)
    }
    if(isMoved) {
        secondCtx.clearRect(x,y+10,100,0)
        secondCtx.beginPath()
        secondCtx.drawImage(secondImgElement, x, y);
        secondCtx.fill();
        secondCtx.closePath();
        x+=10;

    } else {
        x-=10;
    }
    },100);
            
    setInterval(function(){
        if(x>150) {
            clearInterval(secondPokemonMove)
        }
    }, 100)
}


function blinkThreeTimes(ctx, img, x, pokemon) {
    setTimeout(function(){
        ctx.clearRect(x,pokemon.height/3,100, 100)
        setTimeout(function(){     
            ctx.drawImage(img, x, pokemon.height/3);
            setTimeout(function(){
                ctx.clearRect(x,pokemon.height/3,100, 100)
                setTimeout(function(){
                    ctx.drawImage(img, x, pokemon.height/3);
                    setTimeout(function(){
                        ctx.clearRect(x,pokemon.height/3,100, 100)
                        setTimeout(function(){
                            ctx.drawImage(img, x, pokemon.height/3);
                        },200)
                    }, 200)
                },200)
            }, 200)
        },200)
    },200)
}

function toggleWinOrLoseElements(winOrLose, ctx, allData, selPokemonData, pokemon) {
    setTimeout(function(){
	    document.getElementById("winOrLoss").setAttribute("style", "display: block;");
	    document.getElementById(winOrLose).setAttribute("style", "display: inline-block;");
	    document.getElementById("playAgain").addEventListener("click", function(){
		    allData[19] = selPokemonData;
		    ctx.clearRect(0,0,pokemon.width, pokemon.height)
		    document.getElementById("winOrLoss").setAttribute("style", "display: none;");
		    document.getElementById(winOrLose).setAttribute("style", "display: none;");
		    document.getElementById("battleArea").setAttribute("style", "display: none;");
        })
    },1500)
}