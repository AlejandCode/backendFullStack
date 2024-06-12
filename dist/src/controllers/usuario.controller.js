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
exports.eliminarUsuario = exports.updateUsuario = exports.getUnUsuario = exports.getUsuario = exports.crearUsuario = void 0;
const usuario_model_1 = __importDefault(require("../models/usuario.model"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
//controlador para crear un usuario en la bd por medio de la api
const crearUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { email, password } = body;
    try {
        const existeEmail = yield usuario_model_1.default.findOne({ email: email });
        if (existeEmail) {
            return res.status(409).json({
                ok: false,
                msg: `Ya existe el email: ${email}`,
            });
        }
        const newUsuario = new usuario_model_1.default(Object.assign({}, body));
        //Encriptar contraseñas
        const salt = bcryptjs_1.default.genSaltSync(10);
        newUsuario.password = bcryptjs_1.default.hashSync(password, salt);
        const usuarioCreado = yield newUsuario.save(); //guarde o insert todo lo que esta en la instacia de newUsuario guasdelo en mi mongodb
        res.status(200).json({
            ok: true,
            msg: "Usuario creado satisfactoriamente",
            usuario: usuarioCreado,
        });
    }
    catch (error) {
        console.error(error);
        res.status(400).json({
            ok: false,
            error,
            msg: "Error al crear el usuario, comuniquese con el administrador",
        });
    }
});
exports.crearUsuario = crearUsuario;
//controlador para llamar a todos los usuarios q estan en la tabla usuarios en la bdnpm install bcryptjs
const getUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usuarios = yield usuario_model_1.default.find();
        res.json({
            ok: true,
            usuarios,
        });
    }
    catch (error) {
        res.status(400).json({
            ok: false,
            msg: "Error al consultar los usuarios",
        });
    }
});
exports.getUsuario = getUsuario;
//controlador para llamar a un solo usuario q este en la bd
const getUnUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const usuarios = yield usuario_model_1.default.findById({ _id: id });
        res.json({
            ok: true,
            usuarios,
        });
    }
    catch (error) {
        res.status(400).json({
            ok: false,
            msg: "Error al consultar los usuarios",
        });
    }
});
exports.getUnUsuario = getUnUsuario;
//controlador para actualizar un usuario
const updateUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const { body } = req;
        //const body = req.body; es lo mismo que la libnea anterior
        const usuarioActualizado = yield usuario_model_1.default.findByIdAndUpdate(id, body, {
            new: true,
        });
        res.json({
            ok: true,
            msg: "Usuario Actualizado",
            usuario: usuarioActualizado,
        });
    }
    catch (error) {
        console.error(error);
        res.status(400).json({
            ok: false,
            msg: "Error al actualizar el usuario",
        });
    }
});
exports.updateUsuario = updateUsuario;
//controlador para eliminar
const eliminarUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const usuarioEliminado = yield usuario_model_1.default.findByIdAndDelete({ _id: id });
        res.json({
            ok: true,
            msg: "Usuario eliminado",
            usuario: usuarioEliminado,
        });
    }
    catch (error) {
        console.error(error);
        res.status(400).json({
            ok: false,
            msg: "Error al eliminar el usuario",
        });
    }
});
exports.eliminarUsuario = eliminarUsuario;
//# sourceMappingURL=usuario.controller.js.map