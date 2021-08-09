"use strict"


const contactusdb = require('../Models/ContactUsDB');

var contactusDBObject = new contactusdb();

function routeContactUs(app){
    app.route('/contactus')
        .post(contactusDBObject.addFeedbackToDynamoDB)

}
module.exports = {routeContactUs};