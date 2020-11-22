import { cleanup } from '../../test-utils';

const {Builder, By, Key, until} = require('selenium-webdriver');
const assert = require("assert");
const sleep = require("sleep");


describe('Cart Interface', () => {
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

  it('google chrome opens', async () => {

        let driver = await new Builder().forBrowser('firefox').build();
        try {
          await driver.get('http://localhost:3000');
        //   await driver.findElement(By.name('q')).sendKeys('webdriver', Key.RETURN);
        //   await driver.wait(until.titleIs('webdriver - Google Search'), 1000);
          sleep.sleep(10)//sleep for 5 seconds
          assert.equal(1, 2, "1 does not equal 2");
        } finally {
          await driver.quit();
        }
        
  }, 30000);

  
});
