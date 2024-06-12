"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UsuarioSchema = new mongoose_1.Schema({
    nombre: {
        type: String, required: true, unique: true,
    },
    email: {
        type: String, required: true, unique: true,
    },
    tipoDocumento: { type: String, required: true },
    numeroDocumento: { type: String, required: true, unique: true },
    numeroCelular: { type: Number },
    peso: { type: String },
    fechaNacimiento: { type: Date },
    password: { type: String },
    rol: { type: String, default: "USER" },
    token: { type: String, requir: false },
    creaeAt: { type: Date, default: Date.now() },
});
const UsuarioModel = (0, mongoose_1.model)("usuario", UsuarioSchema);
exports.default = UsuarioModel;
//# sourceMappingURL=usuario.model.js.map