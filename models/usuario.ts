import {Model, Schema, model} from "mongoose"

export interface IUsuario {
    nombre: string,
    dni: number,
    email: string
}

const UsuarioSchema = new Schema <IUsuario> ({
    nombre: {
        type: String,
        required: true
    },
    dni: {
        type: Number,
        require: true,
        unique: true
    },
    email: {
        type: String
    }

})


const Usuario: Model<IUsuario> = model<IUsuario>("Usuario", UsuarioSchema)

//Interactuar con la base de datos

export default Usuario