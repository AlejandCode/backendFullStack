"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.eliminarProducto = exports.updateProducto = exports.getUnProducto = exports.getProducto = exports.crearProducto = void 0;
const producto_model_1 = __importDefault(require("../models/producto.model"));
//controlador para crear un usuario en la bd por medio de la api
const crearProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const id = req._id;
    try {
        const newProducto = new producto_model_1.default(Object.assign({ usuario: id }, body));
        const productoCreado = yield newProducto.save(); //guarde o insert todo lo que esta en la instacia de newUsuario guasdelo en mi mongodb
        res.status(200).json({
            ok: true,
            msg: "Producto creado satisfactoriament",
            producto: productoCreado,
        });
    }
    catch (error) {
        console.error(error);
        res.status(400).json({
            ok: false,
            error,
            msg: "Error al crear el producto, comuniquese con el administrador",
        });
    }
});
exports.crearProducto = crearProducto;
//controlador para llamar a todos los productos q estan en la tabla usuarios en la bd
const getProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productos = yield producto_model_1.default.find().populate({
            path: "usuario",
            select: "nombre email numeroCelular",
        });
        res.json({
            ok: true,
            productos,
        });
    }
    catch (error) {
        res.status(400).json({
            ok: false,
            msg: "Error al consultar los productos",
        });
    }
});
exports.getProducto = getProducto;
//controlador para llamar a un solo producto q este en la bd
const getUnProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const producto = yield producto_model_1.default.findById({ _id: id });
        res.json({
            ok: true,
            producto,
        });
    }
    catch (error) {
        res.status(400).json({
            ok: false,
            msg: "Error al consultar el producto",
        });
    }
});
exports.getUnProducto = getUnProducto;
//controlador para actualizar un producto
const updateProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const { body } = req;
        //const body = req.body; es lo mismo que la libnea anterior
        const productoActualizado = yield producto_model_1.default.findByIdAndUpdate(id, body, { new: true });
        res.json({
            ok: true,
            msg: "Producto Actualizado",
            producto: productoActualizado,
        });
    }
    catch (error) {
        console.error(error);
        res.status(400).json({
            ok: false,
            msg: "Error al actualizar el producto",
        });
    }
});
exports.updateProducto = updateProducto;
//controlador para eliminar
const eliminarProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const productoEliminado = yield producto_model_1.default.findByIdAndDelete({
            _id: id,
        });
        res.json({
            ok: true,
            msg: "Producto eliminado",
            producto: productoEliminado,
        });
    }
    catch (error) {
        console.error(error);
        res.status(400).json({
            ok: false,
            msg: "Error al eliminar el producto",
        });
    }
});
exports.eliminarProducto = eliminarProducto;
//# sourceMappingURL=producto.controller.js.map