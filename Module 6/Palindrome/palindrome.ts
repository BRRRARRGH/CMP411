let List1 : string = "";
let List2 : string = "";
let List3 : string = "";
let Case1 : boolean = false;
let Case2 : boolean = false;
let Case3 : boolean = false;

// ChatGPT prompt: give me 3 different algorithms for solving for a palindrome

function validateAndAdd(){
    let ListNum = (<HTMLInputElement>document.getElementById("whichList")).value;
    if((<HTMLInputElement>document.getElementById("input")).value == "")
    {
        alert("Please enter a word to add");

    } 
    else if(ListNum != "1" && ListNum != "2" && ListNum != "3")
    {
        alert("Please enter a 1 or a 2 for the list");
        (<HTMLInputElement>document.getElementById("whichList")).value = "";
    }
    
    else
    {
        if(ListNum == "1")
        {
            /*isPalindrome = checkPalindrome1();*/
            List1 += (<HTMLInputElement>document.getElementById("input")).value + ": " + isPalindrome1() + '<br>';
            (<HTMLInputElement>document.getElementById("List-1-Text")).innerHTML = List1;
        }
        if(ListNum == "2")
        {
            /*isPalindrome = checkPalindrome2();*/
            List2 += (<HTMLInputElement>document.getElementById("input")).value + ": " + isPalindrome2() + '<br>';
            (<HTMLInputElement>document.getElementById("List-2-Text")).innerHTML = List2;
        }
        if(ListNum == "3")
        {
            /*isPalindrome = checkPalindrome3();*/
            List3 += (<HTMLInputElement>document.getElementById("input")).value + ": " + isPalindrome3() + '<br>';
            (<HTMLInputElement>document.getElementById("List-3-Text")).innerHTML = List3;
        }
        (<HTMLInputElement>document.getElementById("whichList")).value = "";
        (<HTMLInputElement>document.getElementById("input")).value = "";




    }
}

function isPalindrome1()
{
    const word : string = (<HTMLInputElement>document.getElementById("input")).value;
    let myWord : string = "";
    if(!Case1)
    {
        myWord = word.toLowerCase();
    }
    else
    {
        myWord = word;
    }
    let originalArray : string[] = myWord.split("");
    
    let reversedArray : string[] = originalArray.toReversed();
    for(let i = 0; i < originalArray.length; i++)
    {
        if(originalArray[i] != reversedArray[i])
        {
            return "False";
        }
    }
    return "True";

}

function isPalindrome2()
{
    const word = (<HTMLInputElement>document.getElementById("input")).value;
    let myWord = "";
    if(!Case2)
    {
        myWord = word.toLowerCase();
    }
    else
    {
        myWord = word;
    }
    
    if (myWord.length % 2 == 1)
    {
        for (let i = 0, j = myWord.length - 1; i <= ((myWord.length - 1)/ 2); i++)
        {
            
            if(myWord[i] != myWord[j])
            {
                return "False";
            }
            j--;
            // paaap
            // i = 0, j = 4
            //i = 1, j = 3
            // i = 2, j = 2
        }
        return "True";
    }
    else
    {
        for (let i = 0, j = myWord.length - 1; i < myWord.length / 2; i++)
        {
            
            if(myWord[i] != myWord[j])
            {
                return "False";
            }
            j--;
            // paaaap
            // i = 0, j = 5
            //i = 1, j = 4
            // i = 2, j = 3
        }
        return "True";
    }
    
}

function isPalindrome3()
{
    const word = (<HTMLInputElement>document.getElementById("input")).value;
    let myWord = "";
    if(!Case3)
    {
        myWord = word.toLowerCase();
    }
    else
    {
        myWord = word;
    }
    return recursioning(myWord);
}

function recursioning(myString : string)
{
    if(myString.length <= 1)
    {
        return "True";
    }
    if(myString[0] != myString[myString.length - 1])
    {
        return "False";
    }
    let newWord : string = myString.slice(1, myString.length - 1);
    return recursioning(newWord);
}




function clearList1()
{
    List1= "";
    (<HTMLInputElement>document.getElementById("List-1-Text")).innerHTML = List1;
}

function clearList2()
{
    List2 = "";
    (<HTMLInputElement>document.getElementById("List-2-Text")).innerHTML = List2;
}

function clearList3()
{
    List3 = "";
    (<HTMLInputElement>document.getElementById("List-3-Text")).innerHTML = List3;
}

function swapCase1()
{
    clearList1()
    if(Case1)
    {
        Case1 = false;
        (<HTMLInputElement>document.getElementById("List-1-Case")).innerHTML = "Case Sensitive: False";
    }
    else
    {
        Case1 = true;
        (<HTMLInputElement>document.getElementById("List-1-Case")).innerHTML = "Case Sensitive: True";
    }
}

function swapCase2()
{
    clearList2();
    if(Case2)
    {
        Case2 = false;
        (<HTMLInputElement>document.getElementById("List-2-Case")).innerHTML = "Case Sensitive: False";

    }
    else
    {
        Case2 = true;
        (<HTMLInputElement>document.getElementById("List-2-Case")).innerHTML = "Case Sensitive: True";
    }
}

function swapCase3()
{
    clearList3();
    if(Case3)
    {
        Case3 = false;
        (<HTMLInputElement>document.getElementById("List-3-Case")).innerHTML = "Case Sensitive: False";

    }
    else
    {
        Case3 = true;
        (<HTMLInputElement>document.getElementById("List-3-Case")).innerHTML = "Case Sensitive: True";

    }
}
