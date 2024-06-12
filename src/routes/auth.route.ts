//path /api/v1/login
import { Router } from "express";
import { check } from "express-validator";
import { validatefields } from "../middlewares/validate-fields";
import { cambioContrasena, login, olvidoContrasena, } from "../controllers/auth.controller";
import { validateJWTPass } from "../middlewares/validate-jwt";

const router = Router();
router.post(
  "/",
  [
    check("email", "El email es obligatorio").not().isEmpty().isEmail(),
    check("password", "El password es obligatorio").not().isEmpty(),
    validatefields,
  ],
  login
);

router.post(
  "/olvidocontrasena",
  [
    check("email", "El email es obligatorio").not().isEmpty().isEmail(),
    check("numeroDocumento", "El numero de documento es obligatorio")
      .not()
      .isEmpty(),
    validatefields,
  ],
  olvidoContrasena
);

//TODO implementar el validateJWTPass
router.put(
  "/cambiocontrasena",
  validateJWTPass,
  [
    check("password", "El password es obligatorio").not().isEmpty(),
    validatefields,
  ],
  cambioContrasena
);

export default router;
