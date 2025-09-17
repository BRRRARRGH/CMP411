let List1 = ""
let List2 = ""
const form = document.getElementById('firstForm');
document.getElementById("List-1-Text").innerHTML = "Thank you for your submission!";

form.addEventListener("submit", function(e){
    e.preventDefault();
    document.getElementById("List-1-Text").innerHTML = "Thank you for your submission!";

});