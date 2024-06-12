import { Request, Response } from "express";
import { CustomRequest } from "../middlewares/validate-jwt";
import { InteraccionModel } from "../models/interaction.model";

export const crearInteraction = async (req: CustomRequest, res: Response) => {
  const id = req._id;
  const body = req.body;

  const { descripcion, cliente } = body;

  try {
    const interaction = new InteraccionModel({
      usuario: id,
      descripcion,
      cliente,
    });

    const newInteraccion = await interaction.save();

    res.status(200).json({
      ok: true,
      msg: "Interaccion creada",
      interaction: newInteraccion,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      ok: false,
      error,
      msg: "Error al crear la interaccion, comuniquese con el administrador",
    });
  }
};
