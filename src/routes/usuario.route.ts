import { Router } from "express";
import {
  crearUsuario,
  eliminarUsuario,
  getUnUsuario,
  getUsuario,
  updateUsuario,
} from "../controllers/usuario.controller";
import { check } from "express-validator";
import { validatefields } from "../middlewares/validate-fields";
import { validateJWT } from "../middlewares/validate-jwt";

//path /api/v1/usuario

const router = Router();
router.post(
  "/",
  [check("nombre", "El nombre es obligatorio").not().isEmpty(), validatefields],
  [check("numeroDocumento", "El numero de documento es obligatorio").not().isEmpty(), validatefields],
  [check("email", "El correo electronico es obligatorio").not().isEmpty().isEmail(), validatefields],
   crearUsuario
);
router.get("/", validateJWT, getUsuario);
router.get("/:id", validateJWT, getUnUsuario);
router.put("/:id", validateJWT, updateUsuario);
router.delete("/:id", validateJWT, eliminarUsuario);

export default router;
