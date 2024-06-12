"use strict";
//path /api/v1/producto
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const producto_controller_1 = require("../controllers/producto.controller");
const express_validator_1 = require("express-validator");
const validate_fields_1 = require("../middlewares/validate-fields");
const validate_jwt_1 = require("../middlewares/validate-jwt");
const router = (0, express_1.Router)();
router.post("/", validate_jwt_1.validateJWT, [(0, express_validator_1.check)("nombre", "El nombre del producto es obligatorio").not().isEmpty()], [(0, express_validator_1.check)("sku", "El SKU del producto es obligatorio").not().isEmpty()], [(0, express_validator_1.check)("cantidad", "La cantidad de producto es obligatorio").not().isEmpty().isNumeric()], [(0, express_validator_1.check)("precio", "El precio del producto es obligatorio").not().isEmpty().isNumeric(), validate_fields_1.validatefields], producto_controller_1.crearProducto);
router.get("/", producto_controller_1.getProducto);
router.get("/:id", producto_controller_1.getUnProducto);
router.put("/:id", producto_controller_1.updateProducto);
router.delete("/:id", producto_controller_1.eliminarProducto);
exports.default = router;
//# sourceMappingURL=producto.route.js.map