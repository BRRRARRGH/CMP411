async function FetchData()
{
    alert("called");
    let myLength = document.getElementById("length").value;
    let minLength = 0;
    let maxLength = 0;
        if(myLength == "short")
        {
            minLength = 0;
            maxLength = 50;
        }
        else if(myLength == "medium")
        {
            minLength = 51;
            maxLength = 150;
        }
        else
        {
            minLength = 151;
            maxLength = 400;
        }
    let prompt = `https://api.quotable.io/quotes/random?tags=famous-quotes&minLength=${minLength}&maxLength=${maxLength}`;
    let myData = await fetch(prompt);
    let myJSON = await myData.json();
    let stringyJSON = JSON.stringify(myJSON);
    document.getElementById("quote").innerHTML = stringyJSON;

    let format = "";
    document.getElementById("rawData").innerHTML = stringyJSON;
    document.getElementById("formattedData").innerHTML = "";

    for (para in myJSON)
    {
        format += '<br/>' + myJSON[para] + '<br/>';
    }
    document.getElementById("quote").innerHTML = format;


}