async function fetchData()
{
    let currentPrompt = "https://api.chess.com/pub/player/brrrarrgh";
    let myData = await fetch(currentPrompt);
    let myJSON = await myData.json();
    alert(JSON.stringify(myJSON))
}

/**Important Endpoints
 * 
 * https://api.chess.com/pub/player/{username} - Gets player Info
 * https://api.chess.com/pub/titled/{title-abbrev} - List of Players of a certain title
 * https://api.chess.com/pub/player/{username}/stats - Gets stats of a player
 * 
