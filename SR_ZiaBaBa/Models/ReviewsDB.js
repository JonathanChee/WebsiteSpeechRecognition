"use strict"

var db = require('../db-connection');
const Review = require('../Models/Review');

class ReviewsDB{

    getAllReviews(request, respond){
 //       var sql = "SELECT * FROM myziababa_db.review";
        var sql = "SELECT review.*, useraccount.firstname, useraccount.lastname FROM myziababa_db.review JOIN myziababa_db.useraccount ON review.userId = useraccount._useraccountId";
        db.query(sql, function(error, result){
            if(error){
                throw error;
            }
            else{
                respond.json(result);
            }
        });
    }

    getReviews(request, respond){
        var id = request.body.restaurantId;
        var sql = "SELECT * FROM myziababa_db.review WHERE restaurantId ="+id;
        db.query(sql, function(error, result){
            if(error){
                throw error;
            }
            else{
                respond.json(result);
            }
        });
    }

    addReview(request, respond){
        var now = new Date();
        var year = now.getFullYear();
        var month = now.getMonth();
        var day = now.getDate();
        var hour = now.getHours();
        var min = now.getMinutes();
        var sec = now.getSeconds();
        var dateStr = year+"-"+month+"-"+day+" "+hour+":"+min+":"+sec;

        var reviewObject = new Review(null, request.body.userId,
                                            request.body.restaurantId,
                                            dateStr,
                                            request.body.comment, 
                                            request.body.rating);
        var sql = "INSERT INTO myziababa_db.review (userId, restaurantId, datePosted, comment, rating) VALUES(?,?,?,?,?)";
        var values = [reviewObject.getUserId(),
                      reviewObject.getRestaurantId(),
                      reviewObject.getDatePosted(),
                      reviewObject.getComment(), 
                      reviewObject.getRating()];
        db.query(sql, values, function (error, result) {
            if(error){
                throw error;
            }
            else{
                respond.json(result);
            }
          });
    }
    
    updateReview(request, respond){
        var now = new Date();
        var year = now.getFullYear();
        var month = now.getMonth();
        var day = now.getDate();
        var hour = now.getHours();
        var min = now.getMinutes();
        var sec = now.getSeconds();
        var dateStr = year+"-"+month+"-"+day+" "+hour+":"+min+":"+sec;

        var reviewObject = new Review(request.params._reviewId, 
                                      request.body.userId, 
                                      request.body.restaurantId, 
                                      dateStr,
                                      request.body.comment, 
                                      request.body.rating);

        var sql = "UPDATE myziababa_db.review SET userId = ?, restaurantId = ?, datePosted = ?, comment = ?, rating = ? WHERE _reviewId = ?";
        var values = [reviewObject.getUserId(),
                      reviewObject.getRestaurantId(),
                      reviewObject.getDatePosted(),
                      reviewObject.getComment(),
                      reviewObject.getRating(),
                      reviewObject.getId()];
        db.query(sql, values, function (error, result) {
            if(error){
                throw error;
            }
            else{
                respond.json(result);
            }
          });
    }
    
    deleteReview(request, respond){
        var reviewID = request.params._reviewId;
        var sql = "DELETE FROM myziababa_db.review WHERE _reviewId = ?";
        db.query(sql, reviewID, function (error, result) {
            if(error){
                throw error;
            }
            else{
                respond.json(result);
            }
          });
    }
    
}
module.exports = ReviewsDB;

