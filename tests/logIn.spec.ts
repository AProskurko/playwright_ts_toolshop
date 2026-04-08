import { test, expect } from '@fixtures/base.fixture';
import { faker } from '@faker-js/faker';

interface ITestCase {
  testTitle: string;
  testId: string;
  login: string|null;
  password: string|null;
  loginMustPass: boolean;
}

const testCases = (): ITestCase[] => [
  {
    testTitle: "Valid LogIn",
    testId: "@LP-002",
    login: process.env.USER_1_EMAIL ?? (() => {throw new Error('USER_1_EMAIL not set')})(),
    password: process.env.USER_1_PASSWORD ?? (() => {throw new Error('USER_1_PASSWORD not set')})(),
    loginMustPass: true
  },
  {
    testTitle: "Invalid LogIn",
    testId: "@LP-003",
    login: faker.internet.email() as string,
    password: faker.internet.password() as string,
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
        await logInPage.navigate("auth/login");
  
        await logInPage.submitLoginForm(testCase.login, testCase.password)
  
        if(testCase.loginMustPass){
          await logInPage.waitForPageLoad();
          await expect(logInPage.loginFailAlertText).toBeHidden()
          await expect(page).toHaveURL(/\/?(auth)\/?/i)
        } else {
          await expect(page).toHaveURL(/\/?(auth\/login)\/?/i)
          await expect(logInPage.loginFailAlertText).toBeVisible()
        }
      })
    }
})
