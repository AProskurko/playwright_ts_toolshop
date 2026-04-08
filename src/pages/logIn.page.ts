import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./basePage.page";

export class LogInPage extends BasePage {
    readonly loginHeadline: Locator;
    readonly googleLoginButton: Locator;
    readonly alternativeLoginLable: Locator
    readonly emailInput: Locator;
    readonly emailText: Locator;
    readonly passwordText: Locator;
    readonly passwordInput: Locator;
    readonly passwordHideButton: Locator;
    readonly loginButton: Locator;
    readonly signInText: Locator;
    readonly signInLink: Locator;
    readonly forgotPasswordLink: Locator;
    readonly loginFailAlert: Locator;
    readonly loginFailAlertText: Locator;




    constructor(page: Page) {
        super(page)
        this.loginHeadline = page.getByRole('heading', { name: 'Login' })
        this.googleLoginButton = page.getByRole('button', { name: 'Sign in with Google' })

        this.alternativeLoginLable = page.getByLabel('Alternative login methods')
        this.emailText = page.getByText(/Email address \*/)
        this.emailInput = page.locator('[data-test="email"]');
        this.passwordText = page.getByText('Password *')
        this.passwordInput = page.locator('[data-test="password"]')
        this.passwordHideButton = page.locator('[data-test="login-form"] button')
        this.loginButton = page.locator('[data-test="login-submit"]')

        this.signInText = page.getByText(/Not yet an account\?/i)
        this.signInLink = page.locator('[data-test="register-link"]')
        this.forgotPasswordLink = page.locator('[data-test="forgot-password-link"]')
        
        this.loginFailAlert = page.locator('[data-test="login-error"]')
        this.loginFailAlertText = this.loginFailAlert.getByText(/Invalid email or password/i)
    }

    async submitLoginForm(email: string|null, pass: string|null): Promise<void> {
        await this.emailInput.waitFor({state: "visible"})
  await this.emailInput.fill(email ?? "");
  await this.passwordInput.waitFor({state: "visible"})
  await this.passwordInput.fill(pass ?? "");
  await this.loginButton.waitFor({state: "visible"})
  await this.loginButton.click();
}

    // async alertInvalidLoginIsVisible(): Promise<void> {

    //         await expect(this.loginFailAlert).toBeVisible()
    //         await expect(this.loginFailAlertText).toBeVisible()
    //     }
    // async alertInvalidLoginIsHidden(): Promise<void> {
    //     await expect(this.loginFailAlert).toBeHidden()
    //     await expect(this.loginFailAlertText).toBeHidden()
    // }
}