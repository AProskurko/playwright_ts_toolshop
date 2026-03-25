import { Page } from "@playwright/test";
import { NavbarComponent } from "../components/navigationBar.component";

export abstract class BasePage {
  public readonly navigationBar: NavbarComponent;

  constructor(protected readonly page: Page) {
    this.navigationBar = new NavbarComponent(page);
  }

  async navigate(
    path: string = "",
    waitFor:
      | "domcontentloaded"
      | "load"
      | "networkidle"
      | "commit" = "domcontentloaded",
  ): Promise<void> {
    await this.page.goto(path, { waitUntil: waitFor });
  }

  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState("domcontentloaded");
  }
}
