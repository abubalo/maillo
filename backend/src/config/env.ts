import { cleanEnv, str } from "envalid";

export const env = cleanEnv(process.env, {
  PORT: str(),
  DEVECOT_USER: str(),
  DEVECOT_PASSWORD: str(),
  MONGODB_URL: str(),
});