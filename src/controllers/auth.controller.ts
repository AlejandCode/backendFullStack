import { response } from "express";
//1.Solicitar los datos Email y contraseña
//2.Descriptar la contraseña
//3. Generar el token
//4.Login exitoso
import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import UsuarioModel from "../models/usuario.model";
import generateJWT from "../helpers/jwt";
import { CustomRequest } from "../middlewares/validate-jwt";
import sendEmail from "../helpers/email";
import path from "path";
import fs from "fs";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    //verificar el email
    const usuario = await UsuarioModel.findOne({ email: email });

    if (!usuario) {
      return res.status(401).json({
        ok: false,
        msg: "Las credenciales no son validas",
      });
    }
    //verificar el password
    const validarPassword = bcrypt.compareSync(password, usuario.password);

    if (!password) {
      return res.status(401).json({
        ok: false,
        msg: "Las credenciales no son validas",
      });
    }
    //generar Token
    const token = await generateJWT(usuario._id, usuario.email);

    res.status(200).json({
      ok: false,
      usuario,
      token,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      error,
      msg: "Hable con el administrador",
    });
  }
};

export const renewToken = async (req: CustomRequest, res: Response) => {
  const id = req._id;

  try {
    if (typeof id === "undefined") {
      throw new Error("No existe un id");
    }

    const usuario = await UsuarioModel.findById(id);

    // Generar el Token
    const token = await generateJWT(id.toString());

    res.json({
      ok: true,
      token,
      usuario,
    });
  } catch (error) {
    console.error(error);
    res.status(401).json({
      ok: false,
      error,
      msg: "Hable con el administrador",
    });
  }
};

export const olvidoContrasena = async (req: Request, resp: Response) => {
  const { email, numeroDocumento } = req.body;
  try {
    const existeUsuario = await UsuarioModel.findOne({
      email,
      numeroDocumento,
    });

    if (!existeUsuario) {
      resp.status(400).json({
        ok: false,
        msg: "Los datos no coinciden",
      });
    }
    const id = existeUsuario?._id;
    if (id) {
      //Generar token que expira en 1 hora
      const token = await generateJWT(
        id,
        email,
        "1h",
        process.env.JWT_SECRET_PASS
      );
      // Guarda el token
      existeUsuario.token = token;
      await existeUsuario.save();

      const nombre = existeUsuario.nombre;
      const templatePath = path.join(
        __dirname,
        "../templates/olvidoContrasena.html"
      );

      const emailTemplate = fs.readFileSync(templatePath, "utf8");

      const personalizarEmail = emailTemplate
        .replace("{{name}}", nombre)
        .replace("{{token}}", existeUsuario.token);

      //correo del remitente
      sendEmail(
        "dmakarthur@gmail.com",
        "Cambio de contraseña",
        personalizarEmail
      );

      resp.status(200).json({
        ok: true,
        msg: "Proceso exitoso",
        usuario: existeUsuario,
        //token,
      });
    }
  } catch (error) {
    console.error(error);
    resp.status(400).json({
      ok: false,
      msg: "No se logro validar sus datos",
    });
  }
};

export const cambioContrasena = async (req: CustomRequest, res: Response) => {
  const id = req._id;
  const { password } = req.body;
  const tokenPass = req.header("x-token-pass") as string;

  try {
    if (!password || !tokenPass) {
      return res.status(400).json({
        ok: false,
        msg: "Valores invalidos",
      });
    }

    const usuario = await UsuarioModel.findOne({ token: tokenPass });
    if (!usuario) {
      return res.status(400).json({
        ok: false,
        msg: "El token ya fue utilizado",
      });
    }

    const newPassword = bcrypt.hashSync(password, 10);

    // const actualizarPassword = await UsuarioModel.findByIdAndUpdate({
    //   _id: id,
    //   password: newPassword,
    // });

    const actualizarPassword = await UsuarioModel.findByIdAndUpdate(
      id,
      {
        password: newPassword,
        token: "",
      },
      { new: true }
    );

    if (!actualizarPassword) {
      return res.status(400).json({
        ok: false,
        msg: "Error al actualizar la contraseña",
      });
    }
    return res.status(200).json({
      ok: true,
      msg: "Contraseña actualizada",
      usuario: actualizarPassword,
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      ok: false,
      msg: "Error al actualizar la contraseña, hable con el administrador",
    });
  }
};
