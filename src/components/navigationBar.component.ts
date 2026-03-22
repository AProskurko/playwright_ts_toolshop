// src/components/NavbarComponent.ts
import { Page, Locator } from "@playwright/test";

export class NavbarComponent {
  readonly label: Locator;
  readonly homeButton: Locator;
  readonly categoriesButton: Locator;
  readonly contactButton: Locator;
  readonly signInButton: Locator;
  readonly languageSelector: Locator;

  constructor(private readonly page: Page) {
    this.label = page.getByRole("link", {
      name: /Practice Software Testing/i,
    });
    this.homeButton = page.locator('[data-test="nav-home"]');
    this.categoriesButton = page.locator('[data-test="nav-categories"]');
    this.contactButton = page.locator('[data-test="nav-contact"]');
    this.signInButton = page.locator('[data-test="nav-sign-in"]');
    this.languageSelector = page.locator('[data-test="language-select"]');
  }
}