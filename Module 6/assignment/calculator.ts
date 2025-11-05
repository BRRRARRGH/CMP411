var minimum : number = NaN; //minimum number in the range
var maximum : number = NaN; //maximum number in the range
var myList : string = ""; //String that holds all the numbers added
var numArray : number[] = []; //array that holds all numbers added

function clearList()  //Clears the List and requires new minimum and maximums to be added
{
    myList = ""; //sets the list to empty
    (<HTMLInputElement>document.getElementById("myList")).innerHTML = myList; // sets the 2nd colomn to empty
    (<HTMLInputElement>document.getElementById("min")).disabled = false; //Allows the min to be written in again
    (<HTMLInputElement>document.getElementById("max")).disabled = false; //Allows the max to be written in again
    (<HTMLInputElement>document.getElementById("mean")).innerHTML = "Mean: N/A"; //Sets text for Mean to N/A
    (<HTMLInputElement>document.getElementById("median")).innerHTML = "Median: N/A"; //Sets text for Median to N/A
    (<HTMLInputElement>document.getElementById("mode")).innerHTML = "Mode: N/A"; //Sets text for Mode to N/A
}

function validate()//Makes sure the number is valid, and adding it to the list & Html element
{
    if(!(<HTMLInputElement>document.getElementById("min")).disabled)
    {
        lockRequirements();
    }
    if((<HTMLInputElement>document.getElementById("min")).disabled)
    {
        let numToAdd : number = +(<HTMLInputElement>document.getElementById("own")).value; //turns value to add into a number
        if((<HTMLInputElement>document.getElementById("own")).value == "") //checks if a value was inputted
        {
            alert("Please enter a value");
            (<HTMLInputElement>document.getElementById("own")).value = "";
        }
        else if (isNaN(numToAdd)) //checks if value is a number
        {
            alert("Your value to add is NaN, please change");
            (<HTMLInputElement>document.getElementById("own")).value = "";
        }
        else if (numToAdd != Math.floor(numToAdd)) // checks if number is a decimal
        {   
            alert("Your value to add is a decimal, please change");
            (<HTMLInputElement>document.getElementById("own")).value = "";
        }
        else if (numToAdd < minimum || numToAdd > maximum) //checks if value is between min and max
        {
            alert("Your value is smaller than the minimum or greater than the maximum, please change");
            (<HTMLInputElement>document.getElementById("own")).value = "";
        }
        else
        {
            numArray.push(numToAdd);
            myList += (<HTMLInputElement>document.getElementById("own")).value + '<br>'; //adds number to list + a line break
            (<HTMLInputElement>document.getElementById("myList")).innerHTML = myList; //Sets the HTML of the paragraph to display the numbers to the string myList
            (<HTMLInputElement>document.getElementById("own")).value = ""; //Empties the inputBox
            updateData(); //updates mathematical data
        }
    }
    
    
}

    


async function fetchNumber() // Failed API request stuff
{
    /*
    if(!(<HTMLInputElement>document.getElementById("min")).disabled)
    {
        lockRequirements();
    }
    if((<HTMLInputElement>document.getElementById("min")).disabled)
    {
        let prompt : string = "http://www.randomnumberapi.com/api/v1.0/random?min=${minimum}&max=${maximum}";
        let myData : Response = await fetch(prompt);
        let myJSON : Record<string, string> = await myData.json();
        let myNumber : number = +(myJSON[0])
        numArray.push(numToAdd);
        myList += myJSON[0] + '<br>'; //adds number to list + a line break
        (<HTMLInputElement>document.getElementById("myList")).innerHTML = myList; //Sets the HTML of the paragraph to display the numbers to the string myList
        updateData(); //updates mathematical data
    }
    
    
    */
}

