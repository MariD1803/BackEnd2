import { Request, Response } from "express";
import Usuario, {IUsuario} from "../models/usuario";

export const createUsuario =async (req:Request, res: Response) => {
    
    const usuarioData: IUsuario = req.body

    const{dni, email, nombre} = usuarioData

    if(!nombre || !email || !dni) {
        res.json({
            msg: "Faltan datos necesarios en la petición"
        })
        return
    }

    const usuarioEnDB = await Usuario.findOne({dni: dni})

    if(usuarioEnDB){
        res.json({
            msg: "El usuario ya está creado"
        })
    }

    const usuario = new Usuario({
        nombre, 
        email,
        dni
    })


    await usuario.save()

    res.json({
        msg: "Todo ok",
        usuario
    })
}
