const { test, expect } = require("@playwright/test");
const { email,password } = require("../user");

test("Successful authorization", async ({ page }) => {
  
  await page.goto("https://netology.ru/?modal=sign_in");
  await page.locator('[placeholder="Email"]').fill(email);
  await page.locator('[placeholder="Пароль"]').fill(password);
  await page.click('[data-testid="login-submit-btn"]');
  await expect(page).toHaveURL("https://netology.ru/profile");
  await page.isVisible("text=Мои курсы и профессии");
});

test("UnSuccessful authorization", async ({ page }) => {
 
  await page.goto("https://netology.ru/?modal=sign_in");
  await page.locator('[placeholder="Email"]').fill("email@mail.com");
  await page.locator('[placeholder="Пароль"]').fill("любой");
  await page.click('[data-testid="login-submit-btn"]');
  await expect(page.locator("data-testid=login-error-hint")).toContainText("Вы ввели неправильно логин или пароль");
  test.setTimeout(60000);
});