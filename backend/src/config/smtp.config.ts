import nodemailer from "nodemailer";

export const createTransporter = (username: string, password: string ) => {
  return nodemailer.createTransport({
    host: "mail.maillo.dev",
    port: 25,
    secure: false,
    service: "maillo",
    auth: {
      user: username,
      pass: password
    },
    tls: {
      rejectUnauthorized: true,
    },
  });
};
