const { Alert } = require("bootstrap");

function feedbackFunction(){
    event.preventDefault();
    
    var response = true;
    var fbemailaddr = document.getElementById("fbuseremail").value;
    var fbcomment   = document.getElementById("fbcomment").value;

    var feedback = new Object();
    feedback.useremailaddr = fbemailaddr;
    feedback.comment = fbcomment;
    
    var post = new XMLHttpRequest();

    post.open("POST", contactus_url, true);
    post.setRequestHeader("Content-Type", "application/json");

    //respond
    post.onload = function()
    {
        if(post.status == 200){
            alert("Message Received");
        }
        else
        {
            alert("Message Error");
        }
    };

    //request
    post.send(JSON.stringify(feedback));
    
}