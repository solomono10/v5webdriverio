## click()

<button id="myButton" onclick="document.getElementById('someText').innerHTML='I was clicked'">Click me</button>     
<div id="someText">I was not clicked</div>

    it('should demonstrate the click command', () => {
        const myButton = $('#myButton')
        myButton.click()
        const myText = $('#someText')
        const text = myText.getText();
        assert(text === 'I was clicked'); // true
    })
    it('should fetch menu links and visit each page', () => {
        const links = $$('#menu a');
        links.forEach((link) => {
            link.click();
        });
    });

## doubleClick()

<button id="myButton" ondblclick="document.getElementById('someText').innerHTML='I was dblclicked'">Click me</button>
<div id="someText">I was not clicked</div>

    it('should demonstrate the doubleClick command', () => {
    const myButton = $('#myButton')
    myButton.doubleClick()

    const value = myButton.getText()
    assert(value === 'I was dblclicked') // true
    })

## waitForDisplayed(ms, reverse, error);

<div id="elem" style="visibility: hidden;">Hello World!</div>
<script type="text/javascript">
    setTimeout(() => {
        document.getElementById('elem').style.visibility = 'visible';
    }, 2000);
</script>

it('should detect when element is visible', () => {
    const elem = $('#elem')
    elem.waitForDisplayed(3000);
});
it('should detect when element is no longer visible', () => {
    const elem = $('#elem')
    // passing 'undefined' allows us to keep the default timeout value without overwriting it
    elem.waitForDisplayed(undefined, true);
});

## waitUntil

<div id="someText">I am some text</div>
<script>
  setTimeout(() => {
    $('#someText').html('I am now different');
  }, 1000);
</script>

it('should wait until text has changed', () => {
    browser.waitUntil(() => {
      return $('#someText').getText() === 'I am now different'
    }, 5000, 'expected text to be different after 5s');
});



