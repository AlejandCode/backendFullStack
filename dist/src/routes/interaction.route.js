"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validate_jwt_1 = require("../middlewares/validate-jwt");
const interaction_controller_1 = require("../controllers/interaction.controller");
const express_validator_1 = require("express-validator");
const router = (0, express_1.Router)();
router.post("/", validate_jwt_1.validateJWT, [(0, express_validator_1.check)("descripcion", "La descripcion es obligatoria").not().isEmpty()], interaction_controller_1.crearInteraction);
exports.default = router;
//# sourceMappingURL=interaction.route.js.map