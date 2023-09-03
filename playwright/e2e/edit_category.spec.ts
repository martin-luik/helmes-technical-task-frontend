import {expect, test} from "@playwright/test";

test('Edit category', async ({ page }) => {
  await page.goto('http://localhost:4200/');
  await page.getByRole('navigation').getByRole('button', { name: 'Add category' }).click();
  await page.getByLabel('Name: *').click();
  await page.getByLabel('Name: *').fill('New category 1');
  await page.getByLabel('Agree to terms *').check();
  await page.getByRole('button', { name: 'Save' }).click();
  await page.getByRole('navigation').getByRole('button', { name: 'Add category' }).click();
  await page.getByLabel('Name: *').click();
  await page.getByLabel('Name: *').fill('New category 2');
  await page.getByLabel('Agree to terms *').check();
  await page.getByRole('button', { name: 'Save' }).click();
  await page.getByRole('button', { name: 'New category 2' }).click();
  await page.getByRole('button', { name: 'Edit category' }).click();
  await page.getByLabel('Name:').click();
  await page.getByLabel('Name:').fill('New subcategory 1');
  await page.getByLabel('Category:').selectOption({ label: 'New category 1' });
  await page.getByRole('button', { name: 'Save' }).click();
  await page.getByRole('button', { name: 'New category 1' }).click();
  await page.getByRole('button', { name: 'Delete category' }).click();
});

