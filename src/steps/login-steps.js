const { Given, Then, When } = require("cucumber");
const expect = require("chai").expect;

Given(/^I go to the website$/, () => {
  browser.url("http://www.webdriveruniversity.com/Contact-Us/contactus.html");
});

When(/^I enter my name$/, () => {
  $("input[name='first_name']").setValue("retyuiofgyufghjfghjgfhjgfhfgh");

  // browser.pause(10000);
});
