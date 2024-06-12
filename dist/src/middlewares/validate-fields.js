"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatefields = void 0;
const express_validator_1 = require("express-validator");
const validatefields = (req, res, next) => {
    const errores = (0, express_validator_1.validationResult)(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errores: errores.mapped(),
        });
    }
    next();
};
exports.validatefields = validatefields;
//# sourceMappingURL=validate-fields.js.map