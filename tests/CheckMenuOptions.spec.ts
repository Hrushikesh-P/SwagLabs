import { expect } from '@playwright/test'
import { test1 } from './myFixtures';

test1('Verify Menu Items', { tag: '@sanity' }, async ({ basic_login }) => {

    await expect(basic_login.url()).toEqual("https://www.saucedemo.com/inventory.html");
    await basic_login.getByRole('button', { name: 'Open Menu' }).click();
    let menu_items_expected: string[] = ['All Items', 'About', 'Logout', 'Reset App State'];
    let menu_count = await basic_login.locator('[class="bm-item menu-item"]').count();

    let i: number = 0;
    while (i < menu_count) {
        let menu_item = await basic_login.locator('[class="bm-item menu-item"]').nth(i).innerText();
        await expect(menu_item).toEqual(menu_items_expected[i]);
        i++;
    }

})

