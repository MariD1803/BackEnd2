"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const camada_1 = require("../controllers/camada");
const router = (0, express_1.Router)();
// Crear la ruta
router.post("/", camada_1.createCamada);
exports.default = router;
