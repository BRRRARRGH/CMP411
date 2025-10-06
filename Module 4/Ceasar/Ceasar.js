

async function FetchData()
{
    let numParas = document.getElementById("paras").value;
    let meatType = document.getElementById("meat").value;
    let startWith = document.getElementById("start").value;
    let cipher = document.getElementById("cipher").value;
    let format = "";
    let cipherText = "";
    let prompt = `https://baconipsum.com/api/?type=${meatType}&paras=${numParas}&start-with-lorem=${startWith}`;

    let myData = await fetch(prompt);

    let myJSON = await myData.json();

    document.getElementById("rawData").innerHTML = JSON.stringify(myJSON);
    document.getElementById("formattedData").innerHTML = "";

    for (para in myJSON)
    {
        format += '<br/>' + myJSON[para] + '<br/>';
    }
    document.getElementById("formattedData").innerHTML = format;

    if(cipher == "1")
    {
        
    }
    if(cipher == "2")
    {

    }

}