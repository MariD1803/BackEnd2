"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const StudentSchema = new mongoose_1.Schema({
    dni: {
        type: Number,
        required: true,
        unique: true
    },
    nombre: {
        type: String,
        required: true
    },
    camada: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Camada",
        required: true
    },
    email: {
        type: String,
        required: true
    },
    estado: {
        type: Boolean,
        required: true,
        default: true
    }
});
const Student = (0, mongoose_1.model)("Student", StudentSchema);
//Interactuar con la base de datos
exports.default = Student;
