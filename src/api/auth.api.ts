import { faker } from "@faker-js/faker/locale/en";
import { APIRequestContext, APIResponse, expect } from "@playwright/test";
import { generateComplexPassword } from "@utils/faker/shuffle";
import { TestUsers } from "src/types";

interface INewUserPayload {
  first_name: string;
  last_name: string;
  dob: string;
  phone: string;
  email: string;
  password: string;
  address: {
    street: string;
    city: string;
    state: string;
    country: string;
    postal_code: string;
  };
}

const apiUrl = process.env.API_URL as string
if (!apiUrl) {
  throw new Error("CRITICAL: API_URL is missing!");
}

export class AuthApi {
  constructor(private readonly request: APIRequestContext) {}

    async registerUser(): Promise <INewUserPayload> {
      const dateIn2000 = faker.date.between({ 
            from: '2000-01-01T00:00:00.000Z', 
            to: '2000-12-31T23:59:59.000Z' 
        });
      const payload = {
          first_name: faker.person.firstName(),
          last_name: faker.person.lastName(),
          dob: dateIn2000.toISOString().split('T')[0],
          phone: faker.helpers.replaceSymbols('##########'),
          email: faker.internet.email(),
          password: generateComplexPassword(),
          address: {
            street: faker.location.streetAddress(),
            city: faker.location.city(),
            state: faker.location.state(),
            country: "US",
            postal_code: faker.location.zipCode()
          }
        }

      const response = await this.request.post(`${apiUrl}/users/register`, {
        data: payload
      })
      if (!response.ok()) {
        const errorText = await response.text();
        throw new Error(`Failed to register user. Status: ${response.status()}. \nServer said: ${errorText}`);
      }

      return payload
    }

    async loginUser(email: string, password: string): Promise<string> {
      const response = await this.request.post(`${apiUrl}/users/login`, {
        data: {
          email: email,
          password: password
        }
      })

      if (!response.ok()) {
        const errorText = await response.text();
        throw new Error(`Failed to login user. Status: ${response.status()}. \nServer said: ${errorText}`);
      }

      const body = await response.json()
      return body.token as string
    }

    async fastLogin(user: TestUsers){
      let email: string| undefined;
      let password: string|undefined;
      switch (user) {
        case "admin":
          email = process.env.ADMIN_USER_EMAIL
          password = process.env.ADMIN_USER_PASSWORD
          break;
        case "user1":
          email = process.env.USER_1_EMAIL
          password = process.env.USER_1_PASSWORD
          break;
        case "user2":
          email = process.env.USER_2_EMAIL
          password = process.env.USER_2_PASSWORD
          break;
        case "user3":
          email = process.env.USER_3_EMAIL
          password = process.env.USER_3_PASSWORD
          break;
        case "newUser":
          ({email, password} = await this.registerUser())
          break;
        default:
          throw new Error(`Unknown user type: ${user}`)

      }

      if (!email || !password){
        throw new Error(`Failed to login user. Email or password is not defined for user: ${user}`)
      }

      return await this.loginUser(email, password)
    }
}