

async function FetchData()
{
    let dropdownValue = document.getElementById("paras").value;
    let format = "";
    let prompt = "https://baconipsum.com/api/?type=all-meat&paras=" + document.getElementById("paras").value;

    let myData = await fetch(prompt);

    let myJSON = await myData.json();

    document.getElementById("rawData").innerHTML = JSON.stringify(myJSON);
    document.getElementById("formattedData").innerHTML = "";

    for (para in myJSON)
    {
        format += '<br/>' + myJSON[para] + '<br/>';
    }
    document.getElementById("formattedData").innerHTML = format;
}