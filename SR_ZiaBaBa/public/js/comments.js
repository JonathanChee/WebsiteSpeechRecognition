function fetchComments() {
    var request = new XMLHttpRequest();

    request.open('GET', comment_url, true);

    //This command starts the calling of the comments api
    request.onload = function() {
    //get all the comments records into our comments array
    comment_array = JSON.parse(request.responseText);
    };
    request.send();
}

function newComment() {
    //Initialise each HTML input elements in the modal window with default value.
        rating = 0;
        document.getElementById("userComments").value = "";
    }

function userSpeechComment(userCommentSpoken, userRatingSpoken) {
    //Initialise each HTML input elements in the modal window with default value.
        document.getElementById("userSpeechComments").value = userCommentSpoken;
        displayColorStar('srpop', userRatingSpoken);
    }

    function userSpeechCommentInvalidRating(userCommentSpoken) {
        //Initialise each HTML input elements in the modal window with default value.
            document.getElementById("userSpeechComments").value = userCommentSpoken;
        }    

// Submit or send the new comment to the server to be added.
function addComment() {
    var now = new Date();
    var restaurantReview = new Object();
    restaurantReview.userId = sessionStorage.getItem("ziababa_userId");

    if((restaurantReview.userId == "")||(restaurantReview.userId == null))
    {
        alert("You need to sign-in to give review. Please sign-in!");
    }
    else
    {
        restaurantReview.restaurantId = restaurant_array[currentIndex]._restaurantId; // RestaurantId is required by server to create new comment
        restaurantReview.date_posted = null; // Change the datePosted to null instead of taking the timestamp on the client side;
        restaurantReview.comment = document.getElementById("userComments").value; // Value from HTML input text
        restaurantReview.rating = rating;

        var postComment = new XMLHttpRequest(); // new HttpRequest instance to send comment

        postComment.open("POST", comment_url, true); //Use the HTTP POST method to send data to server

        postComment.setRequestHeader("Content-Type", "application/json");
        postComment.onload = function() {
            fetchComments(); // fetch all comments again so that the web page can have updated comments.     
        };
    // Convert the data in Comment object to JSON format before sending to the server.
        postComment.send(JSON.stringify(restaurantReview)); 
    }
}

function addCommentBySpeech(userCommentSpoken, userRatingSpoken) {
    var now = new Date();
    var restaurantReview = new Object();
    restaurantReview.userId = sessionStorage.getItem("ziababa_userId");
    submitState = false;
    if((restaurantReview.userId == "")||(restaurantReview.userId == null))
    {
        console.log("You need to sign-in to give review. Please sign-in!"); //will alert via speech in cmdSubmitComment(). Here just do a log
    }
    else
    {
        restaurantReview.restaurantId = restaurant_array[currentIndex]._restaurantId; // RestaurantId is required by server to create new comment
        restaurantReview.date_posted = null; // Change the datePosted to null instead of taking the timestamp on the client side;
        restaurantReview.comment = userCommentSpoken; // Text from speechSpoken in callbackHandler onSpeechToText()
        restaurantReview.rating = userRatingSpoken;

        var postComment = new XMLHttpRequest(); // new HttpRequest instance to send comment

        postComment.open("POST", comment_url, true); //Use the HTTP POST method to send data to server

        postComment.setRequestHeader("Content-Type", "application/json");
        postComment.onload = function() {
            fetchComments(); // fetch all comments again so that the web page can have updated comments.     
        };
    // Convert the data in Comment object to JSON format before sending to the server.
        postComment.send(JSON.stringify(restaurantReview));
        submitState = true;
    }
}

//This function allows the user to mouse hover the black and white star
//so that it will turn to a colored version when hovered
function rateIt(element) {
    var num = element.getAttribute("value");
    var classname = element.getAttribute("class");
    var stars = document.getElementsByClassName(classname);
    var classTarget = "." + classname;

    // This is another way of writing 'for' loop, which initialises the 
    // popcorn images to use black and white.
    for (let star of stars){
        star.setAttribute("src", starBWImage);
    }
    changeStarImage(num, classTarget);
}

