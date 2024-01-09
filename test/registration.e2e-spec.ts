/*import  newTestE2EPage  from '@playwright/test';

describe('Registration', () => {
  it('should register a user', async () => {
    const { page } = await newTestE2EPage();
    await page.goto('/register');

    await page.fill('input[name=name]', 'John Doe');
    await page.fill('input[name=email]', 'john@example.com');
    await page.fill('input[name=password]', 'password');
    await page.click('button[type=submit]');

    const userElement = await page.waitForSelector('.user');
    const userName = await userElement.textContent();

    expect(userName).toBe('John Doe');
  });
});*/
