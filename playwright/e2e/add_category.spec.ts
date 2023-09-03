import {expect, Page, test} from '@playwright/test';
test('Add new category', async ({ page }) => {
  await page.goto('http://localhost:4200/');

  await page.getByRole('button', { name: 'Add category' }).first().click();
  await page.getByLabel('Name: *').click();
  await page.getByLabel('Name: *').fill('Test Category 1');
  await page.getByLabel('Agree to terms *').check();
  await page.getByRole('button', { name: 'Save' }).click();

  expect(await page.getByRole('button', { name: 'Test category 1' })).toBeTruthy();

  await page.getByRole('button', { name: 'Test Category 1' }).click();
  await page.getByRole('button', { name: 'Delete category' }).click();

  await expect(page.getByRole('button', { name: 'Test category 1' })).toHaveCount(0)
});
