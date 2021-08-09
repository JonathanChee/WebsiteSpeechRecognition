var cmds = [
    { phrases: ['home', 'homepage', 'back to home', 'go to home' ], handler: cmdHome },
    { phrases: ['restaurant' ], handler: cmdRestaurantList },
    { phrases: ['about us' ], handler: cmdAboutUs },
    { phrases: ['north' ], handler: cmdNorthRegion },
    { phrases: ['south' ], handler: cmdSouthRegion },
    { phrases: ['east' ], handler: cmdEastRegion },
    { phrases: ['west' ], handler: cmdWestRegion },
    { phrases: ['central' ], handler: cmdCentralRegion },
    { phrases: ['any region', 'island' ], handler: cmdAnyRegion },
    { phrases: ['want to know more', 'detail' ], handler: cmdSeeMore },
    { phrases: ['review', 'see review' ], handler: cmdReview },
    { phrases: ['new comment' ], handler: cmdNewComment },
    { phrases: ['rating', 'restaurant rating' ], handler: cmdEndOfComment },
    { phrases: ['submit', 'submit comment' ], handler: cmdSubmitComment },
    { phrases: ['edit', 'make changes to' ], handler: cmdEditComment },
    { phrases: ['delete' ], handler: cmdDeleteComment },  
    { phrases: ['close' ], handler: cmdClose },
    { phrases: ['stop recognition' ], handler: cmdStopRecognition },
];

var speechRecognitionFlag = true;
var session           = "Home";
var speechSpoken      = "";
var commentSpoken     = "";
var nameOfRestaurant  = "";
var restRating        = "";
var lowerCaseRestName = "";
var new_or_edit       = "Neither";

var commentValid = false;

const CONFIDENCE_LEVEL  = 0.7;
var confidenceLevel = 0;

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}


