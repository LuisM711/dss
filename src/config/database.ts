import { Sequelize } from "sequelize";
import dotenv from 'dotenv';
dotenv.config();

const sequelize = new Sequelize(
    process.env.DATABASE as string,
    process.env.USER as string,
    process.env.PASSWORD as string,{
        host: 'localhost',
        dialect:'mysql'
    }
)

//Checar la coneccion con la BD
const checkConnection = async()=>{
    try{
        await sequelize.authenticate();
        console.log("Conexion Exitosa con la BD");
    }catch(error){
        console.log("No hay conexion con la BD", error);
    }
}

checkConnection();
export{ sequelize, checkConnection }