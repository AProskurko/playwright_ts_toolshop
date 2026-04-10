import { test, expect } from '@fixtures/base.fixture';
import { faker } from '@faker-js/faker';
import { env } from '../src/config/env';

// interface ITestCase {
//   testTitle: string;
//   testId: string;
//   login: string|null;
//   password: string|null;
//   loginMustPass: boolean;
// }

// const testCases = (): ITestCase[] => [
//   {
//     testTitle: "Valid LogIn",
//     testId: "@LP-002",
//     login: env.USER_1_EMAIL ?? (() => {throw new Error('USER_1_EMAIL not set')})(),
//     password: env.USER_1_PASSWORD ?? (() => {throw new Error('USER_1_PASSWORD not set')})(),
//     loginMustPass: true
//   },
//   {
//     testTitle: "Invalid LogIn",
//     testId: "@LP-003",
//     login: faker.internet.email() as string,
//     password: faker.internet.password() as string,
//     loginMustPass: false
//   }
// ]

test.describe("Login Page", () => {

  test("UI Elements Check", {tag: "@SP-001"}, async ({ page, signInPage }) => {
    await signInPage.navigate("auth/register");
  
      await expect(page).toHaveURL(/\/?(auth\/register)\/?/i);
      await expect.soft(signInPage.signInHeadline).toBeVisible();
      await expect.soft(signInPage.firstNameInput).toBeEnabled();
      await expect.soft(signInPage.lastNameInput).toBeEnabled();
      await expect.soft(signInPage.dateOfBirthInput).toBeEnabled();
      await expect.soft(signInPage.streetInput).toBeEnabled();
      await expect.soft(signInPage.postalCodeInput).toBeEnabled();
      await expect.soft(signInPage.cityInput).toBeEnabled();
      await expect.soft(signInPage.stateInput).toBeEnabled();
      await expect.soft(signInPage.countrySelect).toBeEnabled();
      await expect.soft(signInPage.phoneNumberInput).toBeEnabled();
      await expect.soft(signInPage.emailInput).toBeEnabled();
      await expect.soft(signInPage.passwordInput).toBeEnabled();
      await expect.soft(signInPage.passwordHideButton).toBeEnabled();
      await expect.soft(signInPage.registerSubmitButton).toBeEnabled();
  });
  
  test.skip("Register New User and Login", {tag: "@SP-002"}, async ({ page, signInPage, logInPage }) => {
    await signInPage.navigate("auth/register");
    await expect(page).toHaveURL(/\/?(auth\/register)\/?/i);
  
    const {email: newUserEmail, password: newUserPassword} = await signInPage.fillRegistrationForm()
    await signInPage.submitRegistrationForm();

    await expect(page).toHaveURL(/\/?(auth\/login)\/?/i)

    await logInPage.submitLoginForm(newUserEmail, newUserPassword)
    await expect(logInPage.loginFailAlertText).toBeHidden()
    await expect(page).toHaveURL(/\/?(account)\/?/i)
  });
})
