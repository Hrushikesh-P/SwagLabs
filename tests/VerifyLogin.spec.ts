import { test, expect} from '@playwright/test'
import { test1 } from './myFixtures';

test.beforeEach('Navigate to Swags Lab',async({page}) => {
    await page.goto("https://www.saucedemo.com");
})

test1('Verify user login', { tag: '@sanity' }, async ({ page , credentials }) => {
    const {username , password} = await credentials; 
    await page.getByPlaceholder('Username').fill(username);
    await page.getByPlaceholder('Password').fill(password);
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.url()).toEqual("https://www.saucedemo.com/inventory.html");
    await page.screenshot({path : 'D:\\TestApps\\SwagLabs\\screenshots\\after_login.png'});
    // await expect(page).toHaveScreenshot();
})

test('Verify when username is correct but password is wrong', { tag: '@sanity' }, async ({ page }) => {
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(await page.getByRole('heading', { level: 3 }).innerText()).toEqual("Epic sadface: Username and password do not match any user in this service"); 
})

test('Verify when username is wrong but password is correct', { tag: '@sanity' }, async ({ page }) => {
    await page.getByPlaceholder('Username').fill('standard_');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(await page.getByRole('heading', { level: 3 }).innerText()).toEqual("Epic sadface: Username and password do not match any user in this service");
})

test('Verify when username & password both are wrong', { tag: '@sanity' }, async ({ page }) => {
    await page.getByPlaceholder('Username').fill('standard_');
    await page.getByPlaceholder('Password').fill('secret_');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(await page.getByRole('heading', { level: 3 }).innerText()).toEqual("Epic sadface: Username and password do not match any user in this service");
})

