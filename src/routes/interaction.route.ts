import { Router } from "express";
import { validateJWT } from "../middlewares/validate-jwt";
import { crearInteraction } from "../controllers/interaction.controller";
import { check } from "express-validator";

const router = Router();
router.post(
  "/",
  validateJWT,
  [check("descripcion", "La descripcion es obligatoria").not().isEmpty()],
  crearInteraction
);

export default router;
