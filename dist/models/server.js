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
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
const config_1 = require("../database/config");
const usuarios_1 = __importDefault(require("../routes/usuarios"));
const gastos_1 = __importDefault(require("../routes/gastos"));
class Server {
    constructor() {
        this.app = (0, express_1.default)(); //iniciar el servidor
        this.conexionADB(); // Se conecta a la base
        this.middlewares(); //Asignar todas las peticiones al body para poder usar params
        this.routes(); //Ejecuta las rutas
    }
    conexionADB() {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, config_1.conectarDB)();
        });
    }
    // Hace que esté disponible para usar el req.body. Es importante. Se ejecuta antes que todo
    middlewares() {
        this.app.use(express_1.default.json());
    }
    routes() {
        this.app.use("/gastos", gastos_1.default);
        this.app.use("/usuarios", usuarios_1.default);
    }
    listen() {
        this.app.listen(8020, () => {
            console.log("Corriendo en el puerto 8020");
        });
    }
}
exports.Server = Server;
