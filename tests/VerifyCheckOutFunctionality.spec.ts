//Used custom fixture to share across the different scenarios
import { test, expect } from '@playwright/test';
import { test1 } from './myFixtures';
import exp from 'constants';

test1.beforeEach('Fill the form & continue', async ({ page,checkout_page_navigation  }) => {
    await checkout_page_navigation.getByPlaceholder('First Name').fill('James');
    await checkout_page_navigation.getByPlaceholder('Last Name').fill('Anderson');
    await checkout_page_navigation.getByPlaceholder('Zip/Postal Code').fill('411045');
    await checkout_page_navigation.getByRole('button', { name: 'Continue' }).click();
})

test1('Fill details', { tag: '@sanity' }, async ({ checkout_page_navigation }) => {
    await expect(checkout_page_navigation.url()).toEqual("https://www.saucedemo.com/checkout-step-two.html");
})


test1('Finish the Purchase', { tag: '@sanity' }, async ({ checkout_page_navigation }) => {
    await checkout_page_navigation.getByRole('button', { name: 'Finish' }).click();

    await expect(checkout_page_navigation.url()).toEqual("https://www.saucedemo.com/checkout-complete.html");
    await expect(await checkout_page_navigation.getByRole("heading", { level: 2 }).innerText()).toEqual("Thank you for your order!");

})











