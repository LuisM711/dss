import { Request, Response } from 'express';
import { criterio } from '../models/criterios.model';
import { proyecto } from '../models/proyectos.model';

const postCriterio = async(req: Request, res: Response) => {
    try {
        
        // Obtiene los parametros
        const { id_proyecto } = req.params;
        const id_proyecto_parsed = parseInt(id_proyecto);
        const { nombre, descripcion, peso } = req.body;

        // Verifica si el proyecto existe
        const proyectoFound = await proyecto.findByPk(id_proyecto_parsed);
        if (!proyectoFound) {
            return res.status(404).json({ message: 'El proyecto no existe' });
        }

        // Verifica si no hay un criterio con el mismo nombre en el proyecto
        const criterioFound = await criterio.findOne({
            where: {
                id_proyecto: id_proyecto_parsed,
                nombre: nombre
            }
        });
        if (criterioFound) {
            return res.status(400).json({ message: 'El criterio ya existe para este proyecto' });
        }

        // Crea el criterio
        const newCriterio = await criterio.create({
            id_proyecto: id_proyecto_parsed,
            nombre: nombre,
            descripcion: descripcion,
            peso:1
        });

        return res.status(201).json(newCriterio);
    } catch (error) {
        console.error("Error creando criterio", error);
        console.error("ERROR POSTEANDO CRITERIO");
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
}


const updateCriterioPeso = async(req:Request, res:Response)=>{
    try{
        const {id_proyecto, peso_criterios } = req.body;
        console.log(peso_criterios);
        const id_proyecto_parsed = parseInt(id_proyecto);
        // Verifica si el proyecto existe
        const proyectoFound = await proyecto.findByPk(id_proyecto_parsed);
        if (!proyectoFound) {
            return res.status(404).json({ message: 'El proyecto no existe' });
        }        
        peso_criterios.forEach(async (element: any)=> {
            const criterioFound = await criterio.findOne({ 
                where:{
                    id_proyecto: id_proyecto,
                    id: element.id
                }
            });
            console.log(element.id);
            if(!criterioFound){
                return res.status(500).json({message:'No se pudo'});
            }
            if(element.peso>5){
                return res.status(500).json({message:'Peso invalido'});
            }
            criterioFound.peso=element.peso;
            await criterioFound.save();
            return res.status(200).json({message:'Peso Actualizado'});
        });
    }catch(error){
        return res.status(500).json({message:'No se pudo'});
    }
}
const getCriterios = async(req:Request, res:Response)=>{
    try{
        //Obtenemos id del proyecto que pertenecera
        const {id_proyecto} = req.params;
        
        //Obtenemos criterios
        const criterios = await criterio.findAll({
            where:{
                id_proyecto: id_proyecto
            }
        });

        if(criterios.length === 0){
            return res.status(404).json({message:'Aun no hay Criterios creados en este proyecto'});
        }

        return res.json(criterios);
    }catch(error){
        console.error('Error obteniendo criterios');
        return res.status(500).json({message:'Internal Server Error'});
    }
}

const getSingleCriterio = async(req:Request, res:Response)=>{
    try{
        const {id_proyecto, id_criterio} = req.params
        const single_criterio = await criterio.findAll({
            where:{
                id_proyecto: id_proyecto,
                id: id_criterio
            }
        });
        if(!single_criterio){
            return res.status(404).json({message:'Este criterio no existe'});
        }
        return res.json(single_criterio);
    }catch(error){
        console.error('Error objeniendo el criterio', error);
        return res.status(500).json({message:'Internal Server Error'});
    }
}

const updateCriterio = async(req:Request, res:Response)=>{
    try{
        
        //Obtenemos ID Proyecto y ID de Criterio
        const {id_proyecto, id_criterio} = req.params;
        const id_proyecto_parsed = parseInt(id_proyecto);
        const id_criterio_parsed = parseInt(id_criterio);
        
        //Obtenemos otros parametros
        const {nombre, descripcion, peso} = req.body;

        const criterioFound = await criterio.findOne({
            where:{
                id_proyecto: id_proyecto_parsed,
                id: id_criterio_parsed
            }
        });

        if(!criterioFound){
            return res.status(404).json({message:'Criterio no encontrado'});
        }

        // Actualizamos los datos
        criterioFound.nombre = nombre;
        criterioFound.descripcion = descripcion;
        criterioFound.peso = peso;

        await criterioFound.save();

        return res.json(criterioFound);
    }catch(error){
        console.error('Error actualizando criterio');
        return res.status(500).json({message:'Internal Server Error'});
    }
}

const deleteCriterio = async(req:Request, res:Response)=>{
    try{
        //Obtenemos ID Proyecto y ID de Criterio
        const {id_proyecto, id_criterio} = req.params;
        const id_proyecto_parsed = parseInt(id_proyecto);
        const id_criterio_parsed = parseInt(id_criterio);

        const criterioFound = await criterio.findOne({
            where:{
                id_proyecto: id_proyecto_parsed,
                id: id_criterio_parsed
            }
        });

        if(!criterioFound){
            return res.status(404).json({message:'Criterio no encontrado'});
        }

        //Eliminamos el criterio
        await criterioFound.destroy();

        return res.json({message:'Criterio eliminado'});
    }catch(error){
        console.error('Error eliminando criterio');
        return res.status(500).json({message:'Internal Server Error'});
    }
}

export { postCriterio, getCriterios, updateCriterio, deleteCriterio, updateCriterioPeso, getSingleCriterio };