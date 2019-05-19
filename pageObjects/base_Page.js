class Base_Page {
    constructor(){};

    url(url){
        browser.url(url);
    }

    getUrl(){
        return browser.getUrl();
    }

    sendKeys(element, text){
        element.setValue(text);
    }

    click(element){
        element.click();
    }

    doubleClick(element){
        element.doubleClick();
    }

    pause(time){
        browser.pause(time);
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

    dragAndDrop(element, target, duration){
        element.dragAndDrop(target, duration);
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



    // setViewportSize(width, height){
    //     browser.setViewportSize({
    //         width: width,
	// 		height: height,
    //     })
    // }

    
}

module.exports = Base_Page;