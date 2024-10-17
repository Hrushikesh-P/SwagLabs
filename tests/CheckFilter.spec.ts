import { expect } from '@playwright/test'
import { test1 } from './myFixtures';

test1('Verify Filter Items', { tag: '@sanity' }, async ({ basic_login }) => {
    await expect(basic_login.locator('[class="product_sort_container"]')).toBeVisible();
    await basic_login.locator('[class="product_sort_container"]').click();
    let total_filters: number = await basic_login.getByRole('option').count();
    let filter_item_expected: string[] = ['Name (A to Z)', 'Name (Z to A)', 'Price (low to high)', 'Price (high to low)']
    let i = 0;
    while (i < total_filters) {
        let filter_item = await basic_login.getByRole('option').nth(i).innerText();
        await expect(filter_item).toEqual(filter_item_expected[i]);
        i++;
    }

})

test1('Apply Filter - Price Low to High', { tag: '@sanity' }, async ({ basic_login }) => {

    await expect(basic_login.locator('[class="product_sort_container"]')).toBeVisible();
    await basic_login.locator('[class="product_sort_container"]').selectOption('Price (low to high)');

    let price_item_count = await basic_login.locator('[data-test="inventory-item-price"]').count();

    let i = 0;
    let price_arr: number[] = [];
    while (i < price_item_count) {
        let price_string: string = await basic_login.locator('[data-test="inventory-item-price"]').nth(i).innerText();
        let price = parseFloat(price_string.replace('$', ''));
        price_arr.push(price);
        i++;
    }

    i = 0;
    let min_price = price_arr[0];
    while (i < price_item_count) {
        if (min_price > price_arr[i])
            await expect(false).toEqual(true);
        else
            await expect(true).toEqual(true);
        i++;
    }

})


test1('Apply Filter - Price High to Low', { tag: '@sanity' }, async ({ basic_login }) => {

    await expect(basic_login.locator('[class="product_sort_container"]')).toBeVisible();
    await basic_login.locator('[class="product_sort_container"]').selectOption('Price (high to low)');

    let price_item_count = await basic_login.locator('[data-test="inventory-item-price"]').count();

    let i = 0;
    let price_arr: number[] = [];
    while (i < price_item_count) {
        let price_string: string = await basic_login.locator('[data-test="inventory-item-price"]').nth(i).innerText();
        let price = parseFloat(price_string.replace('$', ''));
        price_arr.push(price);
        i++;
    }

    i = 0;
    let max_price = price_arr[0];
    while (i < price_item_count) {
        if (max_price < price_arr[i])
            await expect(false).toEqual(true);
        else
            await expect(true).toEqual(true);
        i++;
    }

})