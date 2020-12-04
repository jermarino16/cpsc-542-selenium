import { cleanup } from '../../test-utils';

const {Builder, By, Key, until} = require('selenium-webdriver');
const assert = require("assert");
const sleep = require("sleep");

const appURL = "http://localhost:3000";
const testEmail = "Test@test.com";


describe('Launch Tests: ', () => {

  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);
  

  it.only('Launches load after logging into the application', async () => {
    //define webdriver
    let driver = new Builder().forBrowser('firefox').build();
    driver.get(appURL);
    //Get the email field, 
    let emailField = await driver.wait(until.elementLocated(By.name("email")), 10000);
    //Send keys to the input
    await emailField.sendKeys(testEmail);
    //submit / login
    await emailField.sendKeys(Key.ENTER);

    try{
      //grab the first launch and verify its loaded
      let launchOne = await driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/div[2]/a[1]')), 10000);
      let launchOneText = await launchOne.findElement(By.tagName("h3"));
      launchOneText = await launchOneText.getText();
      // sleep.sleep(3);
      //verify that the launch is there
      assert.equal(launchOneText,  "Starlink-15 (v1.0)", "Launch one loaded on home page");

      //grab the first launch text
      let launchTwenty = await driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/div[2]/a[20]')), 10000);
      let launchTwentyText = await launchTwenty.findElement(By.tagName("h3"));
      launchTwentyText = await launchTwentyText.getText();
      // sleep.sleep(3);
      //verify that the launch is there
      assert.equal(launchTwentyText,  "Starlink 4", "Launch twenty loaded on home page");
    }finally{
        await driver.quit();
    }
  
  }, 30000); //timeout after 30seconds

  // it.only('Can View a launch', async () => {
  //   //define webdriver
  //   let driver = new Builder().forBrowser('firefox').build();
  //   driver.get(appURL);
  //   //Get the email field, 
  //   let emailField = await driver.wait(until.elementLocated(By.name("email")), 10000);
  //   //Send keys to the input
  //   await emailField.sendKeys(testEmail);
  //   //submit / login
  //   await emailField.sendKeys(Key.ENTER);

  //   try{
  //     //grab the first launch text
  //     let launchOne = await driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/div[2]/a[1]')), 10000);
  //     // sleep.sleep(3);
  //     //verify that the launch is there
  //     assert.equal(launchOneText,  "Falcon 9", "Launch one loaded on home page");
  //   }finally{
  //       await driver.quit();
  //   }
  
  // }, 30000); //timeout after 30seconds

  



  
});
