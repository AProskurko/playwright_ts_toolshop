import { Page, Locator } from "@playwright/test";
import { BasePage } from "./basePage.page";

export class HomePage extends BasePage {
    readonly searchInput: Locator;

    constructor(page: Page) {
        super(page)
        this.searchInput = page.locator('[data-test="search-query"]');
    }

    // async getSearchInput(): Promise<Locator> {
    //     return this.searchInput;
    // }
}
