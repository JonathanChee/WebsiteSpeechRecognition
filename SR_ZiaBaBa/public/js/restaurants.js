//This function is to call the restaurant api and get all the restaurant
//that is being reviewed
function getRestaurantData() {

    loadPage();

    session = "List Restaurant";

    var request = new XMLHttpRequest();
    request.open('GET', restaurant_url, true);

    //This function will be called when data returns from the web api
    request.onload = function() {
        //get all the restaurants records into our restuarant array
        restaurant_array = JSON.parse(request.responseText);

        fetchComments();

        //call the function so as to display all restaurant for selected region
        var zone = localStorage.getItem("region");
        displayRestaurant(zone);
    };
    //This command starts the calling of the movies web api
    request.send();
}
//This function is to display the restaurant tiles
//that filters based on region selected
function displayRestaurant(region) 
{    
    var table = document.getElementById("restaurantTable");    
    var restaurantCount = 0;    
    var message = "";    

    table.innerHTML = "";    
    totalRestaurants = restaurant_array.length;    
    for (var count = 0; count < totalRestaurants; count++) 
    {        
        if ((restaurant_array[count].region == region) || (region == "Island Wide"))
        {
            var thumbnail = restaurant_array[count].restaurantimagelink;            
            var Restname = restaurant_array[count].restaurantname;            
            var cell = '<div class="col-md-3" style="float: none; margin: 0 auto;">' +                          
                            '<div class="flip-container" >' +              
                                '<div class="flipper">' +
                                    '<div class="front text-center">' + 
                                        '<a id="restaurants" href="#" data-toggle="modal" data-target="#restaurantModal" item=' + count + '>'+
                                            '<img src=' + thumbnail + ' />'+
                                        '</a>'+
                                        '<span><br>' + Restname + '</span><br>' +
                                    '</div>'+                              
                                    '<div class="back">'+                                   
                                        '<div class="bg-dark mystyle text-center" >'+
                                            '<span><br>' + Restname + '</span><br>' +
                                            '<button href="#" data-toggle="modal" data-target="#restaurantModal" item="' + count + '" type="button" class="btn btn-sm" onClick="showRestaurantDetails(this)" >See More</button> '+                     
                                            '<button href="#" data-toggle="modal" data-target="#commentModal" item="' + count + '" type="button" class="btn btn-sm" onClick="showRestaurantComments(this)" >Reviews</button>'+
                                        '</div>'+
                                    '</div>'+
                                '</div>' +
                            '</div>' +
                        '</div>'; 
             table.insertAdjacentHTML('beforeend', cell);            
             restaurantCount++;        
         }    
    }
    
    message = restaurantCount + " Restaurants" + " : " + region; 
    document.getElementById("summary").textContent = message;    
    document.getElementById("parent").textContent = "";
}

//This function is to display the "North" region restauant
function listNorth() {
    console.log("Enter listNorth()");
    localStorage.setItem("region", "North");
}

//This function is to display the "South" region restauant
function listSouth() {
    console.log("Enter listSouth()");
    localStorage.setItem("region", "South");
}

//This function is to display the "East" region restauant
function listEast() {
    console.log("Enter listEast()");
    localStorage.setItem("region", "East");
}

//This function is to display the "West" region restauant
function listWest() {
    console.log("Enter listWest()");
    localStorage.setItem("region", "West");
}

//This function is to display the "West" region restauant
function listCentral() {
    console.log("Enter listCentral()");
    localStorage.setItem("region", "Central");
}

//This function is to display the restauants in any region
function listAny() {
    console.log("Enter listAny()");
    localStorage.setItem("region", "Island Wide");
}


//This function is to display the individual restaurant details
//whenever the user clicks on "See More"
function showRestaurantDetails(element) {
    var item = element.getAttribute("item");
    currentIndex = item;
    document.getElementById("restaurantName").textContent = restaurant_array[item].restaurantname; 
    document.getElementById("image_url").src = restaurant_array[item].restaurantimagelink;
    document.getElementById("phone_no").textContent = restaurant_array[item].contact;
    document.getElementById("address").textContent = restaurant_array[item].restaurantaddr;
    document.getElementById("opening_hours").textContent = restaurant_array[item].openinghour;
    if(restaurant_array[item].averagerating > 0){
        document.getElementById("rating").textContent = (restaurant_array[item].averagerating).toFixed(1);
    }
    else{
        document.getElementById("rating").textContent = "No review yet for this restaurant!"
    }

}


//This function is to display the individual restaurant details
//whenever the user command to "See More" via voice
function showRestaurantDetailsBySpeech(cnt) {
    currentIndex = cnt;
    document.getElementById("restaurantName").textContent = restaurant_array[cnt].restaurantname; 
    document.getElementById("image_url").src = restaurant_array[cnt].restaurantimagelink;
    document.getElementById("phone_no").textContent = restaurant_array[cnt].contact;
    document.getElementById("address").textContent = restaurant_array[cnt].restaurantaddr;
    document.getElementById("opening_hours").textContent = restaurant_array[cnt].openinghour;
    if(restaurant_array[cnt].averagerating > 0){
        document.getElementById("rating").textContent = (restaurant_array[cnt].averagerating).toFixed(1);
    }
    else{
        document.getElementById("rating").textContent = "No review yet for this restaurant!"
    }

}


