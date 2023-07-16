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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteStudent = exports.updateStudent = exports.getStudentByDni = exports.getStudents = exports.createStudent = void 0;
const student_1 = __importDefault(require("../models/student"));
const camada_1 = __importDefault(require("../models/camada"));
const createStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const studentData = req.body;
    const { dni, nombre, camada, email } = studentData;
    if (!dni || !nombre || !camada || !email) {
        res.json({
            msg: "Faltan datos en la petición"
        });
        return;
    }
    const camadaData = yield camada_1.default.findOne({ nombre: camada });
    if (!camadaData) {
        res.json({
            msg: "La camada no se encontró en la DB"
        });
        return;
    }
    const alumnoEnDB = yield student_1.default.findOne({ dni: dni });
    if (alumnoEnDB) {
        res.json({
            msg: "El alumno ya está creado"
        });
    }
    const student = new student_1.default({
        dni,
        nombre,
        email,
        camada: camadaData._id
    });
    //Tomo los datos del front y los guardo en la base de datos
    yield student.save();
    //Le respondo al front
    res.json({
        msj: "Todo ok",
        student
    });
});
exports.createStudent = createStudent;
const getStudents = ({}, res) => __awaiter(void 0, void 0, void 0, function* () {
    const condicion = { estado: true };
    const students = yield student_1.default.find(condicion);
    res.json({
        students
    });
});
exports.getStudents = getStudents;
const getStudentByDni = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { dni } = req.params;
    // Para usar lo que está en la url
    const student = yield student_1.default.findOne({ dni: dni }).populate("camada", ["nombre", "diasDeCursada"]);
    //Con el populate traigo los datos que necesito que traiga
    res.json({
        student
    });
});
exports.getStudentByDni = getStudentByDni;
const updateStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { dni } = req.params;
    const _a = req.body, { estado, camada } = _a, data = __rest(_a, ["estado", "camada"]);
    const student = yield student_1.default.findOneAndUpdate({ dni: dni }, data); // Va a actualizar data y no camada y estado
    res.json({
        student
    });
});
exports.updateStudent = updateStudent;
const deleteStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { dni } = req.params;
    // const student = await Student.findOneAndDelete({dni:dni});  Hard delete
    const student = yield student_1.default.findOneAndUpdate({ dni: dni }, { estado: false }, { new: true }); // Manera soft delete
    if (!student) {
        res.json({
            msg: "El alumno no fue encontrado en la BD"
        });
    }
    res.json({
        student
    });
});
exports.deleteStudent = deleteStudent;
