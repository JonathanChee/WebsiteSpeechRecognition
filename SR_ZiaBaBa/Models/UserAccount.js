"use strict"

class UserAccount{
    constructor(id, password, emailaddr, firstname, lastname, mobile, homeaddr, gender, profilephotolink){
        this._userAccountId   = id;
        this.password         = password;
        this.emailaddr        = emailaddr;
        this.firstname        = firstname;
        this.lastname         = lastname;
        this.mobile           = mobile;
        this.homeaddr         = homeaddr;
        this.gender           = gender;
        this.profilephotolink = profilephotolink;
    }
    getId(){
        return this._userAccountId;
    }
    getPassword(){
        return this.password;
    }
    getEmailAddr(){
        return this.emailaddr;
    }
    getFirstName(){
        return this.firstname;
    }
    getLastName(){
        return this.lastname;
    }
    getMobile(){
        return this.mobile;
    }
    getHomeAddr(){
        return this.homeaddr;
    }
    getGender(){
        return this.gender;
    }
    getProfilePhotoLink(){
        return this.profilephotolink;
    }
    setPassword(password){
        this.password = password;
    }
    setEmailAddr(emailaddr){
        this.emailaddr = emailaddr;
    }
    setFirstName(firstname){
        this.firstname = firstname;
    }
    setLastName(lastname){
        this.lastname = lastname;
    }
    setMobile(mobile){
        this.mobile = mobile;
    }
    setHomeAddr(homeaddr){
        this.homeaddr = homeaddr;
    }
    setGender(gender){
        this.gender = gender;
    }
    setProfilePhotoLink(profilephotolink){
        this.profilephotolink = profilephotolink;
    }
}
module.exports = UserAccount;