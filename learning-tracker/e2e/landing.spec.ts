import { test, expect } from '@playwright/test';

test.describe('Landing Page', () => {
  test('should display the landing page correctly', async ({ page }) => {
    await page.goto('/');

    // Check for main heading
    await expect(
      page.getByRole('heading', { name: /learning tracker/i })
    ).toBeVisible();

    // Check for get started button
    const getStartedButton = page.getByRole('link', {
      name: /get started/i,
    });
    await expect(getStartedButton).toBeVisible();

    // Click get started and navigate to register
    await getStartedButton.click();
    await expect(page).toHaveURL('/register');
  });

  test('should have retro visual elements', async ({ page }) => {
    await page.goto('/');

    // Check for dark background
    const body = page.locator('body');
    const bgColor = await body.evaluate((el) =>
      window.getComputedStyle(el).backgroundColor
    );

    // Should be a dark color (not white)
    expect(bgColor).not.toBe('rgb(255, 255, 255)');
  });
});

