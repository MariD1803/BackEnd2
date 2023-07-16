"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuario_1 = require("../controllers/usuario");
const router = (0, express_1.Router)();
// Crear la ruta
router.post("/", usuario_1.createUsuario);
exports.default = router;
