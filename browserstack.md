Selenium with WebdriverIO
Your guide to running Selenium Webdriver tests with WebdriverIO on BrowserStack.

Now you can embed BrowserStack test reports from WebdriverIO directly in Jenkins and Azure Pipelines.

Introduction
BrowserStack gives you instant access to our Selenium Grid of 2000+ real devices and desktop browsers. Running your Selenium tests with WebdriverIO on BrowserStack is simple. This guide will help you:

Run a sample Selenium Webdriver test with WebdriverIO on BrowserStack
Setup your WebdriverIO test suite to be able to test URLs in your internal network
Understand and configure the core capabilities in your Selenium test suite
Speed up your WebdriverIO test suite with parallel testing
Use our REST API to update your tests
Note: All the code samples and files referred to in this guide can be found in our GitHub repo: webdriverio-browserstack

Prerequisites
Before you can start running your Selenium tests with WebdriverIO:

Install WebdriverIO using npm
# Install using npm
npm install webdriverio
Integration with BrowserStack
To understand how to integrate with BrowserStack, we will look at two things:

A sample test case written in WebdriverIO with NodeJS
Integration of this sample test case with BrowserStack
Sample Test Case
The sample WebdriverIO test case below searches for the string "BrowserStack" on Google, and checks if the title of the resulting page is "BrowserStack - Google Search"

describe('Google\'s Search Functionality', function() {
  it('can find search results', function () {
    browser
      .url('https://www.google.com/ncr')
      .setValue('*[name="q"]','BrowserStack\n')
      .pause(5000);
    
    assert(browser.getTitle().match(/BrowserStack - Google Search/i));
  });
});
Now that we have created the test case, we are ready to integrate it into BrowserStack.

Integrating with BrowserStack
To integrate the sample WebdriverIO test case into BrowserStack, we have to update the *.conf.js config files with the BrowserStack Hub URL and credentials required to connect to the BrowserStack Selenium grid. The example below shows the single.conf.js config file, used for single test runs:

exports.config = {
  user: 'oluolu1',
  key: 'aSc5qhvJHG3AzZygyBsG',

  capabilities: [{
    browser: 'chrome',
    name: 'Bstack-[WebdriverIO] Sample Test'
  }]
}
We are now ready to run the test on BrowserStack, using the following command:

./node_modules/.bin/wdio conf/single.conf.js
Testing on Internal Networks
BrowserStack enables you to run your WebdriverIO automated tests on your internal development environments, on localhost, and from behind a corporate firewall. This feature is called "Local Testing".

Local Testing establishes a secure connection between your machine and the BrowserStack cloud. Once you set up Local Testing, all URLs work out of the box, including HTTPS URLs and those behind a proxy or firewall.

Configuring your WebdriverIO tests for Local Testing takes just three steps:

Install the BrowserStack Local Testing bindings:

# Install using npm
npm install browserstack-local
Next, you need to update your WebdriverIO config file, local.conf.json, and set the browserstack.local capability to true:

var browserstack = require('browserstack-local');

exports.config = {
  user: 'oluolu1',
  key: 'aSc5qhvJHG3AzZygyBsG',

  capabilities: [{
    browser: 'chrome',
    name: 'Bstack-[WebdriverIO] Local Test',
    'browserstack.local': true
  }],

  // Code to start browserstack local before start of test
  onPrepare: function (config, capabilities) {
    console.log("Connecting local");
    return new Promise(function(resolve, reject){
      exports.bs_local = new browserstack.Local();
      exports.bs_local.start({'key': exports.config.key }, function(error) {
        if (error) return reject(error);
        console.log('Connected. Now testing...');

        resolve();
      });
    });
  },

  // Code to stop browserstack local after end of test
  onComplete: function (capabilties, specs) {
    exports.bs_local.stop(function() {});
  }
}
You can use the following sample test case, which is in our GitHub repo. This test case navigates to the local server which you can use to verify if your Local test connection has been setup correctly:

describe('BrowserStack Local Testing', function() {
  it('can check tunnel working', function () {
    browser
      .url('http://bs-local.com:45691/check')

    assert(browser.getSource().match(/Up and running/i));
  });
});
You can now run your WebdriverIO test using BrowserStack Local with the following command:

./node_modules/.bin/wdio conf/local.conf.js
Configuring capabilities
To run your WebdriverIO test suite on our Selenium grid, you have to configure a couple of capabilities so that your tests execute on a remote browser. BrowserStack supports the full complement of Selenium capabilities, and also has several advanced capabilities which give you full control over how you want to run your WebdriverIO test suites.

The sections below detail the different capabilities and provide examples of how to use them.For a full reference of all the Selenium and custom capabilities we support, visit our Capabilities page.

Run tests on desktop browsers and real mobile devices
Using the drop-down menus, select a combination of operating system, browser, and screen resolution. To see the order of precedence for the capabilities, please read about parameter override rules here.

You can additionally run your WebdriverIO tests on real Android and iOS devices in our datacenters.

Look for the  icon to select a real device.

1. Select an Operating System
iOS
2. Select a device
iPhone 8 Plus
capabilities: [{
  'device': 'iPhone 8 Plus',
  'os_version': '11'
}]
Note: If browser_version capability is not set, the test will run on the latest version of the browser set by browser capability.

For a list of all supported devices, visit the Browsers and Devices page.

Builds and projects
Keep track of all your automated tests using the build and project capabilities. Group your tests into builds, and builds further into projects.

capabilities: [{
  'build': 'version1',
  'project': 'newintropage'
}]
Note: Allowed characters include uppercase and lowercase letters, digits, spaces, colons, periods, and underscores. Other characters, like hyphens or slashes are not allowed.

