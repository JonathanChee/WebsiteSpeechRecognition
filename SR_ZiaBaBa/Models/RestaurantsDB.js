"use strict"

var db = require('../db-connection');
const Restaurant = require('./Restaurant');

class RestaurantsDB{

    resstaurantList(){
   
    }

    getAllRestaurants(request, respond){
        var sql = "SELECT restaurant.*, AVG(review.rating) AS averagerating FROM myziababa_db.restaurant LEFT JOIN myziababa_db.review ON review.restaurantId = restaurant._restaurantId GROUP BY restaurant._restaurantId";
        db.query(sql, function(error, result){
            if(error){
                throw error;
            }
            else{
                respond.json(result);
            }
        });
    }

    addRestaurant(request, respond){
        var restaurantObject = new Restaurant(null, request.body.restaurantname,
                                                    request.body.restaurantaddr,
                                                    request.body.restaurantimagelink,
                                                    request.body.region, 
                                                    request.body.openinghour,
                                                    request.body.contact,
                                                    request.body.website);
        var sql = "INSERT INTO myziababa_db.restaurant (restaurantname, restaurantaddr, restaurantimagelink, region, openinghour, contact, website) VALUES(?,?,?,?,?,?,?)";
        var values = [restaurantObject.getRestaurantName(),
                      restaurantObject.getRestaurantAddr(),
                      restaurantObject.restaurantimagelink(),
                      restaurantObject.getRegion(), 
                      restaurantObject.getOpeningHour(),
                      restaurantObject.getContact(),
                      restaurantObject.getWebsite()];
        db.query(sql, values, function (error, result) {
            if(error){
                throw error;
            }
            else{
                respond.json(result);
            }
          });
    }
    
    updateRestaurant(request, respond){
        var restaurantObject = new Restaurant(request.params._restuarantId, 
                                              request.body.restaurantname, 
                                              request.body.restaurantaddr, 
                                              request.body.restaurantimagelink,
                                              request.body.region, 
                                              request.body.openinghour,
                                              request.body.contact,
                                              request.body.website);

        var sql = "UPDATE myziababa_db.restaurant SET restaurantname = ?, restaurantaddr = ?, restaurantimagelink = ?, region = ?, openinghour = ?, contact = ?, website = ? WHERE _restaurantId = ?";
        var values = [restaurantObject.getRestaurantName(),
                      restaurantObject.getRestaurantAddr(),
                      restaurantObject.getRestaurantImageLink(),
                      restaurantObject.getRegion(),
                      restaurantObject.getOpeningHour(),
                      restaurantObject.getContact(),
                      restaurantObject.getWebsite(),
                      restaurantObject.getId()];
        db.query(sql, values, function (error, result) {
            if(error){
                throw error;
            }
            else{
                respond.json(result);
            }
          });
    }
    
    deleteRestaurant(request, respond){
        var restaurantID = request.params._restaurantId;
        var sql = "DELETE FROM myziababa_db.restaurant WHERE _restaurantId = ?";
        db.query(sql, restaurantID, function (error, result) {
            if(error){
                throw error;
            }
            else{
                respond.json(result);
            }
          });
    }
    
    getAllRestaurantsAvgRating(request, respond){
        //var id = request.body.restaurantId;
        //var sql = "SELECT * FROM myziababa_db.review WHERE restaurantId ="+id;
        var sql = "SELECT restaurant.restaurantname, AVG(review.rating) FROM myziababa_db.review, myziababa_db.restaurant WHERE review.restaurantId ="+restaurant._restaurantId+ "GROUP BY review.restaurantId";
        db.query(sql, function(error, result){
            if(error){
                throw error;
            }
            else{
                respond.json(result);
            }
        });
    }

}
module.exports = RestaurantsDB;

