"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const myMap = new Map([["A", "M"], ["B", "N"], ["C", "O"], ["D", "P"], ["E", "Q"], ["F", "R"], ["G", "S"], ["H", "T"], ["I", "U"], ["J", "V"],
    ['K', 'W'], ['L', 'X'], ['M', 'Y'], ['N', 'Z'], ['O', 'A'], ["P", 'B'], ['Q', 'C'], ['R', 'D'], ['S', 'E'], ['T', 'F'], ['U', 'G'], ['V', 'H'], ['W', 'I'],
    ['X', 'J'], ['Y', 'K'], ['Z', 'L'],
    ['a', 'm'], ['b', 'n'], ['c', 'o'], ['d', 'p'], ['e', 'q'], ['f', 'r'], ['g', 's'], ['h', 't'], ['i', 'u'], ['j', 'v'], ['k', 'w'], ['l', 'x'],
    ['m', 'y'], ['n', 'z'], ['o', 'a'], ['p', 'b'], ['q', 'c'], ['r', 'd'], ['s', 'e'], ['t', 'f'], ['u', 'g'], ['v', 'h'], ['w', 'i'], ['x', 'j'], ['y', 'k'], ['z', 'l']]);
async function FetchData() {
    let numParas = document.getElementById("paras").value;
    let meatType = document.getElementById("meat").value;
    let startWith = document.getElementById("start").value;
    let format = "";
    let cipherText = "";
    let prompt = `https://baconipsum.com/api/?type=${meatType}&paras=${numParas}&start-with-lorem=${startWith}`;
    let myData = await fetch(prompt);
    let myJSON = await myData.json();
    let stringyJSON = JSON.stringify(myJSON);
    document.getElementById("rawData").innerHTML = stringyJSON;
    document.getElementById("formattedData").innerHTML = "";
    alert(myJSON);
    alert(myJSON[0]);
    for (let i = 0; i < Number(numParas); i++) {
        format += '<br/>' + myJSON[i] + '<br/>';
    }
    alert(format);
    document.getElementById("formattedData").innerHTML = format;
    for (const para in myJSON) {
        let myParaText = "";
        let paragraphString = myJSON[para];
        for (let i = 0; i < myJSON[para].length; i++) {
            if (paragraphString.charCodeAt(i) >= 87 && paragraphString.charCodeAt(i) <= 90) {
                myParaText += String.fromCharCode(paragraphString.charCodeAt(i) + 4 - 26);
            }
            else if (paragraphString.charCodeAt(i) >= 65 && paragraphString.charCodeAt(i) <= 86) {
                myParaText += String.fromCharCode(paragraphString.charCodeAt(i) + 4);
            }
            else if (paragraphString.charCodeAt(i) >= 119 && paragraphString.charCodeAt(i) <= 122) {
                myParaText += String.fromCharCode(paragraphString.charCodeAt(i) + 4 - 26);
            }
            else if (paragraphString.charCodeAt(i) >= 97 && paragraphString.charCodeAt(i) <= 118) {
                myParaText += String.fromCharCode(paragraphString.charCodeAt(i) + 4);
            }
            else {
                myParaText += paragraphString[i];
            }
        }
        cipherText += '<br/>' + myParaText + '<br/>';
    }
    document.getElementById("cipherText1").innerHTML = cipherText;
    cipherText = "";
    for (const para in myJSON) {
        let myParaText = "";
        let paragraphString = myJSON[para];
        for (let i = 0; i < myJSON[para].length; i++) {
            if (myMap.has(paragraphString[i])) {
                myParaText += myMap.get(paragraphString[i]);
            }
            else {
                myParaText += paragraphString[i];
            }
        }
        cipherText += '<br/>' + myParaText + '<br/>';
    }
    document.getElementById("cipherText2").innerHTML = cipherText;
}
//# sourceMappingURL=ceasar.js.map