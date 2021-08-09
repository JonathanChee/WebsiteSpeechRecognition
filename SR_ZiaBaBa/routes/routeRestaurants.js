"use strict"


const restaurantsdb = require('../Models/RestaurantsDB');

var restaurantsDBObject = new restaurantsdb();

function routeRestaurants(app){
    app.route('/restaurants')
        .post(restaurantsDBObject.addRestaurant)
        .get(restaurantsDBObject.getAllRestaurants);
    app.route('/restaurants/:_restaurantId')
        .delete(restaurantsDBObject.deleteRestaurant)
        .put(restaurantsDBObject.updateRestaurant);
}
module.exports = {routeRestaurants};

