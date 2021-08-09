"use strict"

class Review{
    constructor(id, userId, restaurantId, datePosted, comment, rating){
        this._reviewId    = id;
        this.userId       = userId;
        this.restaurantId = restaurantId;
        this.datePosted   = datePosted;
        this.comment      = comment;
        this.rating       = rating;
    }
    getId(){
        return this._reviewId;
    }
    getUserId(){
        return this.userId;
    }
    getRestaurantId(){
        return this.restaurantId;
    }
    getDatePosted(){
        return this.datePosted;
    }
    getComment(){
        return this.comment;
    }
    getRating(){
        return this.rating;
    }
    setUserId(userId){
        this.userId = userId;
    }
    setRestaurantId(restaurantId){
        this.restaurantId = restaurantId;
    }
    setDatePosted(datePosted){
        this.datePosted = datePosted;
    }
    setComment(comment){
        this.comment = comment;
    }
    setRating(rating){
        this.rating = rating;
    }
}
module.exports = Review;