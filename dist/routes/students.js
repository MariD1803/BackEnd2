"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const students_1 = require("../controllers/students");
const router = (0, express_1.Router)();
// Crear la ruta
router.post("/", students_1.createStudent);
router.get("/", students_1.getStudents);
router.get("/:dni", students_1.getStudentByDni); // Coloco lo que desestruturé en getStudentByDni 
router.put("/:dni", students_1.updateStudent);
router.delete("/:dni", students_1.deleteStudent);
exports.default = router;
