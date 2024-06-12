"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cambioContrasena = exports.olvidoContrasena = exports.renewToken = exports.login = void 0;
//1.Solicitar los datos Email y contraseña
//2.Descriptar la contraseña
//3. Generar el token
//4.Login exitoso
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const usuario_model_1 = __importDefault(require("../models/usuario.model"));
const jwt_1 = __importDefault(require("../helpers/jwt"));
const email_1 = __importDefault(require("../helpers/email"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        //verificar el email
        const usuario = yield usuario_model_1.default.findOne({ email: email });
        if (!usuario) {
            return res.status(401).json({
                ok: false,
                msg: "Las credenciales no son validas",
            });
        }
        //verificar el password
        const validarPassword = bcryptjs_1.default.compareSync(password, usuario.password);
        if (!password) {
            return res.status(401).json({
                ok: false,
                msg: "Las credenciales no son validas",
            });
        }
        //generar Token
        const token = yield (0, jwt_1.default)(usuario._id, usuario.email);
        res.status(200).json({
            ok: false,
            usuario,
            token,
        });
    }
    catch (error) {
        res.status(400).json({
            ok: false,
            error,
            msg: "Hable con el administrador",
        });
    }
});
exports.login = login;
const renewToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req._id;
    try {
        if (typeof id === "undefined") {
            throw new Error("No existe un id");
        }
        const usuario = yield usuario_model_1.default.findById(id);
        // Generar el Token
        const token = yield (0, jwt_1.default)(id.toString());
        res.json({
            ok: true,
            token,
            usuario,
        });
    }
    catch (error) {
        console.error(error);
        res.status(401).json({
            ok: false,
            error,
            msg: "Hable con el administrador",
        });
    }
});
exports.renewToken = renewToken;
const olvidoContrasena = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, numeroDocumento } = req.body;
    try {
        const existeUsuario = yield usuario_model_1.default.findOne({
            email,
            numeroDocumento,
        });
        if (!existeUsuario) {
            resp.status(400).json({
                ok: false,
                msg: "Los datos no coinciden",
            });
        }
        const id = existeUsuario === null || existeUsuario === void 0 ? void 0 : existeUsuario._id;
        if (id) {
            //Generar token que expira en 1 hora
            const token = yield (0, jwt_1.default)(id, email, "1h", process.env.JWT_SECRET_PASS);
            // Guarda el token
            existeUsuario.token = token;
            yield existeUsuario.save();
            const nombre = existeUsuario.nombre;
            const templatePath = path_1.default.join(__dirname, "../templates/olvidoContrasena.html");
            const emailTemplate = fs_1.default.readFileSync(templatePath, "utf8");
            const personalizarEmail = emailTemplate
                .replace("{{name}}", nombre)
                .replace("{{token}}", existeUsuario.token);
            //correo del remitente
            (0, email_1.default)("dmakarthur@gmail.com", "Cambio de contraseña", personalizarEmail);
            resp.status(200).json({
                ok: true,
                msg: "Proceso exitoso",
                usuario: existeUsuario,
                //token,
            });
        }
    }
    catch (error) {
        console.error(error);
        resp.status(400).json({
            ok: false,
            msg: "No se logro validar sus datos",
        });
    }
});
exports.olvidoContrasena = olvidoContrasena;
const cambioContrasena = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req._id;
    const { password } = req.body;
    const tokenPass = req.header("x-token-pass");
    try {
        if (!password || !tokenPass) {
            return res.status(400).json({
                ok: false,
                msg: "Valores invalidos",
            });
        }
        const usuario = yield usuario_model_1.default.findOne({ token: tokenPass });
        if (!usuario) {
            return res.status(400).json({
                ok: false,
                msg: "El token ya fue utilizado",
            });
        }
        const newPassword = bcryptjs_1.default.hashSync(password, 10);
        // const actualizarPassword = await UsuarioModel.findByIdAndUpdate({
        //   _id: id,
        //   password: newPassword,
        // });
        const actualizarPassword = yield usuario_model_1.default.findByIdAndUpdate(id, {
            password: newPassword,
            token: "",
        }, { new: true });
        if (!actualizarPassword) {
            return res.status(400).json({
                ok: false,
                msg: "Error al actualizar la contraseña",
            });
        }
        return res.status(200).json({
            ok: true,
            msg: "Contraseña actualizada",
            usuario: actualizarPassword,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(400).json({
            ok: false,
            msg: "Error al actualizar la contraseña, hable con el administrador",
        });
    }
});
exports.cambioContrasena = cambioContrasena;
//# sourceMappingURL=auth.controller.js.map