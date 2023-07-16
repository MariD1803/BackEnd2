import mongoose from "mongoose";

export const conectarDB = async () : Promise<void> => {
    try {
        await mongoose.connect("mongodb+srv://mariangeldiaz:28433999@nombredecluster.3znb9bu.mongodb.net/")
        console.log("Base de datos online")
    } catch(error){
        console.error(error)
        throw new Error("Error a la hora de  iniciar la base de datos")
    }
}