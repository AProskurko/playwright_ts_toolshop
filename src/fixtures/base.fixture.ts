import { test as base } from "@playwright/test";
import { HomePage } from "@pages/homePage.page";
import { LogInPage } from "@pages/logIn.page";
import { SignInPage } from "@pages/signIn.page";
import { AuthApi } from "@api/auth.api";

export interface AppFixtures {
    homePage: HomePage;
    logInPage: LogInPage;
    signInPage: SignInPage;
    authApi: AuthApi;
}

export const test = base.extend<AppFixtures>({
    homePage: async ({ page}, use ) => {
        const homePage = new HomePage(page)
        await use(homePage)
    },
    logInPage: async ({ page }, use) => {
        const logInPage = new LogInPage(page)
        await use(logInPage)
    },
    signInPage: async ({ page }, use) => {
        const signInPage = new SignInPage(page)
        await use(signInPage)
    },

    // API fixtures
    authApi: async ({ request }, use) => {
        const authApi = new AuthApi(request)
        await use(authApi)
    }
})

export { expect } from "@playwright/test";