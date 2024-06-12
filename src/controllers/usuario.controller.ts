import { Request, Response } from "express";
import UsuarioModel from "../models/usuario.model";
import bcrypt from "bcryptjs"

//controlador para crear un usuario en la bd por medio de la api
export const crearUsuario = async (req: Request, res: Response) => {
  const { body } = req;
  const { email, password } = body;

  try {
    const existeEmail = await UsuarioModel.findOne({ email: email });

    if (existeEmail) {
      return res.status(409).json({
        ok: false,
        msg: `Ya existe el email: ${email}`,
      });
    }

    const newUsuario = new UsuarioModel({
      ...body,
    });
//Encriptar contraseñas
    const salt = bcrypt.genSaltSync(10);
    newUsuario.password = bcrypt.hashSync(password, salt);

    const usuarioCreado = await newUsuario.save(); //guarde o insert todo lo que esta en la instacia de newUsuario guasdelo en mi mongodb

    res.status(200).json({
      ok: true,
      msg: "Usuario creado satisfactoriamente",
      usuario: usuarioCreado,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      ok: false,
      error,
      msg: "Error al crear el usuario, comuniquese con el administrador",
    });
  }
};
//controlador para llamar a todos los usuarios q estan en la tabla usuarios en la bdnpm install bcryptjs
export const getUsuario = async (req: Request, res: Response) => {
  try {
    const usuarios = await UsuarioModel.find();

    res.json({
      ok: true,
      usuarios,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: "Error al consultar los usuarios",
    });
  }
};
//controlador para llamar a un solo usuario q este en la bd
export const getUnUsuario = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const usuarios = await UsuarioModel.findById({ _id: id });

    res.json({
      ok: true,
      usuarios,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: "Error al consultar los usuarios",
    });
  }
};
//controlador para actualizar un usuario
export const updateUsuario = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const { body } = req;
    //const body = req.body; es lo mismo que la libnea anterior

    const usuarioActualizado = await UsuarioModel.findByIdAndUpdate(id, body, {
      new: true,
    });

    res.json({
      ok: true,
      msg: "Usuario Actualizado",
      usuario: usuarioActualizado,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      ok: false,
      msg: "Error al actualizar el usuario",
    });
  }
};

//controlador para eliminar
export const eliminarUsuario = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const usuarioEliminado = await UsuarioModel.findByIdAndDelete({ _id: id });

    res.json({
      ok: true,
      msg: "Usuario eliminado",
      usuario: usuarioEliminado,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      ok: false,
      msg: "Error al eliminar el usuario",
    });
  }
};
