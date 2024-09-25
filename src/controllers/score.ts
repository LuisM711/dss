import { Request, Response } from 'express';
import { criterio } from '../models/criterios.model';
import { proyecto } from '../models/proyectos.model';
import { matriz } from '../models/matriz.model';

const score = async (req: Request, res: Response) => {
    const {proyecto_id} = req.params;
    const proyectoActual = await proyecto.findByPk(proyecto_id);
    const criterios = await criterio.findAll({
        where: {id_proyecto:proyecto_id}
    });
    const matrizActual = await matriz.findAll({
        where: {id_proyecto:proyecto_id}
    });
    //SCORE
    let scoreFinal: any[] = [];
    matrizActual.forEach(element => {
        scoreFinal.push()
        
    });









    return res.status(201).json({
        matriz:matrizActual,
        criterioss:criterios});
}


export {score}