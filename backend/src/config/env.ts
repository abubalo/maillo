import { cleanEnv, num, str } from "envalid";

export const env = cleanEnv(process.env, {
  PORT: str(),
  DEVECOT_USER: str(),
  DEVECOT_PASSWORD: str(),
  MONGODB_URL: str(),
  SMPT_HOST: str(),
  SMPT_PORT: num(),
  SMPT_SERVICE: str(),
  SMTP_SENDER_ADDRESS: str(),
  SMTP_SENDER_PASSWORD: str(),
});
