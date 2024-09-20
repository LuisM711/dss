import { Request, Response } from "express";
import { handleHttp } from "../utils/error.handle";
import { proyecto } from "../models/proyectos.model";
import { error } from "console";

//POST Proyecto
const postProyecto = async (req:Request, res:Response)=>{
    try{

        //Recibe los parametros de nombre y objetivo del proyecto en el body
        const{ nombre, objetivo } = req.body;

        //Lo metemos a la BD
        const newProyecto = await proyecto.create({
            nombre,
            objetivo
        });

        res.status(201).json(newProyecto)
    }catch(error){
        console.error("Error creando proyecto", error);
        console.error("ERROR POSTEANDO PROYECTO");
    }
}

export{ postProyecto }