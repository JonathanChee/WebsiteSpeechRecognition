"use strict"

const AWS = require('aws-sdk');
 
AWS.config.update(
    {
        region: "ap-southeast-1",
        endpoint: 'dynamodb.ap-southeast-1.amazonaws.com',
        accessKeyId: "AKIA35ELJD46XNH3L56M",
        secretAccessKey: "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"
    }
)
 
var docClient = new AWS.DynamoDB.DocumentClient();


const ContactUs = require('../Models/ContactUs');

class ContactUsDB{
    addFeedbackToDynamoDB(request, respond){
        //console.log("Enter addFeedbackToDynamoBD function")
        var now = new Date();
        var year = now.getFullYear();
        var month = now.getMonth();
        var day = now.getDate();
        var hour = now.getHours();
        var min = now.getMinutes();
        var sec = now.getSeconds();
        var dateStr = year+"-"+month+"-"+day+" "+hour+":"+min+":"+sec;

        var feedbackObject = new ContactUs(request.body.useremailaddr, request.body.comment);

        var params = {
            TableName: "zbbFeedbackTable",
            Item: {
                "useremailaddr": feedbackObject.getUserEmailAddr(),
                "datetimestr": dateStr,
                "feedbackcontent": feedbackObject.getFeedbackContent(),
            }
        };
        docClient.put(params, function(error, data) {
            if (error)
            {
                throw error;
            }
            else{
                respond.json(params);
            }
        });
    }
}
module.exports = ContactUsDB;