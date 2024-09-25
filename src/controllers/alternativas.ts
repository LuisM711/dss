import { Request, Response } from "express";
import { proyecto } from "../models/proyectos.model";
import { alternativas } from "../models/alternativas.model";


//POST Alternativa
const postAlternativa = async(req:Request, res:Response)=>{
    try{
        
        //Obtenemos id del proyecto que pertenecera
        const {id_proyecto} = req.params;
        
        //Parseamos ID para ingresarlo
        const id_proyecto_parsed = parseInt(id_proyecto);
        
        //Obtenemos otros parametros
        const {nombre, descripcion} = req.body;
        
        const proyectoFound = await proyecto.findByPk(id_proyecto);
        if(!proyectoFound){
            return res.status(404).json({message:'Este Proyect0 no Existe'});
        }
        const newAlternativa = await alternativas.create({
            id_proyecto: id_proyecto_parsed,
            nombre: nombre,
            descripcion: descripcion
        })

        return res.status(201).json(newAlternativa)
    }catch(error){
        console.error("Error creando proyecto", error);
        console.error("ERROR POSTEANDO PROYECTO");
    }
}

//GET Altenativas
const GetAlternativas = async(req:Request, res:Response)=>{
    try{

        //Obtenemos id del proyecto que pertenecera
        const {id_proyecto} = req.params;
        
        const alternativa = await alternativas.findAll({
            where:{
                id_proyecto: id_proyecto
            }
        });

        //Si no hay Alternativas
        if(alternativa.length === 0){
            return res.status(404).json({message:'Aun no hay Alternativas creadas en este proyecto'});
        }

        return res.json(alternativa);
    }catch(error){
        console.error('Error obteniendo alternativas');
        return res.status(500).json({message:'Internal Server Error'});
    }
}

//UPDATE Alternativas
const updateAlternativa = async(req: Request, res:Response)=>{
    try{

        //Obtenemos ID Proyecto y ID de Alternativa
        const{id_proyecto, id_alternativa} = req.params;
        const{nombre, descripcion} = req.body;

        const alternativa = await alternativas.findOne({
            where:{
                id_proyecto: id_proyecto,
                id: id_alternativa
            }
        });
        //Si no hay Alternativas
        if(!alternativa){
            return res.status(404).json({message:'No existe esta alternativa en este proyecto'});
        }

        alternativa.nombre = nombre;
        alternativa.descripcion = descripcion;

        await alternativa.save();
        //Devolvemos
        return res.status(200).json({message:'Alternativa Actualizada'});

    }catch(error){
        console.error('Error actualizando alternativas');
        return res.status(500).json({message:'Internal Server Error'});
    }
}

//DELETE Alternativas
const deleteAlternativa = async(req: Request, res: Response)=>{
    try{
            const{id_proyecto, id_alternativa}=req.params;

            const alternativa = await alternativas.findOne({
                where:{
                    id_proyecto: id_proyecto,
                    id: id_alternativa
                }
            });

            if(!alternativa){
                return res.status(404).json({message:'No existe esta alternativa en este proyecto'});
            }
            await alternativa.destroy();
            return res.status(200).json({message:'Alternativa Eliminada'});
    }catch(error){
        console.error('Error eliminando alternativa');
        return res.status(500).json({message:'Internal Server Error'});
    }
}
export{ postAlternativa, GetAlternativas, updateAlternativa, deleteAlternativa }