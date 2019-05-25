## Prerequites
1. Download/install NodeJS
2. Download/install Java JDK


## Steps to webdriverio
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

#. Download webdriverio, mocha, chai
   $ npm install webdriverio@latest --save-dev
   $ npm install mocha@latest --save-dev
   $ npm install chai@latest --save-dev
   $ npm install @wdio/mocha-framework --save-dev

# Download spec reporter & add 'spec' to reporters: ['dot', 'spec'] in wdio.config.js
   $ npm install @wdio/spec-reporter --save-dev

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
   $ npm i @wdio/cli --save-dev

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

## Steps to configuring Allure reporter
   https://webdriver.io/docs/allure-reporter.html


## Steps to setup Jenkins
1. Download .war file from Jenkins site
2. Drag it into wherever you would like jenkins housed e.g Documents.
3. cd into the directory where Jenkins is housed 
4. Trigger Jenkins  (Always do this each time to use jenkins)
   $ java -jar jenkins.war

   NOTE:
   If you need to change the PORT number then use below command. Default is :8080
   $ java -jar jenkins.war --httpPORT=5555

5. Browse to http://localhost:8080
6. You should find a directory on the UI, navigate to it, copy the password from it & paste on the UI
7. On jenkins UI, install suggested plugins. Wait for this to complete
8. Create  first admin user on Jenkins UI

9. Now, we need to install relevant plugins after signing into jenkins UI
   Manage Jenkins > Manage Plugins > Available (Tab)
10. Install the following plugins 
   - Nodejs, 
   - HTML Publisher
   - Post build task


11. Now, we need to align Jenkins with our Node project
    Manage Jenkins > Global Tool Configuration > NodeJS (section)

    Complete the NodeJS (section)
    - Name: Node
    - click `install automatically` checkbox
    - Global npm packages to install: bower@~1.8.0 grunt-cli@~1.2.0
    - Click 'Apply' button

12. Now, configure our Jenkins instance and point it to our NodeJS bin folder
    Manage Jenkins > Configure System

    Click Configure System and follow the following steps
    - In the Global properties section, click Environment variables checkbox
    - Click the 'Add' button

    Complete the form
    - Name: PATH
    - Value: $PATH:/usr/local/bin/node

    Now, we need to create a new job
    - On the Jenkins Homepage, click 'New item' on the LHS menu
    - Fill out 'Enter an item name' field
    - Select 'Freestyle project' or other as you want.
    - Click OK

    Now, we are taken to the job configure homepage
    - On the 'General' tab, click the 'Advance' button in the first section
    - Check 'Use custom workspace' checkbox. Complete form
    Directory: /Users/kayodeomo/Documents/workspace/.../.../webdriverioFramework/node_modules/.bin
    Display Name: Webdriverio framework
    - Click 'Apply'

    NOTE:- Directory is the complete path to the bin of our project's node_modules

    Now, we may add parameters (which we can change at runtime)
    - Click 'Add Parameter'
    - Select 'String Parameter'
    
    Complete the form to add a parameter
    Name: testFile
    Default Value: contactUsTest.js
    Description: This parameter is to run a single test

    NOTE:-
    Name is actually a 'variable' name

    To add more String Parameters, click the 'Add Parameter' button each time
    Name: logType
    Default Value: silent
    Description: 

    To add more String Parameters
    Name: baseUrl
    Default Value: http://www.webdriveruniversity.com/
    Description: 
    
    Now, we need to need to compose our Build shell script
    - Scroll down to the 'Build' section. 
    - Click 'Add build step' button
    - Select 'Execute shell' option
    - Compose the build commands as below (add or remove commands as required)

    npm install
    npm test -- --baseUrl="$baseUrl" --logLevel="$logType" --spec="$testFile"

    Now, to build our project (i.e. run our tests) 
    - Click Apply and Save the above settings
    - On the Jenkins homepage, select our job/project & click 'Build with Parameters' on LHS
      We are provided with a form with which we can alter  can alter our build parameters
    - Click 'Build'

    Now, to set build triggers
    - Go to Build Triggers section
    - Check 'Build periodically'
    - Enter cron value to specify build schedule

    # sample build Jenkins pipeline script

    https://jenkins.io/doc/book/pipeline/

    e.g.

    pipeline {
        agent any
        stages {
            stage('run webdriverio project') {
                steps {
                    node('master'){
                        git 'https://github.com/solomono10/v5webdriverio.git'
                        sh 'npm install'
                        sh 'npm test -- --baseUrl="$baseUrl" --logLevel="$logType" --spec="$testFile"'
                    }
                }
            }
        }
        post {
            success {
                slackSend channel: '#jenkins-wdio',
                    color: '#00a00d',
                        message: "The pipeline ${currentBuild.fullDisplayName} completed successfully."
            }
        }
    }



## Steps to setup Slack-Jenkins integration
https://wiki.jenkins.io/display/JENKINS/Slack+Plugin
https://jenkins.io/doc/pipeline/tour/post/

Option 1. If you have slack channel already created, then ask your slack admin to give you the token for that channel.

Option 2. Ask your slack admin to create a new channel and get the token for that channel.

I. In Team Subdomain: type the name of <yourteam> as mentioned in my last post

2. copy paste the Slack Token you got from option 1 or 2, in Integration Token edit box. Then copy the channel name from option 1 or 2 as #<yourchannel> name and test connection by clicking on Test Connection button.  And OR

 3. in Integration Token Credential ID edit box, click on Add Key button. A pop will display (see below image). 

4. In the Kind dropdown select Secret Text.

5. In the Secret  edit box, copy the token you got from  Option 1 or 2 above.

6. Give it name in Description. eg. slackjenkins

7. Click Add button and you will be back on configuration page

8. Make sure in Integration Token Credential ID dropdown , you have newly created id in step 6 selected

9. Click on Test, And if you see success then click on apply and save.

10. In your Jenkins project pipeline configuration pipeline script, add a 'post' e.g.

post {
    success {
        slackSend channel: '#jenkins-wdio',
                  color: '#00a00d',
                  message: "The pipeline ${currentBuild.fullDisplayName} completed successfully."
    }


## Common Selenium and Webdriverio Error Messages (SOLVED)
https://blog.kevinlamping.com/common-selenium-and-webdriverio-error-messages/


## Docker
https://docker-curriculum.com/
https://www.youtube.com/watch?v=pGYAg7TMmp0


## Allure reporter
https://github.com/webdriverio-boneyard/wdio-allure-reporter


## Jenkins pipeline
https://www.edureka.co/blog/jenkins-pipeline-tutorial-continuous-delivery

## TeamCity
https://www.jetbrains.com/help/teamcity/installing-and-configuring-the-teamcity-server.html
https://www.jetbrains.com/teamcity/documentation/

## Install tomcat (needed for teamcity)
https://crunchify.com/step-by-step-guide-to-setup-and-install-apache-tomcat-server-in-eclipse-development-environment-ide/

## BrowserStack
https://www.browserstack.com/automate/webdriverio

## Parallel testing problems
https://github.com/webdriverio/webdriverio/issues/1643

https://semaphoreci.com/community/tutorials/setting-up-an-end-to-end-testing-workflow-with-gulp-mocha-and-webdriverio

## Platform Configurator
https://wiki.saucelabs.com/display/DOCS/Platform+Configurator#/

