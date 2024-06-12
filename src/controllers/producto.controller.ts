import { path } from "path";
import { Request, Response } from "express";
import ProductoModel from "../models/producto.model";
import { CustomRequest } from "../middlewares/validate-jwt";

//controlador para crear un usuario en la bd por medio de la api
export const crearProducto = async (req: CustomRequest, res: Response) => {
  const { body } = req;
  const id = req._id;
  try {
    const newProducto = new ProductoModel({ usuario: id, ...body });

    const productoCreado = await newProducto.save(); //guarde o insert todo lo que esta en la instacia de newUsuario guasdelo en mi mongodb

    res.status(200).json({
      ok: true,
      msg: "Producto creado satisfactoriament",
      producto: productoCreado,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      ok: false,
      error,
      msg: "Error al crear el producto, comuniquese con el administrador",
    });
  }
};
//controlador para llamar a todos los productos q estan en la tabla usuarios en la bd
export const getProducto = async (req: Request, res: Response) => {
  try {
    const productos = await ProductoModel.find().populate({
      path: "usuario",
      select: "nombre email numeroCelular",
    });

    res.json({
      ok: true,
      productos,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: "Error al consultar los productos",
    });
  }
};
//controlador para llamar a un solo producto q este en la bd
export const getUnProducto = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const producto = await ProductoModel.findById({ _id: id });

    res.json({
      ok: true,
      producto,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: "Error al consultar el producto",
    });
  }
};
//controlador para actualizar un producto
export const updateProducto = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const { body } = req;
    //const body = req.body; es lo mismo que la libnea anterior

    const productoActualizado = await ProductoModel.findByIdAndUpdate(
      id,
      body,
      { new: true }
    );

    res.json({
      ok: true,
      msg: "Producto Actualizado",
      producto: productoActualizado,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      ok: false,
      msg: "Error al actualizar el producto",
    });
  }
};

//controlador para eliminar
export const eliminarProducto = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const productoEliminado = await ProductoModel.findByIdAndDelete({
      _id: id,
    });

    res.json({
      ok: true,
      msg: "Producto eliminado",
      producto: productoEliminado,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      ok: false,
      msg: "Error al eliminar el producto",
    });
  }
};
