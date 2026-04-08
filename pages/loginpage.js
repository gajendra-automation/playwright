class LoginPage {
  constructor(page, testData) {
    if (!testData) throw new Error("testData is undefined!");
    this.page = page;
    // Extract the actual URL string
    this.url = testData.url?.hyperlink || testData.url?.text || '';
    this.username = testData.username;
    this.password = testData.password;
    this.usernameInput = page.locator('input[type="text"]');
    this.passwordInput = page.locator('input[type="password"]');
    this.loginBtn = page.locator('//span[text()="Login"]');
  }
  async navigate() {
    console.log('Navigating to URL:', this.url);
    await this.page.goto(this.url);
  }
    async login(username = this.username, password = this.password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginBtn.click();
  }
  async verifyLogin(){
      //await page.waitForTimeout(6000)
      const currentPageURL=this.page.url();
      if(currentPageURL === "https://rims-demo.blubirch.com/api/v2/return-creation"){
        console.log(currentPageURL +"URL is correct");
      }else{
       const errorMsg=await this.page.locator(".v-toast__text").textContent();
        console.log(errorMsg);
        console.log("Invalid credentials pls check...!")
        console.log(currentPageURL +"URL is not correct");
      }
    await this.page.waitForTimeout(5000);
  }
}

module.exports = { LoginPage };
