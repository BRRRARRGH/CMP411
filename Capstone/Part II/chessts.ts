async function getPlayerData(player: string) // gets country of the player
{
    let playerToGet : string = player; //sets player to local variable (Def not needed, why is this here lol)
    let currentPrompt : string = "https://api.chess.com/pub/player/" + playerToGet; //creates prompt
    let myData : Response = await fetch(currentPrompt); //fetches
    let myJSON : any = await myData.json(); //turns to json
    if(myJSON.username == "undefined") // checks if the playerToGet exists/is a valid username in the database
    { //if true, throws error
        
        console.log("error occured")
        throw new Error("Player does not exist!")
    }
    let country : Response = await fetch(myJSON.country); //fetches country based on the json
    let countryJSON : any = await country.json(); //turns to jsoon
    return countryJSON.name; //returns the country
    
    
}


async function getPlayerStats(player : string) //gets the stats based off a playerID
{    
    let playerToGet : string = player; //sets playerTOGET = player (Still no reason to do this lmao)
    let currentPrompt : string = "https://api.chess.com/pub/player/" + playerToGet + "/stats"; //creates prompt
    let myData : Response = await fetch(currentPrompt); //fetches
    let myJSON : any = await myData.json(); //turns to json
    let stats : number[][] = [] //initializes an array
    for (let j : number = 0; j < 3; j++) //pushes 3 arrays into the stats array
    {
        stats.push(new Array);
    }


    //pushes, the latest rating, best rating, total games, and winning percentage
    //checks if it exists, pushes that value, if it doesn't pushes a 0
    //Reason why every statement needs a try/catch
    try
    {
        stats[0].push(parseInt(myJSON.chess_bullet.last.rating))
    }
    catch
    {
        stats[0].push(0)
    }
    try
    {
        stats[0].push(parseInt(myJSON.chess_bullet.best.rating))
    }
    catch
    {
        stats[0].push(0)
    }
    
    try
    {
        stats[0].push(parseInt(myJSON.chess_bullet.record.win, 10) + parseInt(myJSON.chess_bullet.record.loss, 10) + parseInt(myJSON.chess_bullet.record.draw, 10))

    }
    catch
    {
        stats[0].push(0)
    }
    try
    {
        stats[0].push(parseInt(myJSON.chess_bullet.record.win, 10) / stats[0][2])
    }
        catch
    {
        stats[0].push(0)
    }

    try
    {
        stats[1].push(parseInt(myJSON.chess_blitz.last.rating))

    }
    catch
    {
        stats[1].push(0)
    }
    try
    {
        stats[1].push(parseInt(myJSON.chess_blitz.best.rating))
    }
    catch
    {
        stats[1].push(0)
    }
    
    try
    {
        stats[1].push(parseInt(myJSON.chess_blitz.record.win, 10) + parseInt(myJSON.chess_blitz.record.loss, 10) + parseInt(myJSON.chess_blitz.record.draw, 10))
    }
    catch
    {
        stats[1].push(0)
    }
    try
    {
        stats[1].push(parseInt(myJSON.chess_blitz.record.win, 10) / stats[1][2]);

    }
    catch
    {
        stats[1].push(0)
    }

    try
    {
        stats[2].push(parseInt(myJSON.chess_rapid.last.rating))

    }
    catch
    {
        stats[2].push(0)
    }
    try
    {
        stats[2].push(parseInt(myJSON.chess_rapid.best.rating))
    }
    catch
    {
        stats[2].push(0)
    }
    try
    {
        stats[2].push(parseInt(myJSON.chess_rapid.record.win, 10) + parseInt(myJSON.chess_rapid.record.loss, 10) + parseInt(myJSON.chess_rapid.record.draw, 10))
    }
    catch
    {
        stats[2].push(0)
    }
    try
    {
        stats[2].push(parseInt(myJSON.chess_rapid.record.win, 10) / stats[2][2])
    }
    catch
    {
        stats[2].push(0)
    }
    return stats; //returns the stats array
}


async function getPlayerGames(playerID : string) //gets 5 last games a player has played. 
{
    let gameArray : string[][] = [] //Array of Arrays of games
    let gameArchivesData : Response = await fetch("https://api.chess.com/pub/player/" + playerID + "/games/archives");  //fetches
    let gameArchivesJSON : any = await gameArchivesData.json();  //turns data into json
    let gameArchivesList : any = gameArchivesJSON.archives; //accesses the object inside the json
    for (let i : number = gameArchivesList.length - 1; i >= 0; i--) //loops through all elements
    {
        let archiveMonth : string = gameArchivesList[i]; //sets month = currently accessed obj
        let archiveMonthData : Response= await fetch(archiveMonth); //fetches games using that month
        let archiveMonthJSON : any = await archiveMonthData.json(); //turns to json
        let archiveGamesList : any = archiveMonthJSON.games; //accesses game object inside list
        for(let j : number = archiveGamesList.length - 1; j >= 0; j--) //loops through all games backward to forward
        {
            let currentGame : any = archiveGamesList[j]; //sets current game to that element inside of archivesgameslist
            let game : string[] = []; //Array of Games with URL, Time_Class, Accuracy, Result
            game.push(currentGame.url); //adds url to game
            game.push(currentGame.time_class); //adds timeclass to game

            if(currentGame.white.username == playerID) //checks if player is white
            {
                try
                {
                    game.push(currentGame.accuracies.white); //add accuracy of player to game
                }
                catch
                {
                    game.push("N/A"); //if no accuracy, push N/A
                }
                game.push(currentGame.white.result); //push result for player
            }
            else //if player is black, same as above but for black
            {
                try
                {
                    game.push(currentGame.accuracies.black);
                }
                catch
                {
                    game.push("N/A");
                }
                game.push(currentGame.black.result);
            }
            gameArray.push(game) //adds game to gameArray
            if(gameArray.length >= 5) //if 5 games have been found, break the loop
            {
                break;
            }
        }
        if(gameArray.length >= 5)//if 5 games have been found, break the loop
        {
            break;
        }
    }
    return gameArray; //returns the 5 games
}
