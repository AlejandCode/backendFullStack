//path /api/v1/producto

import { Router } from "express";
import {
  crearProducto,
  eliminarProducto,
  getProducto,
  getUnProducto,
  updateProducto,
} from "../controllers/producto.controller";
import { check } from "express-validator";
import { validatefields } from "../middlewares/validate-fields";
import { validateJWT } from "../middlewares/validate-jwt";

const router = Router();
router.post(
  "/",
  validateJWT,
  [check("nombre", "El nombre del producto es obligatorio").not().isEmpty()],
  [check("sku", "El SKU del producto es obligatorio").not().isEmpty()],
  [check("cantidad", "La cantidad de producto es obligatorio").not().isEmpty().isNumeric()],
  [check("precio", "El precio del producto es obligatorio").not().isEmpty().isNumeric(), validatefields],
  crearProducto
);
router.get("/", getProducto);
router.get("/:id", getUnProducto);
router.put("/:id", updateProducto);
router.delete("/:id", eliminarProducto);

export default router;
