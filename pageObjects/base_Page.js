class Base_Page {
    constructor(){};

    url(url){
        browser.url(url);
    }

    getUrl(){
        return browser.getUrl();
    }

    pause(time){
        browser.pause(time);
    }

    sendKeys(element, text){
        element.setValue(text);
    }

    clearValue(element){
        element.clearValue();
    }

    getValue(element){
        element.getValue();
    }

    addValue(element, value){
        element.addValue(value);
    }

    getSize(element, prop){
        element.getSize(prop);
    }

    click(element){
        element.click();
    }

    doubleClick(element){
        element.doubleClick();
    }

    waitForDisplayed(element, ms, reverse, error){
        element.waitForDisplayed();
    }

    waitForEnabled(element, ms, reverse, error){
        element.waitForEnabled();
    }

    waitForExist(element, ms, reverse, error){
        element.waitForExist();
    }

    waitUntil(condition, timeout, timeoutMsg, interval){
        return browser.waitUntil(condition, timeout, timeoutMsg, interval);
    }

    getCookies(names){
        return browser.getCookies(names);
    }

    setCookies(name){
        browser.setCookies(name);
    }

    deleteCookies(name){
        browser.deleteCookies(name);
    }

    reloadSession(){
        browser.reloadSession();
    }

    debug(){
        browser.debug();
    }

    scrollIntoView(element, scrollIntoViewOptions){
        element.scrollIntoView(scrollIntoViewOptions);
    }

    dragAndDrop(element, target, duration){
        element.dragAndDrop(target, duration);
    }

    switchWindow(urlOrTitleToMatch){
        browser.switchWindow(urlOrTitleToMatch);
    }
    
    newWindow(url, windowName, windowFeatures){
        browser.newWindow(url, windowName, windowFeatures);
    }
    
    getWindowSize(){
        return browser.getWindowSize();
    }
    
    setWindowSize(){
        browser.setWindowSize(width, height);
    }

    isDisplayed(element){
        return element.isDisplayed();
    }

    isDisplayedInViewport(element){
        return element.isDisplayedInViewport();
    }

    isEnabled(element){
        return element.isEnabled();
    }

    isExisting(element){
        return element.isExisting();
    }

    isFocused(element){
        return element.isFocused();
    }

    isSelected(element){
        return element.isSelected();
    }

    moveTo(element, x, y){
        element.moveTo(x, y);
    }

    getAttribute(element, attributeName){
        return element.getAttribute(attributeName);
    }

    getProperty(element, property){
        return element.getProperty(property);
    }

    getHTML(element, includeSelectorTag){
        element.getHTML(includeSelectorTag);
    }

    selectByAttribute(element, attribute, value){
        element.selectByAttribute(attribute, value);
    }

    selectByIndex(element, index){
        element.selectByIndex(index);
    }

    selectByVisibleText(element, text){
        element.selectByVisibleText(text)
    }

    // execute(script, arguments){
    //     browser.execute();
    // }

    waitForDisplayed(element, ms, reverse, error){
        element.waitForDisplayed();
    }

    getAlertText(){
        return browser.alertText();
    }

    getTitle(){
        return browser.getTitle();
    }

    getText(element){
        return element.getText();
    }
    
    switchTab([tabId]){
        browser.switchTab([tabId]);
    }

    getCssProperty(locator, propertyName){
        return browser.getCssProperty(locator, propertyName);
    }  
}

module.exports = Base_Page;