"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken"); //Requiero q esta funsion tenga esta libreria
const generateJWT = (_id, email = "", expiresIn = "12H", jwtSecret = process.env.JWTSECRET) => {
    return new Promise((resolve, reject) => {
        const payload = { _id, email };
        jwt.sign(payload, jwtSecret, {
            expiresIn: expiresIn,
        }, (error, token) => {
            if (error) {
                console.log(error);
                reject("No se puede generar el token");
            }
            else
                resolve(token);
        });
    });
};
exports.default = generateJWT;
//# sourceMappingURL=jwt.js.map