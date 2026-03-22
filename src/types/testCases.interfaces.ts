import { TestUsers } from "./testUsersRoles.types";

export interface IAuthApiTestCase {
  testTitle: string;
  testId: string;
  user: TestUsers
}