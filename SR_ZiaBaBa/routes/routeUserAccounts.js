"use strict"


const userAccountsdb = require('../Models/UserAccountsDB');

var userAccountsDBObject = new userAccountsdb();

function routeUserAccounts(app){
    app.route('/login/:emailaddr')
        .get(userAccountsDBObject.getPassword);
    app.route('/login')
        .post(userAccountsDBObject.getPasswordByPost);
    app.route('/validateEmail')
        .post(userAccountsDBObject.validateEmailAddr);
    app.route('/loginVerify')
        .post(userAccountsDBObject.verifyLogin);
    app.route('/registration')
        .post(userAccountsDBObject.register);        
    app.route('/getAccountInfo')
        .post(userAccountsDBObject.accountInformation);
    app.route('/updateAccount/:_userAccountId')
        .put(userAccountsDBObject.updateUserAccount);
    app.route('/deleteAccount/:_userAccountId')
        .delete(userAccountsDBObject.deleteUserAccount);

    app.route('/userAccounts')
        .post(userAccountsDBObject.addUserAccount)
        .get(userAccountsDBObject.getAllUserAccounts);
}
module.exports = {routeUserAccounts};

