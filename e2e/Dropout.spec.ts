import { test, expect, devices } from '@playwright/test';

test('Dropout adjusts amount of elements visible on the screen based on viewport size', async ({
  page,
}) => {
  await page.goto('/');

  // TODO: Figure out solution for implementational problem with two visible navigations
  const navigationLocator = page.getByTestId('navigation').first();

  console.log(1, await navigationLocator.innerHTML());
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
    ].map(item => expect(navigationLocator.getByText(item)).toBeVisible()),
  );

  await navigationLocator.getByText('More').click();

  await Promise.all(
    ['Articles', 'Contact'].map(item =>
      expect(navigationLocator.getByText(item)).toBeVisible(),
    ),
  );

  await navigationLocator.getByText('Less').click();

  await page.setViewportSize({ height: 1080, width: 1920 });
  await page.goto('/');
  console.log(2, await navigationLocator.innerHTML());

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

  console.log(3, await navigationLocator.innerHTML());
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
