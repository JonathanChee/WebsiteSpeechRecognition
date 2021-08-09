var restaurant_url = "/restaurants";
var comment_url = "/reviews";
var login_url ='/login';
var contactus_url ='/contactus';

var comment_array = [];     //Empty array for review comments
var account_array = [];     //Empty array for account
var restaurant_array = [];  //Empty array for Restaurant

var starBWImage = 'images/star_bw.png';
var starImage = 'images/star.png';

var restaurantCount = 0;
var currentIndex = 0;
var rating = 0;
var userText = "";
var submitState = false;
var deleteState = false;
var restaurantNameFromModel = "";