"use strict"

var db = require('../db-connection');
const Photo = require('../Models/Photo');

class PhotosDB{

    getAllPhotos(request, respond){
        var sql = "SELECT * FROM myziababa_db.photo";
        db.query(sql, function(error, result){
            if(error){
                throw error;
            }
            else{
                respond.json(result);
            }
        });
    }

    addPhoto(request, respond){
        var photoObject = new Photo(null, request.body.reviewId,
                                          request.body.photolink);
        var sql = "INSERT INTO myziababa_db.photo (reviewId, photolink) VALUES(?,?)";
        var values = [photoObject.getReviewId(),
                      photoObject.getPhotoLink()];
        db.query(sql, values, function (error, result) {
            if(error){
                throw error;
            }
            else{
                respond.json(result);
            }
          });
    }
    
    updatePhoto(request, respond){
        var photoObject = new Photo(request.params._photoId, 
                                    request.body.reviewId, 
                                    request.body.photolink);

        var sql = "UPDATE myziababa_db.photo SET reviewId = ?, photolink = ? WHERE _photoId = ?";
        var values = [photoObject.getReviewId(),
                      photoObject.getPhotoLink(),
                      photoObject.getId()];
        db.query(sql, values, function (error, result) {
            if(error){
                throw error;
            }
            else{
                respond.json(result);
            }
          });
    }
    
    deletePhoto(request, respond){
        var photoID = request.params._photoId;
        var sql = "DELETE FROM myziababa_db.photo WHERE _photoId = ?";
        db.query(sql, photoID, function (error, result) {
            if(error){
                throw error;
            }
            else{
                respond.json(result);
            }
          });
    }
    
}
module.exports = PhotosDB;

