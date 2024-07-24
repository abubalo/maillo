import { env } from "./env";

export const dovecotConfig = {
    host: "localhost",
    secure: true,
    port: 993,
    auth: {
        user: env.DEVECOT_USER,
        password: env.DEVECOT_PASSWORD,
    }
}