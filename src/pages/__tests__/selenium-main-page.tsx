import { cleanup } from '../../test-utils';

const {Builder, By, Key, until, WebElement} = require('selenium-webdriver');
const assert = require("assert");
const sleep = require("sleep");


describe('Main Page', () => {
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

  it('Able to access the main page', async () => {

        let driver = await new Builder().forBrowser('firefox').build();
        try {
          await driver.get('http://localhost:3000');
          let url = await driver.getCurrentUrl();
          assert.equal(url, "http://localhost:3000/", "Able to access main page");
  
          // sleep.sleep(10) // sleep for n seconds
        } finally {
          await driver.quit();
        }
        
  }, 30000); //timeout after 30seconds

  it('Main page renders properly', async () => {

        let driver = await new Builder().forBrowser('firefox').build();
        try {
          //Go to the main page
          await driver.get('http://localhost:3000');

          //Verify there is a title
          let title = await driver.findElement(By.className("css-1r0stgl"));
          title = await title.getText();
          assert.equal(title, "Space Explorer", "The main page has a title");

          //Get the input Box, should be empty
          let input = await driver.findElement(By.name("email"));
          let inputText = await input.getText();
          assert.equal(inputText, "", "Input is on the page and empty");

          //Send keys to the input
          await input.sendKeys("Test@test.com");
          inputText = await input.getAttribute("value");
          assert.equal(inputText, "Test@test.com", "Email Input is able to receive keyboard input");

        //   await driver.findElement(By.name('q')).sendKeys('webdriver', Key.RETURN);
        //   await driver.wait(until.titleIs('webdriver - Google Search'), 1000);
        } finally {
          await driver.quit();
        }
        
  }, 30000); //timeout after 30seconds

  
});
