"use strict"


const photosdb = require('../Models/PhotosDB');

var photosDBObject = new photosdb();

function routePhotos(app){
    app.route('/photos')
        .post(photosDBObject.addPhoto)
        .get(photosDBObject.getAllPhotos);
    app.route('/photos/:_photoId')
        .delete(photosDBObject.deletePhoto)
        .put(photosDBObject.updatePhoto);

}
module.exports = {routePhotos};

