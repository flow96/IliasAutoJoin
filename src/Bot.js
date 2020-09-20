const puppeteer = require('puppeteer');
const config = require("../config");

class Bot {

  async start() {
    // Setup
    this.browser = await puppeteer.launch({ timeout: 0, headless: config.headless, defaultViewport: {
      width: 1920,
      height: 1080
    },
    args: [
      '--window-size=1920,1080',
      '--no-sandbox'
    ],});
    this.page = await this.browser.newPage();
    const tabs = await this.browser.pages();
    tabs[0].close();
    await this.page.setViewport({ width: 1920, height: 1080});

    // Do the login process
    await this.login();

    // Open a new tab for every course you want to join
    for (let index = 0; index < config.urls.length; index++) {
      const p = await this.browser.newPage();
      this.joinCourse(config.urls[index], p);
    }
    this.page.close();
  }

  async login(){
    await this.page.goto('https://ilias.hs-heilbronn.de/login.php?target=&client_id=iliashhn&cmd=force_login&lang=de');
    await this.page.type("#username", config.username);
    await this.page.type("#password", config.password);
    await Promise.all([
      this.page.waitForNavigation(),
      this.page.click("input[type='submit']")
    ]);
  }

  async joinCourse(url, page){
    await page.goto(url);
    if(await page.$("#tab_join")){
      console.log("Beitreten ist verfügbar");
      await Promise.all([
        page.waitForNavigation(),
        page.click("li[id='tab_join']")
      ]);
      if(await page.$("#cdf_65")){
        console.log("Bestätigung der Spielregeln erforderlich");
        await page.select("#cdf_65", "65_0");
        console.log("Spielregeln bestätigt");
      }
      await page.click("input[name='cmd[join]']");
      console.log("Kurs beigetreten");
    }else{
      console.log("Beitreten nicht möglich");
      setTimeout(() => {
        this.joinCourse(url, page);
      }, 5000);  // retry in 5s (don't spam the server - that might block you)
    }
  }

}

module.exports = Bot;