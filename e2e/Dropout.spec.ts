import { test, expect, devices } from '@playwright/test';

test('Dropout adjusts amount of elements visible on the screen based on viewport size', async ({
  page,
}) => {
  await page.setViewportSize(devices['iPad (gen 6)'].viewport);
  await page.goto('/');
  // TODO: Fix the issue with initial load of more button even though it's not required in 980 width
  await page.goto('/');

  // TODO: Figure out solution for implementational problem with two visible navigations
  const navigationLocator = page.getByTestId('navigation').first();

  await Promise.all(
    ['Home', 'About', 'History', 'Career', 'Blog', 'Help', 'FAQ'].map(item =>
      expect(navigationLocator.getByText(item)).toBeVisible(),
    ),
  );

  await navigationLocator.getByText('More').click();

  await Promise.all(
    ['Products', 'Service', 'Articles', 'Contact'].map(item =>
      expect(navigationLocator.getByText(item)).toBeVisible(),
    ),
  );

  await navigationLocator.getByText('Less').click();

  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.goto('/');

  await Promise.all(
    [
      'Home',
      'About',
      'History',
      'Career',
      'Blog',
      'Help',
      'FAQ',
      'Products',
      'Service',
      'Articles',
      'Contact',
    ].map(item => expect(navigationLocator.getByText(item)).toBeVisible()),
  );

  await expect(navigationLocator.getByText('More')).not.toBeVisible();

  await page.setViewportSize(devices['Pixel 5'].viewport);
  await page.goto('/');

  await Promise.all(
    ['Home', 'About'].map(item =>
      expect(navigationLocator.getByText(item)).toBeVisible(),
    ),
  );

  await navigationLocator.getByText('More').click();

  await Promise.all(
    [
      'History',
      'Career',
      'Blog',
      'Help',
      'FAQ',
      'Products',
      'Service',
      'Articles',
      'Contact',
    ].map(item => expect(navigationLocator.getByText(item)).toBeVisible()),
  );
});
