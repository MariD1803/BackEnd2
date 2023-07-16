"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const gasto_1 = require("../controllers/gasto");
const router = (0, express_1.Router)();
// Crear la ruta
router.post("/", gasto_1.createGasto);
router.get("/", gasto_1.getGastos);
router.get("/gastosporusuario/:dni", gasto_1.getGastosByDni);
router.get("/:descripcion", gasto_1.getUsuariosByGasto);
exports.default = router;
