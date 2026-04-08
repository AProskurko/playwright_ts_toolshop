import { test, expect } from '@fixtures/base.fixture';
import { IAuthApiTestCase } from '@app-types/testCases.interfaces';

const testCases: IAuthApiTestCase[] = [
  {
    "testTitle": "Login as admin",
    "testId": "@API-001",
    "user": "admin"
  },
  // TODO: fix non user1
  {
    "testTitle": "Login as user1",
    "testId": "@API-002",
    "user": "user1"
  },
  {
    "testTitle": "Login as user2",
    "testId": "@API-003",
    "user": "user2"
  },
  {
    "testTitle": "Login as user3",
    "testId": "@API-004",
    "user": "user3"
  },
  {
    "testTitle": "Login as new user",
    "testId": "@API-005",
    "user": "newUser"
  }
]

test.describe("API login tests", () => {

  for (const testCase of testCases){
    test(`${testCase.testTitle}`, {tag: testCase.testId}, async ({ authApi }) => {
      const token = await authApi.fastLogin(testCase.user)
      expect(token).not.toBeNull()
      })
  }
})