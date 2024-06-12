import nodemailer from "nodemailer";
import { config } from "./config";

const environment = config[process.env.NODE_ENV || "desarrollo"];
const { host, port, email, password } = environment.email;

console.log("entorno desarrollo", host, port, email, password, environment);

export const transporter = nodemailer.createTransport({
  service: "hotmail",
  host: host,
  port: port,
  secure: false,
  auth: {
    user: email,
    pass: password,
  },
  tls: {
    ciphers: "SSLv3",
    rejectUnauthorized: false,
  },
});

transporter
  .verify()
  .then(() => {
    console.log("Puede enviar correos electronicos");
  })
  .catch((error) => {
    console.log("Error al enviar correos", error);
  });