function updateData() // Updates the mean, median, and mode of the dataset
{
    numArray.sort(); //sorts inputted Data
    let mean : number = NaN; //Instantiates mean variable
    let median : number = NaN; //Instantiates median variable

    //Mean Calculations
    let sum : number = 0; //sets sum to 0
    for(let i : number = 0; i < numArray.length; i++) // Adds up all the values in the number array
    {
        sum += numArray[i];
    }
    mean = sum / numArray.length; //Calculates mean
    (<HTMLInputElement>document.getElementById("mean")).innerHTML = "Mean: " + mean.toString(); //prints mean into the html element


    //median calculations
    if(numArray.length % 2 == 0) // checks if array is even
    {
        median = (((numArray[numArray.length / 2]) + (numArray[(numArray.length / 2) - 1])) / 2) // calculates median
    }
    else
    {
        median = numArray[(numArray.length - 1) / 2]; // calculates median
    }
    (<HTMLInputElement>document.getElementById("median")).innerHTML = "Median: " + median.toString(); //prints median into the html element


    //mode calculations
    
    let most : number[] = [numArray[0]]; //creates array of the values that are the mode
    let mostTotal : number = 1; //sets the number required to be considered the mode EX: list = [20, 20, 40, 40, 40, 50], mostTotal = 3
    let current : number = 1; //current number of times for the current value being considered
    let myString = "" //string to print into the HTML
    for(let i : number = 1; i < numArray.length; i++) //loops through numArray starting with 1
    {
        
        if(numArray[i] == numArray[i - 1]) //checks if the previous value is the same as the current, if so, increment current
        {
            current += 1;
        }
        else // else, set current = 1
        {
            current = 1
        }
        if (current == mostTotal) //if current is equal to most total, we have another mode to add, so add it to most array
        {
            most.push(numArray[i]) //adds to most[]
        }
        if (current > mostTotal) // if current is greater than most total, we have a distinct new mode, so we clear list, increment most total, and add our winner back into most[]
        {
            most.splice(0, most.length) // clears list
            mostTotal += 1 //increment mostTotal
            most.push(numArray[i]) //add to most[]
        }
    }
    for(let i : number = 0; i < most.length; i++) //loops through most[]
    {
        if(i == 0) //if starting value, just add the value
        {
            myString += most[i];
        }
        else //if more, add comma before hand
        {
            myString += ", " + most[i]
        }
    }
    (<HTMLInputElement>document.getElementById("mode")).innerHTML = "Mode: " + myString; //prints mode into the html element

}

function lockRequirements() // Function to lock Minimum and Maximum blocks after both are decided. 
{
    
    minimum = +((<HTMLInputElement>document.getElementById("min")).value); //turns the inputted value for the minimum into a number
    maximum = +((<HTMLInputElement>document.getElementById("max")).value); //turns the inputted value for the minimum into a number
    if(((<HTMLInputElement>document.getElementById("max")).value) == "" || ((<HTMLInputElement>document.getElementById("min")).value) == "") // checks if values are empty
    {
        alert("Please input a value for minimum or maximum");
        ((<HTMLInputElement>document.getElementById("max")).value) = "";
        ((<HTMLInputElement>document.getElementById("min")).value) = "";

    }
    else if (isNaN(minimum) || isNaN(maximum)) //checks if value is a number
    {
        alert("Your value for minimum or maximum is NaN, please change");
        ((<HTMLInputElement>document.getElementById("max")).value) = "";
        ((<HTMLInputElement>document.getElementById("min")).value) = "";
    }
    else if (minimum != Math.floor(minimum) || maximum != Math.floor(maximum)) // checks if number is a decimal
    {
        alert("Your value for minimum or maximum is a decimal, please change");
        ((<HTMLInputElement>document.getElementById("max")).value) = "";
        ((<HTMLInputElement>document.getElementById("min")).value) = "";
    }
    else if (minimum > maximum) //checks if min is greater than max
    {
        alert("Your maximum is smaller than the minimum, please change");
        ((<HTMLInputElement>document.getElementById("max")).value) = "";
        ((<HTMLInputElement>document.getElementById("min")).value) = "";
    }
    else //Locks mins and maxes so range can't be adjusted
    {
        (<HTMLInputElement>document.getElementById("min")).disabled = true;
        (<HTMLInputElement>document.getElementById("max")).disabled = true; 
    }

}
    
