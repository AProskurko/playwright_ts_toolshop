import { Page, Locator } from "@playwright/test";
import { BasePage } from "./basePage.page";
import { faker } from '@faker-js/faker';
import { generateComplexPassword } from "@utils/faker/shuffle";

export class SignInPage extends BasePage {
    readonly signInHeadline: Locator;

    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly dateOfBirthInput: Locator;
    readonly streetInput: Locator;
    readonly postalCodeInput: Locator;
    readonly cityInput: Locator;
    readonly stateInput: Locator;
    readonly countrySelect: Locator;
    readonly phoneNumberInput: Locator;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly passwordHideButton: Locator;
    readonly registerSubmitButton: Locator;

    constructor(page: Page) {
        super(page)
        this.signInHeadline = page.getByRole('heading', { name: 'Customer registration' })

        this.firstNameInput = page.locator('[data-test="first-name"]')
        this.lastNameInput = page.locator('[data-test="last-name"]')
        this.dateOfBirthInput = page.locator('[data-test="dob"]')
        this.streetInput = page.locator('[data-test="street"]')
        this.postalCodeInput = page.locator('[data-test="postal_code"]')
        this.cityInput = page.locator('[data-test="city"]')
        this.stateInput = page.locator('[data-test="state"]')
        this.countrySelect = page.locator('[data-test="country"]')
        this.phoneNumberInput = page.locator('[data-test="phone"]')
        this.emailInput = page.locator('[data-test="email"]')
        this.passwordInput = page.locator('[data-test="password"]')
        this.passwordHideButton = page.locator('[data-test="register-form"]').getByRole('button').filter({ hasText: /^$/ })
        this.registerSubmitButton = page.locator('[data-test="register-submit"]')
    }

    async fillRegistrationForm() {
        const email = faker.internet.email()
        const password = generateComplexPassword()
        const dateIn2000 = faker.date.between({ 
            from: '2000-01-01T00:00:00.000Z', 
            to: '2000-12-31T23:59:59.000Z' 
        });

        await this.firstNameInput.fill(faker.person.firstName())
        await this.lastNameInput.fill(faker.person.lastName())
        await this.dateOfBirthInput.fill(dateIn2000.toISOString().split('T')[0])
        await this.streetInput.fill(faker.location.streetAddress())
        await this.postalCodeInput.fill(faker.location.zipCode())
        await this.cityInput.fill(faker.location.city())
        await this.stateInput.fill(faker.location.state())
        await this.countrySelect.selectOption('US');
        await this.phoneNumberInput.fill(faker.helpers.replaceSymbols('##########'))
        await this.emailInput.fill(email)
        await this.passwordInput.fill(password)

        return {email, password}
    }

    async submitRegistrationForm() {
        await this.registerSubmitButton.click()
    }
}