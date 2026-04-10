import { test, expect } from '@fixtures/base.fixture';
import { faker } from '@faker-js/faker';
import { env } from '../src/config/env';

interface ITestCase {
  testTitle: string;
  testId: string;
  getCredentials: () => { email: string | null; password: string | null };
  loginMustPass: boolean;
}

const testCases = (): ITestCase[] => [
  {
    testTitle: "Valid LogIn",
    testId: "@LP-002",
    getCredentials: () => ({
      email: env.USER_1_EMAIL,
      password: env.USER_1_PASSWORD
    }),
    loginMustPass: true
  },
  {
    testTitle: "Invalid LogIn",
    testId: "@LP-003",
    getCredentials: () => ({
      email: faker.internet.email(),
      password: faker.internet.password()
    }),
    loginMustPass: false
  }
]

test.describe("Login Page", () => {

  test("UI Elements Check", {tag: "@LP-001"}, async ({ page, logInPage }) => {
    await logInPage.navigate("auth/login");
  
      await expect(page).toHaveURL(/\/?(auth\/login)\/?/i);
      await expect.soft(logInPage.loginHeadline).toBeVisible();
      await expect.soft(logInPage.googleLoginButton).toBeEnabled();
      await expect.soft(logInPage.alternativeLoginLable).toBeEnabled();
      await expect.soft(logInPage.emailText).toBeVisible();
      await expect.soft(logInPage.emailInput).toBeEnabled();
      await expect.soft(logInPage.passwordText).toBeVisible();
      await expect.soft(logInPage.passwordInput).toBeEnabled();
      await expect.soft(logInPage.passwordHideButton).toBeEnabled();
      await expect.soft(logInPage.loginButton).toBeEnabled();
      await expect.soft(logInPage.signInText).toBeVisible();
      await expect.soft(logInPage.signInLink).toBeEnabled();
      await expect.soft(logInPage.forgotPasswordLink).toBeEnabled();
  });
  
  for (const testCase of testCases()){
      test(`${testCase.testTitle}`, {tag: testCase.testId}, async ({ page, logInPage }) => {
        const { email, password} = testCase.getCredentials()

        await logInPage.navigate("auth/login");
  
        await logInPage.submitLoginForm(email, password)
  
        if(testCase.loginMustPass){
          await logInPage.waitForPageLoad();
          await expect(logInPage.loginFailAlertText).toBeHidden()
          await expect(page).toHaveURL(/\/?(account)\/?/i)
        } else {
          await expect(page).toHaveURL(/\/?(auth\/login)\/?/i)
          await expect(logInPage.loginFailAlertText).toBeVisible()
        }
      })
    }
})
