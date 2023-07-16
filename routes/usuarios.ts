import {Router } from "express"
import { createUsuario} from "../controllers/usuario"

const router = Router()
// Crear la ruta

router.post("/", createUsuario)

export default router