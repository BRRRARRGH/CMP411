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
var minimum = NaN; //minimum number in the range
var maximum = NaN; //maximum number in the range
var myList = ""; //String that holds all the numbers added
var numArray = []; //array that holds all numbers added
function clearList() {
    myList = ""; //sets the list to empty
    document.getElementById("myList").innerHTML = myList; // sets the 2nd colomn to empty
    document.getElementById("min").disabled = false; //Allows the min to be written in again
    document.getElementById("max").disabled = false; //Allows the max to be written in again
    document.getElementById("mean").innerHTML = "Mean: N/A"; //Sets text for Mean to N/A
    document.getElementById("median").innerHTML = "Median: N/A"; //Sets text for Median to N/A
    document.getElementById("mode").innerHTML = "Mode: N/A"; //Sets text for Mode to N/A
    numArray.splice(0, numArray.length);
}
function validate() {
    if (!document.getElementById("min").disabled) {
        lockRequirements();
    }
    if (document.getElementById("min").disabled) {
        var numToAdd = +document.getElementById("own").value; //turns value to add into a number
        if (document.getElementById("own").value == "") //checks if a value was inputted
         {
            alert("Please enter a value");
            document.getElementById("own").value = "";
        }
        else if (isNaN(numToAdd)) //checks if value is a number
         {
            alert("Your value to add is NaN, please change");
            document.getElementById("own").value = "";
        }
        else if (numToAdd != Math.floor(numToAdd)) // checks if number is a decimal
         {
            alert("Your value to add is a decimal, please change");
            document.getElementById("own").value = "";
        }
        else if (numToAdd < minimum || numToAdd > maximum) //checks if value is between min and max
         {
            alert("Your value is smaller than the minimum or greater than the maximum, please change");
            document.getElementById("own").value = "";
        }
        else {
            numArray.push(numToAdd);
            myList += document.getElementById("own").value + '<br>'; //adds number to list + a line break
            document.getElementById("myList").innerHTML = myList; //Sets the HTML of the paragraph to display the numbers to the string myList
            document.getElementById("own").value = ""; //Empties the inputBox
            updateData(); //updates mathematical data
        }
    }
}
function fetchNumber() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/];
        });
    });
}
function updateData() {
    numArray.sort(function (a, b) { return a - b; }); //sorts inputted Data
    alert(numArray);
    var mean = NaN; //Instantiates mean variable
    var median = NaN; //Instantiates median variable
    //Mean Calculations
    var sum = 0; //sets sum to 0
    for (var i = 0; i < numArray.length; i++) // Adds up all the values in the number array
     {
        sum += numArray[i];
    }
    mean = sum / numArray.length; //Calculates mean
    document.getElementById("mean").innerHTML = "Mean: " + mean.toString(); //prints mean into the html element
    //median calculations
    if (numArray.length % 2 == 0) // checks if array is even
     {
        alert((numArray[numArray.length / 2]));
        alert(numArray[(numArray.length / 2) - 1]);
        median = (((numArray[numArray.length / 2]) + (numArray[(numArray.length / 2) - 1])) / 2); // calculates median
    }
    else {
        median = numArray[(numArray.length - 1) / 2]; // calculates median
    }
    document.getElementById("median").innerHTML = "Median: " + median.toString(); //prints median into the html element
    //mode calculations
    var most = [numArray[0]]; //creates array of the values that are the mode
    var mostTotal = 1; //sets the number required to be considered the mode EX: list = [20, 20, 40, 40, 40, 50], mostTotal = 3
    var current = 1; //current number of times for the current value being considered
    var myString = ""; //string to print into the HTML
    for (var i = 1; i < numArray.length; i++) //loops through numArray starting with 1
     {
        if (numArray[i] == numArray[i - 1]) //checks if the previous value is the same as the current, if so, increment current
         {
            current += 1;
        }
        else // else, set current = 1
         {
            current = 1;
        }
        if (current == mostTotal) //if current is equal to most total, we have another mode to add, so add it to most array
         {
            most.push(numArray[i]); //adds to most[]
        }
        if (current > mostTotal) // if current is greater than most total, we have a distinct new mode, so we clear list, increment most total, and add our winner back into most[]
         {
            most.splice(0, most.length); // clears list
            mostTotal += 1; //increment mostTotal
            most.push(numArray[i]); //add to most[]
        }
    }
    for (var i = 0; i < most.length; i++) //loops through most[]
     {
        if (i == 0) //if starting value, just add the value
         {
            myString += most[i];
        }
        else //if more, add comma before hand
         {
            myString += ", " + most[i];
        }
    }
    document.getElementById("mode").innerHTML = "Mode: " + myString; //prints mode into the html element
}
function lockRequirements() {
    minimum = +(document.getElementById("min").value); //turns the inputted value for the minimum into a number
    maximum = +(document.getElementById("max").value); //turns the inputted value for the minimum into a number
    if ((document.getElementById("max").value) == "" || (document.getElementById("min").value) == "") // checks if values are empty
     {
        alert("Please input a value for minimum or maximum");
        (document.getElementById("max").value) = "";
        (document.getElementById("min").value) = "";
    }
    else if (isNaN(minimum) || isNaN(maximum)) //checks if value is a number
     {
        alert("Your value for minimum or maximum is NaN, please change");
        (document.getElementById("max").value) = "";
        (document.getElementById("min").value) = "";
    }
    else if (minimum != Math.floor(minimum) || maximum != Math.floor(maximum)) // checks if number is a decimal
     {
        alert("Your value for minimum or maximum is a decimal, please change");
        (document.getElementById("max").value) = "";
        (document.getElementById("min").value) = "";
    }
    else if (minimum > maximum) //checks if min is greater than max
     {
        alert("Your maximum is smaller than the minimum, please change");
        (document.getElementById("max").value) = "";
        (document.getElementById("min").value) = "";
    }
    else //Locks mins and maxes so range can't be adjusted
     {
        document.getElementById("min").disabled = true;
        document.getElementById("max").disabled = true;
    }
}
