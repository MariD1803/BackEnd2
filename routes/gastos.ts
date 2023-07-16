import {Router } from "express"
import { createGasto, getGastos, getUsuariosByGasto, getGastosByDni} from "../controllers/gasto"

const router = Router()
// Crear la ruta

router.post("/", createGasto)

router.get("/", getGastos)

router.get("/gastosporusuario/:dni", getGastosByDni)  
router.get("/:descripcion", getUsuariosByGasto)  


export default router