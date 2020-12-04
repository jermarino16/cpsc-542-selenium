import { cleanup } from '../../test-utils';

const {Builder, By, Key, until} = require('selenium-webdriver');
const assert = require("assert");
const sleep = require("sleep");

const appURL = "http://localhost:3000";
const testEmail = "Test@test.com";


describe('Launch Tests: ', () => {

  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

  it('Can reach the cart page via Icon', async () => {
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
      //grab the cart icon
      let cartIcon = await driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/footer/div/a[2]')), 10000);
      //simulate a click
      await cartIcon.click();
      // sleep.sleep(3);
      //grab the new url
      let url = await driver.getCurrentUrl();
      //verify it is the cart page.
      assert.equal(url, appURL + "/cart", "Able to reach the cart via icon");
    }finally{
        await driver.quit();
    }
  
        
  }, 30000); //timeout after 30seconds


  
});
