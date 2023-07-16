import express, { Express } from "express";
import { conectarDB } from "../database/config";
import usuariosRoutes from "../routes/usuarios"
import gastosRoutes from "../routes/gastos";

export class Server {
    app: Express

    constructor(){  //Me permite inicializar el objeto
        this.app = express(); //iniciar el servidor
        this.conexionADB(); // Se conecta a la base
        this.middlewares(); //Asignar todas las peticiones al body para poder usar params
        this.routes() //Ejecuta las rutas
    }

    async conexionADB(): Promise<void> {
        await conectarDB()
    }


    // Hace que esté disponible para usar el req.body. Es importante. Se ejecuta antes que todo
    middlewares(): void {
        this.app.use(express.json())
    }

    routes(): void {
        this.app.use("/gastos", gastosRoutes)
        this.app.use("/usuarios", usuariosRoutes)
    }

    listen(): void {
        this.app.listen(8020, ()=> {
            console.log("Corriendo en el puerto 8020")
        })
    }
}