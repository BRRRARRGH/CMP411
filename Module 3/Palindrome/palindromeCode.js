let List1 = ""
let List2 = ""
let List3 = ""
let Case1 = false
let Case2 = false
let Case3 = false

function validateAndAdd(){
    let ListNum = document.getElementById("whichList").value;
    if(document.getElementById("input").value == "")
    {
        alert("Please enter a word to add");

    } 
    else if(ListNum != "1" && ListNum != "2" && ListNum != "3")
    {
        alert("Please enter a 1 or a 2 for the list");
        document.getElementById("whichList").value = "";
    }
    
    else
    {
        if(ListNum == "1")
        {
            /*isPalindrome = checkPalindrome1();*/
            List1 += document.getElementById("input").value + ": " /*+ isPalindrome */+ '<br>';
            document.getElementById("List-1-Text").innerHTML = List1;
        }
        if(ListNum == "2")
        {
            /*isPalindrome = checkPalindrome2();*/
            List2 += document.getElementById("input").value + ": " /*+ isPalindrome */+ '<br>';
            document.getElementById("List-2-Text").innerHTML = List2;
        }
        if(ListNum == "3")
        {
            /*isPalindrome = checkPalindrome3();*/
            List3 += document.getElementById("input").value + ": " /*+ isPalindrome */+ '<br>';
            document.getElementById("List-3-Text").innerHTML = List3;
        }
        document.getElementById("whichList").value = "";
        document.getElementById("input").value = "";




    }
}

function isPalindrome1()
{

}

function isPalindrome2()
{

}

function isPalindrome3()
{

}


function clearList1()
{
    List1 = "";
    document.getElementById("List-1-Text").innerHTML = List1;
}

function clearList2()
{
    List2 = ""
    document.getElementById("List-2-Text").innerHTML = List2;
}

function clearList3()
{
    List3 = ""
    document.getElementById("List-3-Text").innerHTML = List3;
}

function swapCase1()
{
    clearList1()
    if(Case1)
    {
        Case1 = false;
    }
    else
    {
        Case1 = true;
    }
}

function swapCase1()
{
    clearList2();
    if(Case2)
    {
        Case2 = false;
    }
    else
    {
        Case2 = true;
    }
}

function swapCase1()
{
    clearList3();
    if(Case3)
    {
        Case3 = false;
    }
    else
    {
        Case3 = true;
    }
}