// This function sets the rating and coloured images based on the value of the image tag when  
// the mouse cursor hovers over the star image.
function changeStarImage(num, classTarget) {
    switch (eval(num)) {
        case 1:
            document.querySelector(classTarget + "[value='1']").setAttribute("src", starImage);
            rating = 1;
            break;
        case 2:
            document.querySelector(classTarget + "[value='1']").setAttribute("src", starImage);
            document.querySelector(classTarget + "[value='2']").setAttribute("src", starImage);
            rating = 2;
            break;
        case 3:
            document.querySelector(classTarget + "[value='1']").setAttribute("src", starImage);
            document.querySelector(classTarget + "[value='2']").setAttribute("src", starImage);
            document.querySelector(classTarget + "[value='3']").setAttribute("src", starImage);
            rating = 3;
            break;
        case 4:
            document.querySelector(classTarget + "[value='1']").setAttribute("src", starImage);
            document.querySelector(classTarget + "[value='2']").setAttribute("src", starImage);
            document.querySelector(classTarget + "[value='3']").setAttribute("src", starImage);
            document.querySelector(classTarget + "[value='4']").setAttribute("src", starImage);
            rating = 4;
            break;
        case 5:
            document.querySelector(classTarget + "[value='1']").setAttribute("src", starImage);
            document.querySelector(classTarget + "[value='2']").setAttribute("src", starImage);
            document.querySelector(classTarget + "[value='3']").setAttribute("src", starImage);
            document.querySelector(classTarget + "[value='4']").setAttribute("src", starImage);
            document.querySelector(classTarget + "[value='5']").setAttribute("src", starImage);
            rating = 5;
            break;
        case 6:
            document.querySelector(classTarget + "[value='1']").setAttribute("src", starImage);
            document.querySelector(classTarget + "[value='2']").setAttribute("src", starImage);
            document.querySelector(classTarget + "[value='3']").setAttribute("src", starImage);
            document.querySelector(classTarget + "[value='4']").setAttribute("src", starImage);
            document.querySelector(classTarget + "[value='5']").setAttribute("src", starImage);
            document.querySelector(classTarget + "[value='6']").setAttribute("src", starImage);
            rating = 6;
            break;
        case 7:
            document.querySelector(classTarget + "[value='1']").setAttribute("src", starImage);
            document.querySelector(classTarget + "[value='2']").setAttribute("src", starImage);
            document.querySelector(classTarget + "[value='3']").setAttribute("src", starImage);
            document.querySelector(classTarget + "[value='4']").setAttribute("src", starImage);
            document.querySelector(classTarget + "[value='5']").setAttribute("src", starImage);
            document.querySelector(classTarget + "[value='6']").setAttribute("src", starImage);
            document.querySelector(classTarget + "[value='7']").setAttribute("src", starImage);
            rating = 7;
            break;
        case 8:
            document.querySelector(classTarget + "[value='1']").setAttribute("src", starImage);
            document.querySelector(classTarget + "[value='2']").setAttribute("src", starImage);
            document.querySelector(classTarget + "[value='3']").setAttribute("src", starImage);
            document.querySelector(classTarget + "[value='4']").setAttribute("src", starImage);
            document.querySelector(classTarget + "[value='5']").setAttribute("src", starImage);
            document.querySelector(classTarget + "[value='6']").setAttribute("src", starImage);
            document.querySelector(classTarget + "[value='7']").setAttribute("src", starImage);
            document.querySelector(classTarget + "[value='8']").setAttribute("src", starImage);
            rating = 8;
            break;
        case 9:
            document.querySelector(classTarget + "[value='1']").setAttribute("src", starImage);
            document.querySelector(classTarget + "[value='2']").setAttribute("src", starImage);
            document.querySelector(classTarget + "[value='3']").setAttribute("src", starImage);
            document.querySelector(classTarget + "[value='4']").setAttribute("src", starImage);
            document.querySelector(classTarget + "[value='5']").setAttribute("src", starImage);
            document.querySelector(classTarget + "[value='6']").setAttribute("src", starImage);
            document.querySelector(classTarget + "[value='7']").setAttribute("src", starImage);
            document.querySelector(classTarget + "[value='8']").setAttribute("src", starImage);
            document.querySelector(classTarget + "[value='9']").setAttribute("src", starImage);
            rating = 9;
            break;
        case 10:
            document.querySelector(classTarget + "[value='1']").setAttribute("src", starImage);
            document.querySelector(classTarget + "[value='2']").setAttribute("src", starImage);
            document.querySelector(classTarget + "[value='3']").setAttribute("src", starImage);
            document.querySelector(classTarget + "[value='4']").setAttribute("src", starImage);
            document.querySelector(classTarget + "[value='5']").setAttribute("src", starImage);
            document.querySelector(classTarget + "[value='6']").setAttribute("src", starImage);
            document.querySelector(classTarget + "[value='7']").setAttribute("src", starImage);
            document.querySelector(classTarget + "[value='8']").setAttribute("src", starImage);
            document.querySelector(classTarget + "[value='9']").setAttribute("src", starImage);
            document.querySelector(classTarget + "[value='10']").setAttribute("src", starImage);            
            rating = 10;
            break;
    }
}


