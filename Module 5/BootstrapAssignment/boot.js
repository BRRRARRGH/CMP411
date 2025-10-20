async function FetchData()
{
    let myLength = document.getElementById("length").value; /* Gets value from dropdown menu of the length of the quote */
    let minLength = 0; /* Sets minimum Length variable for length of quote, representing characters */
    let maxLength = 0; /* Sets maximum Length variable for length of quote, representing characters */
        if(myLength == "short") /* checks the choice of myLength, and alters minLength and maxLength according */
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
    
    /* Creates the prompt for the quotable api for famous quotes, with lengths specified earlier */
    let prompt = `https://api.quotable.io/quotes/random?tags=famous-quotes&minLength=${minLength}&maxLength=${maxLength}`; 
    
    /* prompts the quotable api */
    let myData = await fetch(prompt);

    /* turn the fetch into JSON */
    let myJSON = await myData.json();

    /* Changes the inner HTML of both the quote and author to the fetch's values */
    document.getElementById("quote").innerHTML = myJSON[0].content;
    document.getElementById("author").innerHTML = myJSON[0].author;


}