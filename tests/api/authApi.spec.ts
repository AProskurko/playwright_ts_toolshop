import { test, expect } from '@fixtures/base.fixture';
import { IAuthApiTestCase } from '@app-types/testCases.interfaces';
import jsonData from '@data/testCases/api/auth.api.data.json' with { type: 'json' };

const testCases = jsonData as IAuthApiTestCase[]

test.describe("API login tests", () => {
  for (const testCase of testCases){
    test(`${testCase.testTitle}`, {tag: testCase.testId}, async ({ authApi }) => {
      const token = await authApi.fastLogin(testCase.user)
      expect(token).not.toBeNull()
      })
  }
})