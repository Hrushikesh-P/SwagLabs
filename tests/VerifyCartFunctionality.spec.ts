import { test, expect } from '@playwright/test';
import { test1 } from './myFixtures';


test1('Add all items to cart & check cart size', { tag: '@sanity' }, async ({ basic_login }) => {
    let count = await basic_login.getByRole('button', { name: 'Add to cart' }).count();

    let i = 0;
    while (i < count) {
        await basic_login.getByRole('button', { name: 'Add to cart' }).first().click();
        //console.log(page.getByRole('button', { name: 'Add to cart' }).nth(i));
        i++;
    }

    let cart_size = parseInt(await basic_login.locator('[data-test="shopping-cart-link"]').innerText());
    await expect(cart_size).toEqual(count);
})

test1('Add an item to cart & then navigate to cart page', { tag: '@sanity' }, async ({ basic_login }) => {
    await basic_login.getByRole('button', { name: 'Add to cart' }).first().click();
    await basic_login.locator('[data-test="shopping-cart-link"]').click();
    await expect(basic_login.url()).toEqual("https://www.saucedemo.com/cart.html");
})

test1('Verify the added item in cart', { tag: '@sanity' }, async ({ add_item_in_cart_and_navigate_to_cart }) => {

    const { page, item_name, item_price } = await add_item_in_cart_and_navigate_to_cart;
    //console.log("ADDED : " + item_name + " " + item_price);
    let cart_item_name = await page.locator('[data-test="inventory-item-name"]').innerText();
    let cart_item_price = await page.locator('[data-test="inventory-item-price"]').innerText();
    //console.log("In Cart : " + cart_item_name + " " + cart_item_price);
    await expect(item_name).toEqual(cart_item_name);
    await expect(item_price).toEqual(cart_item_price);

})

test1('Click on checkout button', { tag: '@sanity' }, async ({ basic_login, add_item_in_cart_and_navigate_to_cart }) => {
    const { page } = await add_item_in_cart_and_navigate_to_cart;

    await expect(await page.getByRole('button', { name: 'Checkout' }).isVisible()).toEqual(true);
    await page.getByRole('button', { name: 'Checkout' }).click();

})






