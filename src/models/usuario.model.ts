import { Model, Schema, model } from "mongoose";

const UsuarioSchema = new Schema({
    nombre:{
        type: String, required: true, unique: true,
    },
    email:{
        type: String, required: true, unique: true,
    },
    tipoDocumento: {type: String, required: true},
    numeroDocumento:{type: String, required:true, unique: true},
    numeroCelular:{type:Number},
    peso:{type:String},
    fechaNacimiento:{type:Date},
    password: {type: String},
    rol: {type: String, default:"USER"},
    token: {type: String, requir:false},
    creaeAt:{type: Date, default:Date.now()},
});


const UsuarioModel: Model<any> = model("usuario", UsuarioSchema);
export default UsuarioModel;