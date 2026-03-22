import { test, expect } from '@fixtures/base.fixture';

test.describe("Home Page", () => {
  test("Metadata check", async ({ page, homePage }) => {
    await homePage.navigate();
  
    await expect(page).toHaveTitle(/toolshop/i);
    
    await expect(homePage.searchInput).toBeVisible();
  
  });
  
  test("Navigation Bar UI elements check", async ({ homePage }) => {
    await homePage.navigate();
  
    await Promise.all([
      expect(homePage.navigationBar.label).toBeEnabled(),
      expect(homePage.navigationBar.homeButton).toBeEnabled(),
      expect(homePage.navigationBar.categoriesButton).toBeEnabled(),
      expect(homePage.navigationBar.contactButton).toBeEnabled(),
      expect(homePage.navigationBar.signInButton).toBeEnabled(),
      expect(homePage.navigationBar.languageSelector).toBeEnabled(),
    ])
  })
})
