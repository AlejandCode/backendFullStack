"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ProductoSchema = new mongoose_1.Schema({
    nombre: {
        type: String,
        required: true,
        unique: true,
    },
    sku: {
        type: String,
        required: true,
        unique: true,
    },
    cantidad: { type: Number, required: true },
    precio: { type: Number, required: true },
    distribuidor: { type: Object, required: true },
    opiniones: { type: Object },
    createdAt: { type: Date, default: Date.now() },
    usuario: { type: mongoose_1.Schema.Types.ObjectId, ref: "usuario", required: true },
});
const ProductoModel = (0, mongoose_1.model)("producto", ProductoSchema);
exports.default = ProductoModel;
//# sourceMappingURL=producto.model.js.map