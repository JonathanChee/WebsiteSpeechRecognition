"use strict"


const reviewsdb = require('../Models/ReviewsDB');

var reviewsDBObject = new reviewsdb();

function routeReviews(app){
    app.route('/reviews')
        .post(reviewsDBObject.addReview)
        .get(reviewsDBObject.getAllReviews);
    app.route('/reviews/:_reviewId')
        .delete(reviewsDBObject.deleteReview)
        .put(reviewsDBObject.updateReview);

}
module.exports = {routeReviews};

