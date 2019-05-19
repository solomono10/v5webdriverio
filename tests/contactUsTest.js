
let contactPage = require('../pageObjects/contactUs_Page');
const { expect, assert, should } = require('chai');

describe('Test Contact Us form WebdriverUni', function () {

    beforeEach(function () {
        contactPage.url('/Contact-Us/contactus.html');
    })

    it('Should be able to submit a successful submission via contact us form', function (done) {
        contactPage.enterFirstName('this');
        contactPage.enterLastName('that');
        contactPage.enterEmail('i@i.com');
        contactPage.enterMessage('lets see what happens');
        contactPage.clickSubmitButton();
        const message = contactPage.getSuccessMessage();
        expect(message).to.equal('Thank You for your Message!');  
    });

    it('Should be able to reset contact us form', function (done) {
        contactPage.completeContactForm();
        contactPage.clickResetButton();
        let texts = contactPage.getTextFromResetFields();
        expect(texts[0]).to.equal('');
        expect(texts[1]).to.equal('');
        expect(texts[2]).to.equal('');
        expect(texts[3]).to.equal('');
    });
});