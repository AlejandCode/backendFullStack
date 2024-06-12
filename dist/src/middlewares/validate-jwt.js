"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateJWTPass = exports.validateJWT = void 0;
const jwt = require("jsonwebtoken");
const validateJWT = (req, res, next) => {
    const token = req.header("x-token");
    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: "No hay token en la peticion",
        });
    }
    try {
        //Firma//
        const { _id } = jwt.verify(token, process.env.JWTSECRET);
        req._id = _id;
        next();
    }
    catch (error) {
        return res.status(401).json({
            ok: false,
            msg: "Token invalido",
        });
    }
};
exports.validateJWT = validateJWT;
const validateJWTPass = (req, res, next) => {
    const token = req.header("x-token-pass"); //Valifar el token
    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: "No hay token en la peticion Pass",
        });
    }
    try {
        const { _id } = jwt.verify(token, process.env.JWT_SECRET_PASS);
        req._id = _id;
        next();
    }
    catch (error) {
        return res.status(401).json({
            ok: false,
            msg: "Token invalido Pass",
        });
    }
};
exports.validateJWTPass = validateJWTPass;
//# sourceMappingURL=validate-jwt.js.map