async function findPlayer() //checks if id works, and if it does, displays their id, country, ratings, and games
{
    playerToFind = document.getElementById("playerID").value; //gets the id from input box
    document.getElementById("playerID").value = ""; //resets the input box
    if(validateInput(playerToFind)) //validates the input - if it works program continues, else, return error mssg. 
    {
        try
        {
            let country = await getPlayerData(playerToFind); //gets player Country from chessts.ts
            let ratings = await getPlayerStats(playerToFind); //gets player Ratings from chessts.ts
            let games = await getPlayerGames(playerToFind); //get Player games from chessts.ts
            document.getElementById("playerUsername").innerHTML = playerToFind; //sets display to playerID
            document.getElementById("playerCountry").innerHTML = country; //sets display to country
            fillRating("playerBullet", ratings, 0); //calls ratings for bullet
            fillRating("playerBlitz", ratings, 1); //calls ratings for blitz
            fillRating("playerRapid", ratings, 2); //calls ratings for rapid
            fillGames("game1", games, 0); //calls game for game1
            fillGames("game2", games, 1); //calls game for game2
            fillGames("game3", games, 2); //calls game for game3
            fillGames("game4", games, 3); //calls game for game4
            fillGames("game5", games, 4); //calls game for game5

            function fillRating(idOfElement, ratingsList, num) //function to fill html rating, with the id of the html element, the ratingslist for the player, and the index inside the list
            { //I realize now i could have just put in ratingsList[num] and did it with 1 less paramenter, but yknow
                let ratingPlace = document.getElementById(idOfElement); //gets the element of the html
                ratingPlace.children[0].innerHTML = "Current Rating = " + ratingsList[num][0]; //sets the values inside the list in HTML
                ratingPlace.children[1].innerHTML = "Best Rating = " + ratingsList[num][1];
                ratingPlace.children[2].innerHTML = "Total Games = " + ratingsList[num][2];
                ratingPlace.children[3].innerHTML = "Win Percentage = " + ratingsList[num][3];
            }

            function fillGames(idOfElement, gamesList, num) //function to fill html of gaming, with id of html element, games list of games of the player, and the index inside the gameslist
            {
                let gamesPlace = document.getElementById(idOfElement); //gets the element of id in html
                gamesPlace.children[0].innerHTML = "Time Class = " + gamesList[num][1]; //sets the values inside the list in html
                gamesPlace.children[1].innerHTML = "Accuracy = " + gamesList[num][2];
                gamesPlace.children[2].innerHTML = "Result = " + gamesList[num][3];
                document.getElementById("game" + (num + 1) + "Link").href = gamesList[num][0]; //sets the link to the correct link
            }
            document.getElementById("playerSection").style.display = "block"; //reverts the display for the entire section from 'none' to 'block'
        }
        catch (error) //error catch if something went wrong
        {
            console.error(error);
            alert("PlayedID is not found in Database, try a different one.");
        }
    }
    else //if validateInput did not work
    {
        alert("Invalid Input, try a different one!");
    }
        

}

function validateInput(stringToValidate)
{
  return /^[a-zA-Z0-9_-]+$/.test(stringToValidate); //tests the string using regex. the ^ means start of string, + means all the way through, $ means end os string
  //a-z & A-Z means all letter, 0-9 means all nums, and _ - means to include those symbols.
  //If the string has any symbols not included, returns false, otherwise return true
}


