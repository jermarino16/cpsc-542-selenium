import { cleanup } from '../../test-utils';

const {Builder, By, Key, until} = require('selenium-webdriver');
const assert = require("assert");
const sleep = require("sleep");


describe('Main Page', () => {
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

  it('Main page renders properly', async () => {

        let driver = await new Builder().forBrowser('firefox').build();
        try {
          //Go to the main page
          await driver.get('http://localhost:3000');
          let url = await driver.getCurrentUrl();
          assert.equal(url, "http://localhost:3000/", "Able to access main page");

          //Verify there is a title
          let title = await driver.findElement(By.className("css-1r0stgl"));
          title = await title.getText();
          assert.equal(title, "Space Explorer", "The main page has a title");

        } finally {
          await driver.quit();
        }
        
  }, 30000); //timeout after 30seconds

  it('Main page email input works properly', async () => {

        let driver = await new Builder().forBrowser('firefox').build();
        try {
          //Go to the main page
          await driver.get('http://localhost:3000');

          //Get the email field, should be empty
          let emailField = await driver.findElement(By.name("email"));
          let emailText = await emailField.getText();
          assert.equal(emailText, "", "Email field is on the page and empty");

          //Send keys to the input
          await emailField.sendKeys("Test@test.com");
          emailText = await emailField.getAttribute("value");
          assert.equal(emailText, "Test@test.com", "Email field is able to receive keyboard input");

          //remove n keys from input
          let n = 3;
          for (let i=0; i<n; i++){
            await emailField.sendKeys(Key.BACK_SPACE);
          }
          emailText = await emailField.getAttribute("value");
          assert.equal(emailText, "Test@test.", "Email field is able to receive keyboard delete");

          //remove all text from input
          await emailField.sendKeys(Key.chord(Key.CONTROL, "a"));
          await emailField.sendKeys(Key.BACK_SPACE);
          emailText = await emailField.getAttribute("value");
          assert.equal(emailText, "", "Email field is able to be cleared");

        } finally {
          await driver.quit();
        }
        
  }, 30000); //timeout after 30seconds

  
});