function sleepPromise(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function checkForRestaurantName(spokenText){
    console.log('checkForRestaurantName() -> spokenText : ' + spokenText);
    var found = false;
    for (var count = 0; count < restaurant_array.length; count++) 
    {
        spokenText = spokenText.toLowerCase();
        spokenText = spokenText.replace('-', ' ');
        lowerCaseRestName = restaurant_array[count].restaurantname.toLowerCase();
        if (spokenText == lowerCaseRestName){
            found = true;
            nameOfRestaurant = spokenText;
            break;
        }
    }

    return found;
}

function loadPage()
{
    speechRecognitionFlag = true;

    if (sessionStorage.getItem('speechSpeaker') == null)
    {
        document.getElementById("speechAction").innerHTML =
        'This restaurant review comes with speech recognition feature!<br>' + 
        'Speak one of the word shown in the navigation bar<br>' +
        'It will take you to the webpage.<hr>'
        //'Say something to start exploring.<hr>' + 
        //"<button class='btn btn-success btn-sm font-weight-bold' type='button' onclick=\"speechSynthesisSpeak('Welcome.')\">Got it!</button>";
    }

    startSpeechRecognition(onSpeechToText);
    sleep(1000);
    startSpeechSynthesis();
    sleep(1000);
    loadDialectModel();
    sleep(1000);
    listenDialectModel();
    console.log("loadPage loaded");
}

//Pass in the confidence value.
//Control the confidence value to accept difference confidence value
//at different section of onSpeechToText() code 
function onSpeechToText(text, confidenceValue)
{
    if(speechRecognitionFlag == true) {
        document.getElementById("speechOutput").innerHTML = text;

        text = text.toLowerCase();
        speechSpoken = text;
        confidenceLevel = confidenceValue;

        var handler = null;

        //see if the speech is one of the command
        //control the confidence value to accept here.  
        for (var j = 0; j < cmds.length; ++j)
        {
            var phrases = cmds[j].phrases;
            for (var p = 0; p < phrases.length; ++p)
            {
                if (text.includes(phrases[p]))
                {
                    handler = cmds[j].handler;
                    break;
                }
            }
            if (handler != null)
            {
                break;
            }
        }

        if (handler != null)
        {
            console.log("handler not null");
            var action = handler();
            document.getElementById("speechAction").innerHTML = action;
            speechSynthesisSpeak(action);
            console.log("speechSynthesisSpeak is speaking");
        }
        else
        {
            document.getElementById("speechAction").innerHTML = '';
        }

        //accept all speech spoken that is confidence value can be 0
        //check restaurant name spoken when is at List Restaurant session
        //that is when giving comment on the restaurant where session is 'New Comment' or 'Edit Comment'
        //the speech spoken will not be processed here  
        if(session == "List Restaurant")
        {
            var match = false;
            // check from chrome model first. 
            console.log ("Check chrome SR model, speechSpoken : " + speechSpoken);
            if (checkForRestaurantName(speechSpoken) == true)
                match = true;
            else{
                // if no match than check the restaurant name from the SR dialect model
                console.log ("Check dialect model, restaurantNameFromModel : " + restaurantNameFromModel);
                if(speechSpoken.includes('restaurant') && (speechSpoken != "restaurant")){
                    if (checkForRestaurantName(restaurantNameFromModel) == true)
                        match = true;
                    //reset the model restaurant name after the name of restaurant had been obtained
                    restaurantNameFromModel = "";
                }
            }

            //If matches with one of the existing restaurant, put result in the voice message
            if(match == true) {
                var msg = nameOfRestaurant + ' selected. You may see the DETAILS or the REVIEWS';
                document.getElementById("speechAction").innerHTML = msg;
                speechSynthesisSpeak(msg);
            }
        }
    }
}

function cmdHome()
{
    if(confidenceLevel = CONFIDENCE_LEVEL){
        console.log('cmdHome() called');
        setTimeout(function() {
            window.location.href = 'index.html';
            session = 'Home'  
        }, 1500);
        return "return to home page";
    }
}

function cmdRestaurantList()
{
    if(confidenceLevel = CONFIDENCE_LEVEL){
        console.log('cmdRestaurantList() called');
        if( speechSpoken == 'restaurant'){
            $("#navbarDropdownMenuLink").dropdown("toggle");
        }
        return '';
    }
}

function cmdAboutUs()
{
    if(confidenceLevel = CONFIDENCE_LEVEL){
        console.log('cmdAboutUs() called');
        setTimeout(function() {
            //sessionStorage.setItem('TasteBytesAboutUsTab', 'ourMissionTab');
            //window.location.href = 'aboutUs.html';
            $('#messageModal').modal('show');
            session = "About Us";
        }, 1500);
        return "In a moment.... Will take you there. ";
    }
}

function cmdNorthRegion()
{
    if(confidenceLevel = CONFIDENCE_LEVEL){
        console.log('cmdNorthRegion() called');
        setTimeout(function() {
            listNorth();
            window.location.href = 'restaurant.html';        
        }, 1500);
        return "Here is the list of restaurants in the north";
    }
}

function cmdSouthRegion()
{
    if(confidenceLevel = CONFIDENCE_LEVEL){
        console.log('cmdSouthRegion() called');
        setTimeout(function() {
            listSouth();
            window.location.href = 'restaurant.html';        
        }, 1500);
        return "Here is the list of restaurants in the south";
    }
}

function cmdEastRegion()
{
    if(confidenceLevel = CONFIDENCE_LEVEL){
        console.log('cmdEastRegion() called');
        setTimeout(function() {
            listEast();
            window.location.href = 'restaurant.html';        
        }, 1500);
        return "Here is the list of restaurants in the east";
    }
}

function cmdWestRegion()
{
    if(confidenceLevel = CONFIDENCE_LEVEL){
        console.log('cmdWestRegion() called');
        setTimeout(function() {
            listWest();
            window.location.href = 'restaurant.html';        
        }, 1500);
        return "Here is the list of restaurants in the west";
    }
}

function cmdCentralRegion()
{
    if(confidenceLevel = CONFIDENCE_LEVEL){
        console.log('cmdCentralRegion() called');
        setTimeout(function() {
            listCentral();
            window.location.href = 'restaurant.html';        
        }, 1500);
        return "Here is the list of restaurants in the centre region";
    }
}

function cmdAnyRegion()
{
    if(confidenceLevel = CONFIDENCE_LEVEL){
        console.log('cmdAnyRegion() called');
        setTimeout(function() {
            listAny();
            window.location.href = 'restaurant.html';        
        }, 1500);
        return 'Here is the list of restaurants island wide';
    }
}

function cmdSeeMore()
{
    if(confidenceLevel = CONFIDENCE_LEVEL){
        console.log('cmdSeeMore() called');
        var totalRests = restaurant_array.length;
        var found = false;
        for (var count = 0; count < totalRests; count++) 
        {
            lowerCaseRestName = restaurant_array[count].restaurantname.toLowerCase();
            if (nameOfRestaurant == lowerCaseRestName){
                $('#commentModal').modal('hide'); //hide review modal if it is present
                showRestaurantDetailsBySpeech(count)
                $('#restaurantModal').modal('show');
                session = "See More";
                found = true;
                break;               
            }
        }

        if(found)
            return 'Here is the detail of the restaurant';
        else
            return nameOfRestaurant + ' not found!'
    }
}

function cmdReview()
{  
    if(confidenceLevel = CONFIDENCE_LEVEL){
        console.log('cmdReview() called');
        var totalRests = restaurant_array.length;
        var found = false;  
        for (var count = 0; count < totalRests; count++) 
        {
            lowerCaseRestName = restaurant_array[count].restaurantname.toLowerCase();
            if (nameOfRestaurant == lowerCaseRestName){
                $('#restaurantModal').modal('hide');  //hide restaurant detail modal if it is present
                showRestaurantCommentsBySpeech(count);
                $('#commentModal').modal('show');
                session = "Reviews";
                found = true;
                break;                
            }
        }

        if(found){
            return  'Here are the comments of the restaurant. Say NEW COMMENT to give a review. '+
                    'Or say EDIT or DELETE follow by the ID NUMBER. ';
        }
        else
            return nameOfRestaurant + ' not found!';
    }
}

function cmdNewComment()
{
    if(confidenceLevel = CONFIDENCE_LEVEL){
        console.log('cmdNewComment() called');
        $('#commentModal').modal('hide');
        $('#newSpeechCommentModal').modal('hide');
        $('#newCommentModal').modal('show');
        session = "New Comment";
        new_or_edit = "New";

        return 'Say the comment aloud follow by RATING value';
    }
}

function cmdEditComment()
{
    if(confidenceLevel = CONFIDENCE_LEVEL){
        console.log('cmdEditComment() called');
        var found = false;

        if(speechSpoken.includes('edit')||speechSpoken.includes('make changes to')){
            console.log("cmdEditComment() -> speechSpoken : " + speechSpoken + ".");

            var id = parseInt(speechSpoken.replaceAll(/\D/g,''));
            console.log("cmdEditComment() -> Msg ID : " + id);
            if (isNaN(id) == false && id > 0)
            {
                for (var count = 0; count < comment_array.length; count++) 
                {
                    console.log("comment_array["+count+"]._reviewId"+comment_array[count]._reviewId);
                    if(id == comment_array[count]._reviewId){
                        $('#commentModal').modal('hide');
                        editCommentBySpeech(count);
                        $('#editCommentModal').modal('show');
                        session = "Edit Comment";
                        new_or_edit = "Edit";
                        found = true;
                        break;
                    }                
                }
            } 
        }

        if(found)
            return 'Say the comment aloud follow by RATING value';
        else
            return 'Not able to edit. Invalid message ID selected. Message ID is ' + id;
    }
}

function cmdDeleteComment()
{
    if(confidenceLevel = CONFIDENCE_LEVEL){
        console.log('cmdDeleteComment() called');
        var found = false;

        if(speechSpoken.includes('delete')){
            console.log("cmdDeleteComment() -> speechSpoken : " + speechSpoken + ".");

            var id = parseInt(speechSpoken.replaceAll(/\D/g,''));
            console.log("cmdDeleteComment() -> Msg ID : " + id);
            if (isNaN(id) == false && id > 0)
            {
                for (var count = 0; count < comment_array.length; count++) 
                {
                    if(id == comment_array[count]._reviewId){
                        $('#commentModal').modal('hide');
                        deleteCommentBySpeech(count);
                        session = "List Restaurant";   //finish comment deletion; return to List Restaurant session
                        found = true;
                        break;
                    }                
                }
            } 
        }

        if(found){
            if(deleteState == true)
                return 'comment deleted';
            else
                return 'review not posted by you. you have no permission to delete this review!'
        }
        else{
            session = "List Restaurant";   //finish comment deletion; return to List Restaurant session
            return 'Not able to delete. Invalid message ID selected. Message ID is ' + id;
        }
    }
}

//CONFIDENCE_LEVEL not set intentionally
//Accept all spoken speech for the comment which where confidence level could be 0
//even translate to text correctly
function cmdEndOfComment()
{
    console.log('cmdEndOfComment() called');
    $('#newCommentModal').modal('hide');
    $('#editCommentModal').modal('hide');
    if(speechSpoken.includes('rating')){
        console.log("cmdEndOfComment() -> speechSpoken : " + speechSpoken + ".");
        var index = speechSpoken.indexOf("rating");
        console.log("cmdEndOfComment() -> index : " + index);
        if(index !== -1){
            restRating = speechSpoken.substring(index);  //obtain the rating first before removing it
            commentSpoken = speechSpoken.substring(0, index - 1); //remove the rating portion, left only the comment
            console.log("cmdEndOfComment() -> commentSpoken : " + commentSpoken + ",  rating : " + restRating);
            switch(restRating){
                case "rating one"   : rating = 1;  commentValid = true; break;
                case "rating 1"     : rating = 1;  commentValid = true; break;
                case "rating two"   : rating = 2;  commentValid = true; break;
                case "rating 2"     : rating = 2;  commentValid = true; break;
                case "rating three" : rating = 3;  commentValid = true; break;
                case "rating 3"     : rating = 3;  commentValid = true; break;
                case "rating four"  : rating = 4;  commentValid = true; break;
                case "rating 4"     : rating = 4;  commentValid = true; break;
                case "rating five"  : rating = 5;  commentValid = true; break;
                case "rating 5"     : rating = 5;  commentValid = true; break;
                case "rating six"   : rating = 6;  commentValid = true; break;
                case "rating 6"     : rating = 6;  commentValid = true; break;
                case "rating seven" : rating = 7;  commentValid = true; break;
                case "rating 7"     : rating = 7;  commentValid = true; break;
                case "rating eight" : rating = 8;  commentValid = true; break;
                case "rating 8"     : rating = 8;  commentValid = true; break;
                case "rating nine"  : rating = 9;  commentValid = true; break;
                case "rating 9"     : rating = 9;  commentValid = true; break;
                case "rating ten"   : rating = 10; commentValid = true; break;
                case "rating 10"    : rating = 10; commentValid = true; break;
                default : console.log("Rating invalid!"); commentValid = false; break;
            }
        } 
        else{
            commentValid = false;
        }

        $('#newSpeechCommentModal').modal('show');

        if(commentValid == true){
            console.log("cmdEndOfComment() -> comment : " + commentSpoken + ",  rating : " + rating);
            //userSpeechComment("Comment : " + commentSpoken + ". Rating : " + rating);
            userSpeechComment(commentSpoken, rating);
        }
        else{
            console.log("cmdEndOfComment() -> comment : " + commentSpoken + ",  Rating invalid!");
            userSpeechComment("Comment : " + commentSpoken + " " + restRating + ". Rating is invalid");
        }
        session = "End Comment"; 
    }

    return 'Say SUBMIT to post the review. Say the comment again to redo';
}

function cmdSubmitComment()
{
    if(confidenceLevel = CONFIDENCE_LEVEL){
        console.log('cmdSubmitComment() called');
        $('#newSpeechCommentModal').modal('hide');

        if((commentValid == true) &&(session == "End Comment")&&(new_or_edit == "New")){
            console.log("cmdSubmitComment() -> New Comment : " + commentSpoken + ". Rating : " + rating);
            addCommentBySpeech(commentSpoken, rating);
            session = "List Restaurant";   //finish comment submission; return to List Restaurant session
            new_or_edit == "Neither";
            if(submitState == true)
                return 'comment and rating submitted';
            else
                return 'Submit not successful. You need to sign in to give review. Please sign in!';
        }
        else if((commentValid == true) &&(session == "End Comment")&&(new_or_edit == "Edit")){
            console.log("cmdSubmitComment() -> Edited Comment : " + commentSpoken + ". Rating : " + rating);
            updateCommentBySpeech(commentSpoken, rating);
            session = "List Restaurant";   //finish comment submission; return to List Restaurant session
            new_or_edit == "Neither";
            if(submitState == true)
                return 'comment and rating updated';
            else
                return 'Update not successful. You are only allow to edit review that was previously posted by you. Have you login?';
        }
        else{
            session = "List Restaurant";   //finish comment submission; return to List Restaurant session
            new_or_edit == "Neither";
            return 'Submit not successful. ' + restRating + ' is invalid rating';
        }
    }
}

function cmdClose()
{
    if(confidenceLevel = CONFIDENCE_LEVEL){
        console.log('cmdClose() called');

        switch(session){
            case "About Us" : 
                $('#messageModal').modal('hide');
                break;

            case "See More" : 
                $('#restaurantModal').modal('hide');
                session = "List Restaurant";
                break;

            case "Reviews" : 
                $('#commentModal').modal('hide');
                session = "List Restaurant";
                break;                

            case "New Comment" : 
                $('#newCommentModal').modal('hide');
                session = "List Restaurant";
                break; 

            case "End Comment" : 
                $('#newSpeechCommentModal').modal('hide');
                session = "List Restaurant";
                break;

            case "Edit Comment" : 
                $('#editCommentModal').modal('hide');
                session = "List Restaurant";
                break; 

            default: 
                console.log('invalid session');
                break;
        }
    
        return "Leave Session";
    }
}

function cmdStopRecognition()
{
    if(confidenceLevel = CONFIDENCE_LEVEL){
        console.log('cmdStopRecognition() called');
        speechRecognitionFlag = false;

        return 'Speech recognition stopped. To enable,  click on the home tab at the menu bar';
    }
}