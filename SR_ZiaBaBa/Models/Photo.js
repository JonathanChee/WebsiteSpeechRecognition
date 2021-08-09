"use strict"

class Photo{
    constructor(id, reviewId, photolink){
        this._photoI    = id;
        this.reviewId   = reviewId;
        this.photolink   = photolink;
    }
    getId(){
        return this._photoId;
    }
    getReviewId(){
        return this.reviewId;
    }
    getPhotoLink(){
        return this.photolink;
    }
    setReviewId(reviewId){
        this.reviewId = reviewId;
    }
    setPhotoLink(photolink){
        this.photolink = photolink;
    }
}
module.exports = Photo;