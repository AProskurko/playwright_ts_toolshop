import { cleanEnv, str, url, email } from 'envalid';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.test') });

export const env = cleanEnv(process.env, {
  BASE_URL: url({ default: 'https://practicesoftwaretesting.com' }),
  API_URL: url({ desc: 'The base URL for the backend API' }),

  ADMIN_USER_EMAIL: email(),
  ADMIN_USER_PASSWORD: str(),

  USER_1_EMAIL: email(),
  USER_1_PASSWORD: str(),

  USER_2_EMAIL: email(),
  USER_2_PASSWORD: str(),

  USER_3_EMAIL: email(),
  USER_3_PASSWORD: str(),

  CI: str({ choices: ['true', 'false'], default: 'false' }),
});