import { Request, Response } from "express";
import Gasto, {IGasto} from "../models/gasto";
import Usuario from "../models/usuario";


export const createGasto = async(req: Request, res: Response) => {

    const gastoData:IGasto = req.body

    const {descripcion, precio, usuario, dni} = gastoData

    if(!descripcion || !precio || !usuario || !dni){
        res.json({
            msg: "Faltan datos en la petición"
        })
        return
    }

    const usuarioData = await Usuario.findOne({nombre: usuario})

    if(!usuarioData){
        res.json({
            msg:"La camada no se encontró en la DB"
        })
        return
    }

    const gastoEnDB = await Gasto.findOne({dni: dni})
    const gastoDescripcionEnDB = await Gasto.findOne({descripcion: descripcion})

    if(gastoEnDB && gastoDescripcionEnDB){
        res.json({
            msg: "El gasto ya está creado para este usuario"
        })
    }

    const gasto = new Gasto({
        descripcion, 
        precio,
        dni,
        usuario: usuarioData._id
    })

    //Tomo los datos del front y los guardo en la base de datos
    await gasto.save()

    //Le respondo al front
    res.json({
        msj: "Todo ok",
        gasto
    })
}



export const getGastos = async ({}, res: Response) => {
    const gastos: IGasto[] = await Gasto.find()

    res.json({
        gastos
    })
}


export const getUsuariosByGasto= async (req:Request, res: Response) => {
    const {descripcion} = req.params

    const gasto: IGasto[] | null = await Gasto.find({descripcion:descripcion}).populate("usuario", "nombre")

    res.json({        
        msg: `${descripcion}`,
        gasto
    })
}

export const getGastosByDni= async (req:Request, res: Response) => {
    const {dni} = req.params

    const gasto: IGasto[] | null = await Gasto.find({dni:dni}).populate("usuario", "nombre")

    
    res.json({
        msg: `${dni}`,
        gasto
    })
}



