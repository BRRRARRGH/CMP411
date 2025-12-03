var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
function getPlayerData(player) {
    return __awaiter(this, void 0, void 0, function () {
        var playerToGet, currentPrompt, myData, myJSON, country, countryJSON;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    playerToGet = player;
                    currentPrompt = "https://api.chess.com/pub/player/" + playerToGet;
                    return [4 /*yield*/, fetch(currentPrompt)];
                case 1:
                    myData = _a.sent();
                    return [4 /*yield*/, myData.json()];
                case 2:
                    myJSON = _a.sent();
                    if (myJSON.username == "undefined") // checks if the playerToGet exists/is a valid username in the database
                     { //if true, throws error
                        console.log("error occured");
                        throw new Error("Player does not exist!");
                    }
                    return [4 /*yield*/, fetch(myJSON.country)];
                case 3:
                    country = _a.sent();
                    return [4 /*yield*/, country.json()];
                case 4:
                    countryJSON = _a.sent();
                    return [2 /*return*/, countryJSON.name]; //returns the country
            }
        });
    });
}
function getPlayerStats(player) {
    return __awaiter(this, void 0, void 0, function () {
        var playerToGet, currentPrompt, myData, myJSON, stats, j;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    playerToGet = player;
                    currentPrompt = "https://api.chess.com/pub/player/" + playerToGet + "/stats";
                    return [4 /*yield*/, fetch(currentPrompt)];
                case 1:
                    myData = _a.sent();
                    return [4 /*yield*/, myData.json()];
                case 2:
                    myJSON = _a.sent();
                    stats = [] //initializes an array
                    ;
                    for (j = 0; j < 3; j++) //pushes 3 arrays into the stats array
                     {
                        stats.push(new Array);
                    }
                    //pushes, the latest rating, best rating, total games, and winning percentage
                    //checks if it exists, pushes that value, if it doesn't pushes a 0
                    //Reason why every statement needs a try/catch
                    try {
                        stats[0].push(parseInt(myJSON.chess_bullet.last.rating));
                    }
                    catch (_b) {
                        stats[0].push(0);
                    }
                    try {
                        stats[0].push(parseInt(myJSON.chess_bullet.best.rating));
                    }
                    catch (_c) {
                        stats[0].push(0);
                    }
                    try {
                        stats[0].push(parseInt(myJSON.chess_bullet.record.win, 10) + parseInt(myJSON.chess_bullet.record.loss, 10) + parseInt(myJSON.chess_bullet.record.draw, 10));
                    }
                    catch (_d) {
                        stats[0].push(0);
                    }
                    try {
                        stats[0].push(parseInt(myJSON.chess_bullet.record.win, 10) / stats[0][2]);
                    }
                    catch (_e) {
                        stats[0].push(0);
                    }
                    try {
                        stats[1].push(parseInt(myJSON.chess_blitz.last.rating));
                    }
                    catch (_f) {
                        stats[1].push(0);
                    }
                    try {
                        stats[1].push(parseInt(myJSON.chess_blitz.best.rating));
                    }
                    catch (_g) {
                        stats[1].push(0);
                    }
                    try {
                        stats[1].push(parseInt(myJSON.chess_blitz.record.win, 10) + parseInt(myJSON.chess_blitz.record.loss, 10) + parseInt(myJSON.chess_blitz.record.draw, 10));
                    }
                    catch (_h) {
                        stats[1].push(0);
                    }
                    try {
                        stats[1].push(parseInt(myJSON.chess_blitz.record.win, 10) / stats[1][2]);
                    }
                    catch (_j) {
                        stats[1].push(0);
                    }
                    try {
                        stats[2].push(parseInt(myJSON.chess_rapid.last.rating));
                    }
                    catch (_k) {
                        stats[2].push(0);
                    }
                    try {
                        stats[2].push(parseInt(myJSON.chess_rapid.best.rating));
                    }
                    catch (_l) {
                        stats[2].push(0);
                    }
                    try {
                        stats[2].push(parseInt(myJSON.chess_rapid.record.win, 10) + parseInt(myJSON.chess_rapid.record.loss, 10) + parseInt(myJSON.chess_rapid.record.draw, 10));
                    }
                    catch (_m) {
                        stats[2].push(0);
                    }
                    try {
                        stats[2].push(parseInt(myJSON.chess_rapid.record.win, 10) / stats[2][2]);
                    }
                    catch (_o) {
                        stats[2].push(0);
                    }
                    return [2 /*return*/, stats]; //returns the stats array
            }
        });
    });
}
function getPlayerGames(playerID) {
    return __awaiter(this, void 0, void 0, function () {
        var gameArray, gameArchivesData, gameArchivesJSON, gameArchivesList, i, archiveMonth, archiveMonthData, archiveMonthJSON, archiveGamesList, j, currentGame, game;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    gameArray = [] //Array of Arrays of games
                    ;
                    return [4 /*yield*/, fetch("https://api.chess.com/pub/player/" + playerID + "/games/archives")];
                case 1:
                    gameArchivesData = _a.sent();
                    return [4 /*yield*/, gameArchivesData.json()];
                case 2:
                    gameArchivesJSON = _a.sent();
                    gameArchivesList = gameArchivesJSON.archives;
                    i = gameArchivesList.length - 1;
                    _a.label = 3;
                case 3:
                    if (!(i >= 0)) return [3 /*break*/, 7];
                    archiveMonth = gameArchivesList[i];
                    return [4 /*yield*/, fetch(archiveMonth)];
                case 4:
                    archiveMonthData = _a.sent();
                    return [4 /*yield*/, archiveMonthData.json()];
                case 5:
                    archiveMonthJSON = _a.sent();
                    archiveGamesList = archiveMonthJSON.games;
                    for (j = archiveGamesList.length - 1; j >= 0; j--) //loops through all games backward to forward
                     {
                        currentGame = archiveGamesList[j];
                        game = [];
                        game.push(currentGame.url); //adds url to game
                        game.push(currentGame.time_class); //adds timeclass to game
                        if (currentGame.white.username == playerID) //checks if player is white
                         {
                            try {
                                game.push(currentGame.accuracies.white); //add accuracy of player to game
                            }
                            catch (_b) {
                                game.push("N/A"); //if no accuracy, push N/A
                            }
                            game.push(currentGame.white.result); //push result for player
                        }
                        else //if player is black, same as above but for black
                         {
                            try {
                                game.push(currentGame.accuracies.black);
                            }
                            catch (_c) {
                                game.push("N/A");
                            }
                            game.push(currentGame.black.result);
                        }
                        gameArray.push(game); //adds game to gameArray
                        if (gameArray.length >= 5) //if 5 games have been found, break the loop
                         {
                            break;
                        }
                    }
                    if (gameArray.length >= 5) //if 5 games have been found, break the loop
                     {
                        return [3 /*break*/, 7];
                    }
                    _a.label = 6;
                case 6:
                    i--;
                    return [3 /*break*/, 3];
                case 7: return [2 /*return*/, gameArray]; //returns the 5 games
            }
        });
    });
}
