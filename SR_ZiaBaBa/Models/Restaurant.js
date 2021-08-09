"use strict"

class Restaurant{
    constructor(id, name, addr, imagelink, region, openinghour, contact, website){
        this._restaurantId       = id;
        this.restaurantname      = name;
        this.restaurantaddr      = addr;
        this.restaurantimagelink = imagelink;
        this.region              = region;
        this.openinghour         = openinghour;
        this.contact             = contact;
        this.website             = website;
    }
    getId(){
        return this._restaurantId;
    }
    getRestaurantName(){
        return this.restaurantname;
    }
    getRestaurantAddr(){
        return this.restaurantaddr;
    }
    getRestaurantImageLink(){
        return this.restaurantimagelink;
    }
    getRegion(){
        return this.region;
    }
    getOpeningHour(){
        return this.openinghour;
    }
    getContact(){
        return this.contact;
    }
    getWebsite(){
        return this.website;
    }
    setRestaurantName(name){
        this.restaurantname = name;
    }
    setRestaurantAddr(addr){
        this.restaurantaddr = addr;
    }
    setRestaurantImageLink(imagelink){
        this.restaurantimagelink = imagelink;
    }
    setRegion(region){
        this.region = region;
    }
    setOpeningHour(openinghour){
        this.openinghour = openinghour;
    }
    setContact(contact){
        this.contact = contact;
    }
    setWebsite(website){
        this.website = website;
    }
}
module.exports = Restaurant;