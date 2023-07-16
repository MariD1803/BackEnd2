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
exports.getGastosByDni = exports.getUsuariosByGasto = exports.getGastos = exports.createGasto = void 0;
const gasto_1 = __importDefault(require("../models/gasto"));
const usuario_1 = __importDefault(require("../models/usuario"));
const createGasto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const gastoData = req.body;
    const { descripcion, precio, usuario, dni } = gastoData;
    if (!descripcion || !precio || !usuario || !dni) {
        res.json({
            msg: "Faltan datos en la petición"
        });
        return;
    }
    const usuarioData = yield usuario_1.default.findOne({ nombre: usuario });
    if (!usuarioData) {
        res.json({
            msg: "La camada no se encontró en la DB"
        });
        return;
    }
    const gastoEnDB = yield gasto_1.default.findOne({ dni: dni });
    const gastoDescripcionEnDB = yield gasto_1.default.findOne({ descripcion: descripcion });
    if (gastoEnDB && gastoDescripcionEnDB) {
        res.json({
            msg: "El gasto ya está creado para este usuario"
        });
    }
    const gasto = new gasto_1.default({
        descripcion,
        precio,
        dni,
        usuario: usuarioData._id
    });
    //Tomo los datos del front y los guardo en la base de datos
    yield gasto.save();
    //Le respondo al front
    res.json({
        msj: "Todo ok",
        gasto
    });
});
exports.createGasto = createGasto;
const getGastos = ({}, res) => __awaiter(void 0, void 0, void 0, function* () {
    const gastos = yield gasto_1.default.find();
    res.json({
        gastos
    });
});
exports.getGastos = getGastos;
const getUsuariosByGasto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { descripcion } = req.params;
    const gasto = yield gasto_1.default.find({ descripcion: descripcion }).populate("usuario", "nombre");
    res.json({
        msg: `${descripcion}`,
        gasto
    });
});
exports.getUsuariosByGasto = getUsuariosByGasto;
const getGastosByDni = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { dni } = req.params;
    const gasto = yield gasto_1.default.find({ dni: dni }).populate("usuario", "nombre");
    res.json({
        msg: `${dni}`,
        gasto
    });
});
exports.getGastosByDni = getGastosByDni;
