## Prerequites
1. Download/install NodeJS
2. Download/install Java JDK


## Steps
1. Create a project folder and `cd` into it
2. run `git init`
3. run `npm init` for custom package.json or `npm init -y` for generic package.json
   - In your package.json file, set as below:
   
   "scripts": {
    "test": "wdio"
  },

  This lets you run your tests with the following command...

## Will run all your tests
  $ npm test 

## Will run a specific test file
  $ npm test -- --spec=<file-path>
   
   NOTE:-
   To use WebdriverIO in your project for integration testing we recommend using the test runner because it comes with a lot of useful features that makes your life easier. With WebdriverIO v5 and up, the testrunner has moved into the @wdio/cli NPM package.

   Before installing the test runner, we need to initialize (i.e npm init) an empty NPM project (this will allow us to the cli to install needed dependencies).

4. install dependencies (etc)

a. Download webdriverio, mocha, chai
   $ npm install webdriverio@latest --save-dev
   $ npm install mocha@latest --save-dev
   $ npm install chai@latest --save-dev
   $ npm install @wdio/mocha-framework --save-dev

b. download selenium-standalone server
   $ npm install @wdio/selenium-standalone-service --save-dev

c. invoke the selenium-standalone server file, install it & start the server
   $ ./node_modules/.bin/selenium-standalone install && ./node_modules/.bin/selenium-standalone start

   NOTE:- 
   This installs the server as a a local npm package.
   When this is complete you will get a PORT number. Use the PORT in the URL below
   Lets the CmdLine window running otherwise the server will be killed.
   Type http://127.0.0.1:PORT/wd/hub/static/resource/hub.html where PORT is output on the CmdLine

d. Browse to http://127.0.0.1:PORT/wd/hub/static/resource/hub.html

    NOTE:- 
    You should see the server running

    TO RUN TESTS USING THE STANDALONE SERVER >>>>>>>>>>>>>>>>>>>>>>>>>>>
    $ node filename.js

e. install the cli
   $ npm i --save-dev @wdio/cli

f. Generate Configuration File
   $ ./node_modules/.bin/wdio config

   NOTE:- 
   Running the above configuration utility generates a configuration file that stores all of our WebdriverIO settings.

   TO RUN TESTS USING THE WDIO TESTRUNNER >>>>>>>>>>>>>>>>>>>>>>>>>>>
   $ ./node_modules/.bin/wdio wdio.conf.js

   NOTE:- 
   Selenium standalone server has to be running in order to run tests using the wdio testrunner
   Make sure that the path to the `specs []` in the `wdio.conf.js` file is correctly set.

   e.g.

   specs: [
        './tests/*.js'
    ],

5. Allure reporter
   https://webdriver.io/docs/allure-reporter.html


 
4. create `pageObjects` folder
5. create `tests` folder





https://semaphoreci.com/community/tutorials/setting-up-an-end-to-end-testing-workflow-with-gulp-mocha-and-webdriverio