"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config/config");
const mailer_1 = require("../config/mailer");
const environment = config_1.config[process.env.NODE_ENV || "desarrollo"];
const { email, from } = environment.email;
//correo del q envia-remitente
const sendEmail = (to, subject, html) => {
    mailer_1.transporter.sendMail({
        from: `${from} <${email}>`,
        to,
        subject,
        html,
    }, (error, info) => {
        if (error) {
            console.log("Error al enviar el correo", error);
        }
        else {
            console.log("Correo enviado");
            console.info(info.envelope);
        }
    });
};
exports.default = sendEmail;
//# sourceMappingURL=email.js.map