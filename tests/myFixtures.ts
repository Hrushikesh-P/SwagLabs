import { test as base } from '@playwright/test';

export const test1 = base.extend({
    credentials: async ({ }, use) => {
        let username: string = "standard_user";
        let password: string = "secret_sauce";
        await use({ username, password });
    },

    checkout_page_navigation: async ({ page, credentials }, use) => {
        const { username, password } = await credentials;
        await page.goto("https://www.saucedemo.com");
        await page.getByPlaceholder('Username').fill(username);
        await page.getByPlaceholder('Password').fill(password);
        await page.getByRole('button', { name: 'Login' }).click();
        let no_of_items = await page.getByRole('button', { name: 'Add to cart' }).count();
        let item_number = Math.floor(Math.random() * (no_of_items));
        await page.getByRole('button', { name: 'Add to cart' }).nth(item_number).click();
        await page.locator('[data-test="shopping-cart-link"]').click();
        await page.getByRole('button', { name: 'Checkout' }).click();
        await use(page);
    },

    basic_login: async ({ page, credentials }, use) => {
        const { username, password } = await credentials;
        await page.goto("https://www.saucedemo.com");
        await page.getByPlaceholder('Username').fill(username);
        await page.getByPlaceholder('Password').fill(password);
        await page.getByRole('button', { name: 'Login' }).click();
        await use(page);
    },

    add_item_in_cart_and_navigate_to_cart: async ({ page, basic_login }, use) => {
        let no_of_items = await page.getByRole('button', { name: 'Add to cart' }).count();
        let item_number: number = Math.floor(Math.random() * (no_of_items));
        let item_name = await page.locator('[data-test="inventory-item-name"]').nth(item_number).innerText();
        let item_price = await page.locator('[data-test="inventory-item-price"]').nth(item_number).innerText();
        await page.getByRole('button', { name: 'Add to cart' }).nth(item_number).click();
        await page.locator('[data-test="shopping-cart-link"]').click();
        await use({ page, item_price, item_name, });
    }
})
