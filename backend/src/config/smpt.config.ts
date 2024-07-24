import nodemailer from "nodemailer";
import { env } from "./env";

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  service: "gmail",
  auth: {
    user: env.SMTP_SENDER_ADDRESS,
    pass: env.SMTP_SENDER_PASSWORD,
  },
});
