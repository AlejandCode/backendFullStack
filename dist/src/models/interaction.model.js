"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InteraccionModel = void 0;
const mongoose_1 = require("mongoose");
const InteractionSchema = new mongoose_1.Schema({
    descripcion: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        dafault: Date.now(),
    },
    usuario: { type: mongoose_1.Schema.Types.ObjectId, ref: "usuario", required: true },
    cliente: { type: mongoose_1.Schema.Types.ObjectId, ref: "usuario", required: false },
});
exports.InteraccionModel = (0, mongoose_1.model)("interaccion", InteractionSchema);
//# sourceMappingURL=interaction.model.js.map