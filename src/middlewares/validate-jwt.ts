import { NextFunction, Request, Response } from "express";

const jwt = require("jsonwebtoken");
export interface CustomRequest extends Request {
  _id?: number;
}

export const validateJWT = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: "No hay token en la peticion",
    });
  }
  try {
    //Firma//
    const { _id } = jwt.verify(token, process.env.JWTSECRET);
    req._id = _id;

    next();
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: "Token invalido",
    });
  }
};

export const validateJWTPass = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("x-token-pass"); //Valifar el token

  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: "No hay token en la peticion Pass",
    });
  }

  try {
    const{_id} = jwt.verify(token, process.env.JWT_SECRET_PASS);
    req._id = _id;
    next();
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: "Token invalido Pass",
    });
  }
};