Self-signed certificates
To avoid invalid certificate errors while testing on BrowserStack Automate, set the acceptSslCerts capability in your test to true.

capabilities: [{
  'acceptSslCerts': true
}]
Enable and Disable Pop-ups
Chrome
Popup blocker is disabled by default in Chrome >= 43. To enable the popup blocker, create a chromeOptions capability, and pass the disable-popup-blocking as excludeSwitches to the capability.

capabilities: [{
  'chromeOptions': {
    'excludeSwitches': ["disable-popup-blocking"]
  }
}]
To disable the popup blocker in Chrome < 43, create a chromeOptions capability, and pass the --disable-popup-blocking argument to the capability.

capabilities: [{
  'chromeOptions': {
    'args': ["--disable-popup-blocking"]
  }
}]IE
To enable the popups in IE, use the browserstack.ie.enablePopups capability.

capabilities: [{
  'browserstack.ie.enablePopups': true
}]Safari
To enable the popups in Safari, use the browserstack.safari.enablePopups capability.

capabilities: [{
  'browserstack.safari.enablePopups': true
}]
Debugging
BrowserStack provides a range of debugging tools to help you quickly identify and fix bugs you discover through your automated tests.

Text Logs
Text Logs are a comprehensive record of your test. They are used to identify all the steps executed in the test and troubleshoot errors for the failed step. Text Logs are accessible from the Automate dashboard or via our REST API.

Visual Logs
Visual Logs automatically capture the screenshots generated at every Selenium command run through your WebdriverIO tests. Visual logs help with debugging the exact step and the page where failure occurred. They also help identify any layout or design related issues with your web pages on different browsers.

Visual Logs are disabled by default. In order to enable Visual Logs you will need to set browserstack.debug capability to 'true'.

capabilities: [{
  'browserstack.debug': true
}]Video recording
Every test run on the BrowserStack Selenium grid is recorded exactly as it is executed on our remote machine. This feature is particularly helpful whenever a browser test fails. You can access videos from Automate Dashboard for each session. You can also download the videos from the Dashboard or retrieve a link to download the video using our REST API.

Note: Video recording increases test execution time slightly. You can disable this feature by setting the browserstack.video capability to false.

To disable video recording, add the following code snippet:

capabilities: [{
  'browserstack.video': false
}]Console Logs
Console Logs capture the browser's console output at various steps of the test to troubleshoot javascript issues. You can retrieve Console Logs using our REST API. You will also be able to download logs from Automate Dashboard.

Console Logs are enabled with log level set to 'errors' by default. To set different log levels, you need to use the capability browserstack.console with values 'disable', 'errors', 'warnings', 'info' or 'verbose', as shown below:

capabilities: [{
  'browserstack.console': <log-level>
}]Network Logs
Network Logs capture the browser's performance data such as network traffic, latency, HTTP requests and responses in the HAR format. You can download network logs using the REST API or from the Automate Dashboard. You can visualize HAR files using the HAR Viewer.

Network Logs are disabled by default. To enable Network Logs use the capability browserstack.networkLogs with the value 'true', as shown below:

capabilities: [{
  'browserstack.networkLogs': true
}]
Speed up testing
The BrowserStack Selenium grid gives you the infrastructure you need to scale. Features like Parallel Testing and Queuing enable you to scale faster.

Parallel Testing
On BrowserStack, you can run multiple WebdriverIO tests at the same time across various browser, device and OS combinations. This is “Parallel Testing”. Parallel Testing gives you the same benefits as running a multi-threaded application helps you reduce the run time of your test suite, resulting in faster build times and faster releases.

To run tests on multiple browsers in parallel with WebdriverIO on BrowserStack, modify the parallel.conf.js config file as shown below:

exports.config = {
  user: 'oluolu1',
  key: 'aSc5qhvJHG3AzZygyBsG',

  commonCapabilities: [{
    name: 'Bstack-[WebdriverIO] Parallel Test'
  }],

  capabilities: [{
    browser: 'chrome'
  },{
    browser: 'firefox'
  },{
    browser: 'internet explorer'
  },{
    browser: 'safari'
  }],

  maxInstances: 10
}

// Code to support common capabilities
exports.config.capabilities.forEach(function(caps){
  for(var i in exports.config.commonCapabilities) caps[i] = caps[i] || exports.config.commonCapabilities[i];
});
Capabilities for each environment can be customised as explained earlier.

You can now run your tests in parallel on BrowserStack using the following command:

./node_modules/.bin/wdio conf/parallel.conf.js
Note: Achieve your test coverage and build execution time goals by using our calculator to understand how many parallel sessions you need.

Queuing
With queuing, you can launch an additional number of parallel tests with different browser configurations that will be queued in a sequence. For instance, if you want to run 5 additional tests, apart from your subscribed limit of 2 parallel tests, BrowserStack will queue the additional 5 tests until one of the 2 initial tests finish, and a slot is available for execution. With queuing, you don't need to worry about managing your test pipeline - we automatically take care of scheduling and execution for you.

With this feature, accounts up to 5 parallel tests can queue 5 tests. Beyond 5 parallel tests, an equivalent number of tests will be queued.

REST API
BrowserStack provides a comprehensive REST API to access and update information about your tests. Shown below is a sample code snippet which allows you to mark your tests as pass or fail based on the assertions in your WebdriverIO test cases.

var request = require("request");
request({uri: "https://oluolu1:aSc5qhvJHG3AzZygyBsG@api.browserstack.com/automate/sessions/<session-id>.json", method:"PUT", form:{"status":"completed","reason":""}})