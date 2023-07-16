"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const GastoSchema = new mongoose_1.Schema({
    precio: {
        type: Number,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    usuario: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Usuario",
        required: true
    },
    dni: {
        type: Number,
        required: true,
        unique: false
    }
});
const Gasto = (0, mongoose_1.model)("Gasto", GastoSchema);
//Interactuar con la base de datos
exports.default = Gasto;
