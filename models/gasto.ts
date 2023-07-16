import {Model, Schema, model, ObjectId} from "mongoose"

export interface IGasto {
    descripcion: string,
    precio: number,
    usuario: ObjectId,
    dni: number
}

const GastoSchema = new Schema <IGasto> ({
    precio: {
        type: Number,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    usuario: {
        type: Schema.Types.ObjectId, 
        ref: "Usuario",
        required: true
    },
    dni: {
        type: Number,
        required: true,        
        unique: false
    }

})


const Gasto: Model<IGasto> = model<IGasto>("Gasto", GastoSchema)

//Interactuar con la base de datos

export default Gasto