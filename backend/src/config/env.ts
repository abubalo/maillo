import { cleanEnv, num, str } from "envalid";
import {config} from "dotenv"

config();

export const env = cleanEnv(process.env, {
  PORT: str(),
  JWT_SECRET: str(),
  MONGODB_URL: str(),
  SMPT_HOST: str(),
  SMPT_PORT: num(),
  SMPT_SERVICE: str(),
  SMTP_SENDER_ADDRESS: str(),
  SMTP_SENDER_PASSWORD: str(),
  MAX_POOL_SIZE: num(),
  MIN_POOL_SIZE: num(),
  AQUIRED_TIMEOUT: num(),
  IDLE_TIMEOUT: num(),
  SESSION_MAX_AGE: num(),
});
