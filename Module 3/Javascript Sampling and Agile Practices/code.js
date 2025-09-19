let List1 = ""
let List2 = ""

function validateAndAdd(){
    if(document.getElementById("input").value == "")
    {
        alert("Please enter a word to add")
    } 
    else if(document.getElementById("whichList").value != "1" && document.getElementById("whichList").value != "2")
    {
        alert("Please enter a 1 or a 2 for the list");
        document.getElementById("whichList").value = "";
    }
    else
    {
        if(document.getElementById("whichList").value == "1")
        {
            List1 += document.getElementById("input").value + '<br>';
            document.getElementById("List-1-Text").innerHTML = List1;
        }
        if(document.getElementById("whichList").value == "2")
        {
            List2 += document.getElementById("input").value + '<br>';
            document.getElementById("List-2-Text").innerHTML = List2;
        }
        document.getElementById("whichList").value = "";
        document.getElementById("input").value = "";




    }
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