//This function will hide the existing modal and present a modal with the selected comment
//so that the user can attempt to change the username, rating or restaurant review
function editComment(element) {
    var item = element.getAttribute("item");
    currentIndex = item;

    document.getElementById("edituserComments").value = comment_array[item].comment;
    console.log(comment_array[item].rating);
    displayColorStar('editpop', comment_array[item].rating);
}

function editCommentBySpeech(cnt) {
    currentIndex = cnt;

    document.getElementById("edituserComments").value = comment_array[cnt].comment;
    console.log(comment_array[cnt].rating);
    displayColorStar('editpop', comment_array[cnt].rating);
}

//This function displays the correct number of colored star
//based on the rating that is given in the user comment
function displayColorStar(classname, num) {
    var pop = document.getElementsByClassName(classname);
    var classTarget = "." + classname;
    for (let p of pop) {
        p.setAttribute("src", starBWImage);
    }
    changeStarImage(num, classTarget);
}

//This function sends the Comment data to the server for updating
function updateComment() {
    if(comment_array[currentIndex].userId == sessionStorage.getItem("ziababa_userId"))
    {
        var response = confirm("Are you sure you want to update this comment?");
        if (response == true) {
            //var commentModal = document.getElementById("editCommentModal");
            var edit_comment_url = comment_url + "/" + comment_array[currentIndex]._reviewId;
            var updateComment = new XMLHttpRequest(); // new HttpRequest instance to send request to server
            //commentModal.hide();
            updateComment.open("PUT", edit_comment_url, true); //The HTTP method called 'PUT' is used here as we are updating data
            updateComment.setRequestHeader("Content-Type", "application/json");

            comment_array[currentIndex].userId = sessionStorage.getItem("ziababa_userId");
            comment_array[currentIndex].comment = document.getElementById("edituserComments").value;
            comment_array[currentIndex].rating = rating;
            updateComment.onload = function() {
                fetchComments();
            };
            updateComment.send(JSON.stringify(comment_array[currentIndex]));
        }
    }
    else
    {
        alert("You are only allow to edit and post review that was previously posted by you. Have you login?");
    }
}

//This function sends the Comment data to the server for updating
function updateCommentBySpeech(userCommentSpoken, userRatingSpoken) {
    submitState = false;
    if(comment_array[currentIndex].userId == sessionStorage.getItem("ziababa_userId"))
    {
        //var commentModal = document.getElementById("editCommentModal");
        var edit_comment_url = comment_url + "/" + comment_array[currentIndex]._reviewId;
        var updateComment = new XMLHttpRequest(); // new HttpRequest instance to send request to server
        //commentModal.hide();
        updateComment.open("PUT", edit_comment_url, true); //The HTTP method called 'PUT' is used here as we are updating data
        updateComment.setRequestHeader("Content-Type", "application/json");

        comment_array[currentIndex].userId = sessionStorage.getItem("ziababa_userId");
        comment_array[currentIndex].comment = userCommentSpoken;
        comment_array[currentIndex].rating = userRatingSpoken;
        updateComment.onload = function() {
            fetchComments();
        };
        updateComment.send(JSON.stringify(comment_array[currentIndex]));
        submitState = true;
    }
    else
    {
        //will alert via speech in cmdSubmitComment(). Here just do a log
        console.log("You are only allow to edit and post review that was previously posted by you.");
    }
}

    
//This function deletes the selected review in a specific restaurant
function deleteComment(element) {
    var item = element.getAttribute("item");
    if(comment_array[item].userId == sessionStorage.getItem("ziababa_userId"))
    {
        var response = confirm("Are you sure you want to delete this comment?");
        if (response == true) {
            var item = element.getAttribute("item"); //get the current item
            var delete_comment_url = comment_url + "/" + comment_array[item]._reviewId;
            var eraseComment = new XMLHttpRequest();
            eraseComment.open("DELETE", delete_comment_url, true);
            eraseComment.onload = function() {
                fetchComments();
            };
            eraseComment.send();
        }       
    }
    else
    {
        alert("Review not posted by you. You have no permission to delete this review!");
    }
}

