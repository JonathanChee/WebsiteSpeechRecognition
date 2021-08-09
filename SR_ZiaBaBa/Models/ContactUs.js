"use strict"

class ContactUs{
    constructor(useremailaddr, feedbackContent){
        this.useremailaddr   = useremailaddr;
        this.feedbackContent = feedbackContent;
    }
    getUserEmailAddr(){
        return this.useremailaddr;
    }
    getFeedbackContent(){
        return this.feedbackContent;
    }
}
module.exports = ContactUs;