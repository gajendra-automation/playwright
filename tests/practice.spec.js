const{ test,expect} = require('@playwright/test')

test('Practice' , async({browser})=>{
const context=await browser.newContext();
const page=await context.newPage();
await page.goto('https://www.saucedemo.com/');
await page.locator('#user-name').fill('standard_user');
await page.locator('#password').fill('secret_sauce');
await page.locator('#login-button').click();
const allProducts=page.locator('.inventory_item_name');
const count =await allProducts.count();
console.log(count);
for(let i=0;i<count;i++){
console.log(await allProducts.nth(i).textContent());
if(await allProducts.nth(i).textContent()== 'Sauce Labs Backpack'){
   await allProducts.nth(i).click();
   const PriceOfProd1=await page.locator("//div[@data-test='inventory-item-price']").textContent();
   console.log(PriceOfProd1);
   await page.getByText('Add to cart',{name:'button'}).click();
   await page.getByText('Back to products',{name: 'button'}).click();
   await page.locator('.shopping_cart_link').click();
   // const cartProdName1 =await page.locator('#inventory_item_name').textContent();
   //console.log(expect(cartProdName1=='Sauce Labs Backpack'));
   await page.locator('#checkout').click();
   await page.locator('#first-name').fill('Gajendra');
   await page.locator('#last-name').fill('Dava');
   await page.locator('#postal-code').fill('5600076');
   await page.locator('#continue').click();
   await page.locator('#finish').click();
   await page.pause();
}

}
})