async function getStreamers() //gets 5 active streamers and displays info about them. 
{
    let streamerData = await fetch("https://api.chess.com/pub/streamers"); //fetch
    let streamerJSON = await streamerData.json(); //turn to json
    let streamerArray = streamerJSON.streamers; //gets the array object
    let i = 0; //sets i = 0
    let liveStreamers = []; //creates array of live streamers
    let streamersToDisplay = new Array; //creates array of streamers to display
    while(streamerArray[i].is_live == true) //checks every live streamer
    {   
        let streamerPlatform = ""; //instantiates streamer's streaming platform
        platforms =  streamerArray[i].platforms; //goes into 
        if(platforms[0].is_main_live_platform) //checks the platforms and sets streamerplatform to the main link
        {
            streamerPlatform = platforms[0].stream_url;
        }
        else
        {
            streamerPlatform = platforms[1].stream_url;
        }
        let arrayToAdd = []; //create array to append to livestreamers
        arrayToAdd.push(streamerArray[i].username); //adds username
        arrayToAdd.push(streamerPlatform); //adds link
        liveStreamers.push(arrayToAdd); //adds to liveStreamers
        i = i + 1;//increments i
    }
    if(liveStreamers.length == 0) //if no active streamers, display message and have no table show
    {
        document.getElementById("emergencyStreamer").innerHTML = "Sorry! There are no active Streamers!";
        document.getElementById("table").style.display = "none";
    }
    else if(liveStreamers.length < 5) //if between 1-4, delete the extra spots
    {
        for(let j = 5; j > liveStreamers.length; j--)
        {
            document.getElementById("tr" + String(j)).style.display = "none";
        } 
        streamersToDisplay = liveStreamers.splice(); //copy to display to live streamers
    }
    else //if 5+ streamers are live
    {
        for(let j = 0; j < 5; j++)
        {
            indexToAdd = Math.floor(Math.random() * liveStreamers.length); //gets a random index to add
            streamersToDisplay.push(liveStreamers.pop(indexToAdd)); //adds that to to display and removes from liveStreamers
        }
    }

    for(let j = 0; j < streamersToDisplay.length; j++) //displaying the chosen streamers
    {
        streamer = streamersToDisplay[j] //current Streamer
        let country = await getPlayerData(streamer[0]); //gets country of streamer from chessts.ts
        let ratings = await getPlayerStats(streamer[0]); //gets ratings of streamer from chessts.ts
        let highestRating = Math.max(ratings[0][0], ratings[1][0], ratings [2][0]); //returns highest current rating
        document.getElementById("stream" + (j+1)).innerHTML = streamer[0]; //displays all info
        document.getElementById("stream" + (j+1) + "Rating").innerHTML = highestRating;
        document.getElementById("stream" + (j+1) + "Country").innerHTML = country;
        document.getElementById("stream" + (j+1) + "Link").href = streamer[1]; //sets link to main stream link
    }

}

async function getDailyPuzzle() //daily puzzle function
{
    let puzzleButton = document.getElementById("puzzleLink"); //gets html element of the button
    let puzzleData = await fetch("https://api.chess.com/pub/puzzle"); //fetches
    let puzzleJSON = await puzzleData.json(); //turn to json
    document.getElementById("puzzleName").innerHTML = puzzleJSON.title; //displays title of the puzzle
    puzzleButton.addEventListener('click', function() //creates listener that once button is clicked, a new window opens with the url from puzzleJSON
    {
        window.open(puzzleJSON.url, '_blank')
    });

    
}

async function getLeaderboard() //gets top 10 players for bullet, blitz, and rapid
{
    let leaderboardData = await fetch("https://api.chess.com/pub/leaderboards"); //fetch
    let leaderboardJSON = await leaderboardData.json(); //json
    let leaderboardBullet = leaderboardJSON.live_bullet; //gets bullet object
    let leaderboardBlitz = leaderboardJSON.live_blitz; //gets blitz obj
    let leaderboardRapid = leaderboardJSON.live_rapid; //gets rapid obj
    let myBulletList = document.getElementById("bulletList"); //gets the list inside html for bullet
    let myBlitzList = document.getElementById("blitzList"); //gets the list inside html for blitz
    let myRapidList = document.getElementById("rapidList"); //gets the list inside html for rapid
    for(let i = 0; i < 10; i++) //loops 10 times, adding the top 10 of each category to the list
    {
        myBulletList.children[i].innerHTML = "Username: " + leaderboardBullet[i].username + "<br>Rating: " + leaderboardBullet[i].score;
        myBlitzList.children[i].innerHTML = "Username: " + leaderboardBlitz[i].username + "<br>Rating: " + leaderboardBlitz[i].score;
        myRapidList.children[i].innerHTML = "Username: " + leaderboardRapid[i].username + "<br>Rating: " + leaderboardRapid[i].score;
    }
}

document.addEventListener("DOMContentLoaded", function() //upon DOM load, callAllFunctions
{
    callAllFunctions();
});
async function callAllFunctions()// calls DailyPuzzle, leaderboard, and streamers - basically the info that should be there when the page opens. 
{
    getDailyPuzzle();
    getLeaderboard();
    getStreamers();
    
}



/**Important Endpoints
 * 
 * https://api.chess.com/pub/player/{username} - Gets player Info
 * https://api.chess.com/pub/titled/{title-abbrev} - List of Players of a certain title
 * https://api.chess.com/pub/player/{username}/stats - Gets stats of a player
 * https://api.chess.com/pub/player/erik/games/archives - Get player archives of games
 * https://api.chess.com/pub/player/erik/games/2009/10 - Get games of that month from that player ^^ use also above function
 * 
**/