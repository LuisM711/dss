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

        return res.status(201).json(newProyecto)
    }catch(error){
        console.error("Error creando proyecto", error);
        console.error("ERROR POSTEANDO PROYECTO");
    }
}


//UPDATE Proyecto
const updateProyecto = async (req:Request, res:Response)=>{
    try{

        //Obtenemos ID y parmetros del body
        const{ proyecto_id }=req.params;
        const{ nombre, objetivo }=req.body;

        //Buscaremos que exista el Proyecto de la ID que nos dieron
        const proyecto_found = await proyecto.findByPk(proyecto_id)
        if(!proyecto_found){
            return res.status(404).json({ message: 'Proyecto no encontrado' })
        }

        //Actualizamos Datos
        proyecto_found.nombre = nombre;
        proyecto_found.objetivo = objetivo;

        //Guardamos
        await proyecto_found.save();
        return res.status(200).json({message:'Proyecto Actualizado'});

    }catch(error){
        console.error('Error actualizando proyecto');
        res.status(500).json({message: 'Internal Server Error'});
    }
}

//DELETE Proyecto
const deleteProyecto = async (req:Request, res:Response)=>{
    try{


        //Obtenemos ID y parmetros del body
        const{ proyecto_id }=req.params;
        
         //Buscaremos que exista el Proyecto de la ID que nos dieron
         const proyecto_found = await proyecto.findByPk(proyecto_id)

         //Comprobamos que exista
         if(!proyecto_found){
                return res.status(404).json({ message: 'Proyecto no encontrado' })
         }

         //Eliminamos
         await proyecto.destroy({
            where:{
                id:proyecto_id
            }
         });

        return res.status(200).json({message: 'Proyecto Eliminado'});
    }catch(error){
        console.error('Error actualizando proyecto');
        res.status(500).json({message: 'Internal Server Error'});
    }
}

const getProyecto = async (req:Request, res:Response)=>{
    try{
        const proyectos = await proyecto.findAll();

        if(proyectos.length === 0){
            return res.status(404).json({message:'Aun no hay Proyectos creados'});
        }
        return res.json(proyectos);
    }catch(error){
        console.error('Error obteniendo proyectos');
        return res.status(500).json({message:'Internal Server Error'});
    }
}

export{ postProyecto, updateProyecto, deleteProyecto, getProyecto }