const Base_Page = require('./base_Page');
const request = require('sync-request');
let res = request('GET', 'http://jsonplaceholder.typicode.com/posts/1/comments');
let contactusDetailsJSON = JSON.parse(res.getBody().toString('utf8'));

class ContactUs_Page extends Base_Page {
    constructor(){
        super();
    }

    get firstName() { return $("#contact_form input[name='first_name']") }
    get lastName() { return $("#contact_form input[name='last_name']") }
    get email() { return $("#contact_form input[name='email']") }
    get message() { return $("#contact_form textarea[name='message']") }
    get resetButton() { return $("#form_buttons input[type='reset']") }
    get submitButton() { return $("#form_buttons input[type='submit']") }
    get submissionConfirmation() { return $("#contact_reply h1") }


    enterFirstName(text){
        this.sendKeys(this.firstName, text);
    }

    enterLastName(text){
        this.sendKeys(this.lastName, text);
    }

    enterEmail(email){
        this.sendKeys(this.email, email);
    }

    enterMessage(message){
        this.sendKeys(this.message, message);
    }

    clickSubmitButton(){
        this.click(this.submitButton);
    }

    clickResetButton(){
        this.click(this.resetButton);
    }

    getSuccessMessage(){
        return this.getText(this.submissionConfirmation);
    }

    completeContactForm(){
        const randomNumber = Math.floor(Math.random() * 1000 * 64);
        const randomlyGeneratedEmailAddress = `mark${randomNumber}@yahoo.com`;
        this.enterFirstName("Mark");
        this.enterLastName("Manne");
        this.enterEmail(randomlyGeneratedEmailAddress);
        this.enterMessage(`I love the site.`);
    }

    getTextFromResetFields(){
        const arr = [];

        [   this.firstName,
            this.lastName,
            this.email,
            this.message,
        ].forEach(element => {
            arr.push(this.getText(element));
        })

        return arr;
    }

    // getContactusDetailsJSON(){
    //     const contactusDetails = (function(){return contactusDetailsJSON})();
    //     return contactusDetails;
    // }

    // clickSubmitBtn(){
    //     this.waitForVisible(locator.submitBtn);
    //     this.click(locator.submitBtn);
    // }

    // clickResetBtn(){
    //     this.waitForVisible(locator.resetBtn);
    //     this.click(locator.resetBtn);
    // }

    // getSubmitConfirmation(){
    //     this.waitForVisible(locator.submitReply);
    //     return this.getText(locator.submitReply);
    // }


    // getFirstNameFldPlaceholder(){
    //     return this.getAttribute(locator.firstNameField, 'placeholder')
    // }
}

module.exports = new ContactUs_Page();