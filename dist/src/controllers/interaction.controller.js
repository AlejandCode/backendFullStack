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
Object.defineProperty(exports, "__esModule", { value: true });
exports.crearInteraction = void 0;
const interaction_model_1 = require("../models/interaction.model");
const crearInteraction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req._id;
    const body = req.body;
    const { descripcion, cliente } = body;
    try {
        const interaction = new interaction_model_1.InteraccionModel({
            usuario: id,
            descripcion,
            cliente,
        });
        const newInteraccion = yield interaction.save();
        res.status(200).json({
            ok: true,
            msg: "Interaccion creada",
            interaction: newInteraccion,
        });
    }
    catch (error) {
        console.error(error);
        res.status(400).json({
            ok: false,
            error,
            msg: "Error al crear la interaccion, comuniquese con el administrador",
        });
    }
});
exports.crearInteraction = crearInteraction;
//# sourceMappingURL=interaction.controller.js.map