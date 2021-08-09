"use strict"

var db = require('../db-connection');
const UserAccount = require('../Models/UserAccount');

class UserAccountsDB{

    //For login usage. Get the emailaddr to verify it has not been use yet
    getEmailAddr(request, respond){
        var accountUsername = request.params.emailaddr;
        var sql = "SELECT emailaddr FROM myziababa_db.useraccount Where emailaddr ='"+accountUsername+"'";
        db.query(sql, function(error, result){
            if(error){
                throw error;
            }
            else{
                respond.json(result);
            }
        });
    }

    //For login usage. Get the password to verify with the password entered by user
    getPassword(request, respond){
        var accountUsername = request.params.emailaddr;
        var sql = "SELECT password FROM myziababa_db.useraccount Where emailaddr ='"+accountUsername+"'";
        db.query(sql, function(error, result){
            if(error){
                throw error;
            }
            else{
                respond.json(result);
            }
        });
    }

    getPasswordByPost(request, respond){
        console.log("Enter getPasswordByPost()");
        var accountUsername = request.body.emailaddr;
        var sql = "SELECT _userAccountId, firstname, lastname, password FROM myziababa_db.useraccount Where emailaddr ='"+accountUsername+"'";
        db.query(sql, function(error, result){
 //       var sql = "SELECT password FROM myziababa_db.useraccount Where emailaddr = ?";
 //       db.query(sql, accountUsername, function(error, result){
            if(error){
                throw error;
            }
            else{
                respond.json(result);
            }
        });        
    }

    validateEmailAddr(request, respond){
        console.log("Enter validateEmailAddr()");
        var accountEmail = request.body.emailaddr;
        var sql = "SELECT COUNT(*) AS counter FROM myziababa_db.useraccount Where emailaddr ='"+accountEmail+"'";
        db.query(sql, function(error, result){
            if(error){
                throw error;
            }
            else{
            respond.json(result);
            }
        });        
    }

    verifyLogin(request, respond){
        var accountPassword = request.body.password;
        var accountUsername = request.body.emailaddr;
        var sql = "SELECT COUNT(*) FROM myziababa_db.useraccount Where password = ? and emailaddr = ?";
        var values = [accountPassword, accountUsername];
        db.query(sql, values, function(error, result){
            if(error){
                throw error;
            }
            else{
                respond.json(result);
            }
        });
    }

    register(request, respond){
        var userAccountObject = new UserAccount(null, request.body.password,
                                                      request.body.emailaddr,
                                                      request.body.firstname,
                                                      request.body.lastname, 
                                                      request.body.mobile,
                                                      request.body.homeaddr,
                                                      request.body.gender,
                                                      request.body.profilephotolink);
        var sql = "INSERT INTO myziababa_db.useraccount (password, emailaddr, firstname, lastname, mobile, homeaddr, gender, profilephotolink) VALUES (?,?,?,?,?,?,?,?)";
        var values = [userAccountObject.getPassword(),
                      userAccountObject.getEmailAddr(),
                      userAccountObject.getFirstName(),
                      userAccountObject.getLastName(), 
                      userAccountObject.getMobile(),
                      userAccountObject.getHomeAddr(),
                      userAccountObject.getGender(),
                      userAccountObject.getProfilePhotoLink()];
        db.query(sql, values, function (error, result) {
            if(error){
                throw error;
            }
            else{
                respond.json(result);
            }
          });
    }


    getAllUserAccounts(request, respond){
        var sql = "SELECT * FROM myziababa_db.useraccount";
        db.query(sql, function(error, result){
            if(error){
                throw error;
            }
            else{
                respond.json(result);
            }
        });
    }

    addUserAccount(request, respond){
        var userAccountObject = new UserAccount(null, request.body.password,
                                                      request.body.emailaddr,
                                                      request.body.firstname,
                                                      request.body.lastname, 
                                                      request.body.mobile,
                                                      request.body.homeaddr,
                                                      request.body.gender,
                                                      request.body.profilephotolink);
        var sql = "INSERT INTO myziababa_db.useraccount (password, emailaddr, firstname, lastname, mobile, homeaddr, gender, profilephotolink) VALUES(?,?,?,?,?,?,?,?)";
        var values = [userAccountObject.getPassword(),
                      userAccountObject.getEmailAddr(),
                      userAccountObject.getFirstName(),
                      userAccountObject.getLastName(), 
                      userAccountObject.getMobile(),
                      userAccountObject.getHomeAddr(),
                      userAccountObject.getGender(),
                      userAccountObject.getProfilePhotoLink()];
        db.query(sql, values, function (error, result) {
            if(error){
                throw error;
            }
            else{
                respond.json(result);
            }
          });
    }
    
    accountInformation(request, respond){
//        var accountId = request.body._userAccountId;
        var accountId = request.body._userId;
        var sql = "SELECT * FROM myziababa_db.useraccount WHERE _userAccountId = "+accountId;
        db.query(sql, function(error, result){
            if(error){
                throw error;
            }
            else{
                respond.json(result);
            }
        });       
    }

    updateUserAccount(request, respond){
        var userAccountObject = new UserAccount(request.params._userAccountId,
                                                null, 
                                                null, 
                                                request.body.firstname,
                                                request.body.lastname, 
                                                request.body.mobile,
                                                request.body.homeaddr,
                                                request.body.gender,
                                                request.body.profilephotolink);

        var sql = "UPDATE myziababa_db.useraccount SET firstname = ?, lastname = ?, mobile = ?, homeaddr = ?, gender = ?, profilephotolink = ? WHERE _userAccountId = ?";
        var values = [userAccountObject.getFirstName(),
                      userAccountObject.getLastName(),
                      userAccountObject.getMobile(),
                      userAccountObject.getHomeAddr(),
                      userAccountObject.getGender(),
                      userAccountObject.getProfilePhotoLink(),
                      userAccountObject.getId()];
        db.query(sql, values, function (error, result) {
            if(error){
                throw error;
            }
            else{
                respond.json(result);
            }
          });
    }
    
    deleteUserAccount(request, respond){
        var userAccountID = request.params._userAccountId;
        var sql = "DELETE FROM myziababa_db.useraccount WHERE _userAccountId = ?";
        db.query(sql, userAccountID, function (error, result) {
            if(error){
                throw error;
            }
            else{
                respond.json(result);
            }
          });
    }
    
}
module.exports = UserAccountsDB;

