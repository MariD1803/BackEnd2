"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UsuarioSchema = new mongoose_1.Schema({
    nombre: {
        type: String,
        required: true
    },
    dni: {
        type: Number,
        require: true,
        unique: true
    },
    email: {
        type: String
    }
});
const Usuario = (0, mongoose_1.model)("Usuario", UsuarioSchema);
//Interactuar con la base de datos
exports.default = Usuario;