function deleteCommentBySpeech(cnt) {
    deleteState = false;
    if(comment_array[cnt].userId == sessionStorage.getItem("ziababa_userId"))
    {
        var delete_comment_url = comment_url + "/" + comment_array[cnt]._reviewId;
        var eraseComment = new XMLHttpRequest();
        eraseComment.open("DELETE", delete_comment_url, true);
        eraseComment.onload = function() {
            fetchComments();
        };
        eraseComment.send();
        deleteState = true;
    }
    else
    {
        //will alert via speech in cmdSubmitComment(). Here just do a log
        console.log("Review not posted by you. You have no permission to delete this review!");
    }
}


//This function is to display all the comments of that restaurant
//whenever the user click on the "Review" button
function showRestaurantComments(element) {
    document.getElementById("emptyComment").innerHTML = "No review yet. Do you want to create one now ?";
    var item = element.getAttribute("item");
    currentIndex = item;

    document.getElementById("review").textContent = "Review for " + restaurant_array[item].restaurantname;
    document.getElementById("commentBody").textContent = "";

    for (var i = 0; i < comment_array.length; i++) {
        if (comment_array[i].restaurantId == restaurant_array[item]._restaurantId) {
            document.getElementById("emptyComment").innerHTML = "";
            selectedRestaurantId = restaurant_array[item]._restaurantId;
            var UserFirstname = comment_array[i].firstname;
            var UserLastname = comment_array[i].lastname;
            star = "";
            var html = '<div class="text-center" style="width:100%;">                                                           \
                            <div class="card">                                                                                  \
                                <div class="card-body">                                                                        \
                                    <p class="card-text" id="rating' + i + '">' + comment_array[i].comment +"</p>                  \
                                    <small>Posted by " + UserFirstname + " " + UserLastname + "---@---" + comment_array[i].datePosted + " [Msg ID:" + comment_array[i]._reviewId + "]</small>   \
                                </div>                                                                                          \
                            </div>                                                                                              \
                        </div>";
            document.getElementById("commentBody").insertAdjacentHTML('beforeend', html);

            var star = "";
            for (var j = 0; j < comment_array[i].rating; j++) {
                console.log(i);
                star += "<img src='images/star.png' style='width:30px' />";
            }
            star += "<img src='images/delete.png' class='edit' data-dismiss='modal' item='" + i + "' onClick='deleteComment(this)' />";
            star += "<img src='images/edit.png' class='edit' data-toggle='modal' data-target='#editCommentModal' data-dismiss='modal' item='"
		    + i + "' onClick='editComment(this)' />";
            document.getElementById("rating" + i).insertAdjacentHTML('beforebegin', star + "<br/>");
        }
    }
}

//This function is to display all the comments of that restaurant
//whenever the user command to retrieve "Review" via voice
function showRestaurantCommentsBySpeech(cnt) {
    document.getElementById("emptyComment").innerHTML = "No review yet. Do you want to create one now ?";
    currentIndex = cnt;

    document.getElementById("review").textContent = "Review for " + restaurant_array[cnt].restaurantname;
    document.getElementById("commentBody").textContent = "";

    for (var i = 0; i < comment_array.length; i++) {
        if (comment_array[i].restaurantId == restaurant_array[cnt]._restaurantId) {
            document.getElementById("emptyComment").innerHTML = "";
            selectedRestaurantId = restaurant_array[cnt]._restaurantId;
            var UserFirstname = comment_array[i].firstname;
            var UserLastname = comment_array[i].lastname;
            star = "";
            var html = '<div class="text-center" style="width:100%;">                                                           \
                            <div class="card">                                                                                  \
                                <div class="card-body">                                                                        \
                                    <p class="card-text" id="rating' + i + '">' + comment_array[i].comment +"</p>                  \
                                    <small>Posted by " + UserFirstname + " " + UserLastname + "---@---" + comment_array[i].datePosted +" [Msg ID:" + comment_array[i]._reviewId + "]</small>   \
                                </div>                                                                                          \
                            </div>                                                                                              \
                        </div>";
            document.getElementById("commentBody").insertAdjacentHTML('beforeend', html);

            var star = "";
            for (var j = 0; j < comment_array[i].rating; j++) {
                console.log(i);
                star += "<img src='images/star.png' style='width:30px' />";
            }
            star += "<img src='images/delete.png' class='edit' data-dismiss='modal' item='" + i + "' onClick='deleteComment(this)' />";
            star += "<img src='images/edit.png' class='edit' data-toggle='modal' data-target='#editCommentModal' data-dismiss='modal' item='"
		    + i + "' onClick='editComment(this)' />";
            document.getElementById("rating" + i).insertAdjacentHTML('beforebegin', star + "<br/>");
        }
    }
}

