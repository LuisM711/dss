import { Sequelize } from "sequelize";
import dotenv from 'dotenv';
import path from "path";
import fs from "fs";
dotenv.config();

const sequelize = new Sequelize(
    process.env.DATABASE as string,
    process.env.USER as string,
    process.env.PASSWORD as string,{
        host: 'localhost',
        dialect:'mysql'
    }
)
const loadModels = async () => {
    const modelsDir = path.resolve(__dirname, '../models');
    
    // Leer todos los archivos en la carpeta ./models
    fs.readdirSync(modelsDir)
        .filter(file => file.endsWith('.ts') || file.endsWith('.js')) // Solo archivos .ts o .js
        .forEach(file => {
            const modelPath = path.join(modelsDir, file);
            require(modelPath); // Cargar el modelo dinámicamente
        });
}

// Función para sincronizar los modelos con la base de datos
const syncModels = async () => {
    try {
        await loadModels();  // Cargar todos los modelos antes de sincronizar
        await sequelize.sync({ alter: true });  // alter: true actualiza las tablas si es necesario
        console.log("Modelos sincronizados con la base de datos");
    } catch (error) {
        console.error("Error al sincronizar los modelos con la BD", error);
    }
}
//Checar la coneccion con la BD
const checkConnection = async()=>{
    try{
        await sequelize.authenticate();
        console.log("Conexion Exitosa con la BD");
        await syncModels();
    }catch(error){
        console.log("No hay conexion con la BD", error);
    }
}

checkConnection();
export{ sequelize, checkConnection }