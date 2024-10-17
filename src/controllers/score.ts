import { Request, Response } from 'express';
import { criterio } from '../models/criterios.model';
import { proyecto } from '../models/proyectos.model';
import { matriz } from '../models/matriz.model';
import { scoreModel } from '../models/score.model';

const score = async (req: Request, res: Response) => {
    const {proyecto_id} = req.params;
    const proyectoActual = await proyecto.findByPk(proyecto_id);
    const criterios = await criterio.findAll({
        where: {id_proyecto: proyecto_id}
    });
    const matrizActual = await matriz.findAll({
        where: {id_proyecto: proyecto_id}
    });

    if (!proyectoActual) {
        return res.status(404).json({ message: 'El proyecto no existe' });
    }
    if (!criterios || criterios.length === 0) {
        return res.status(404).json({ message: 'El proyecto no tiene criterios' });
    }
    if (!matrizActual || matrizActual.length === 0) {
        return res.status(404).json({ message: 'El proyecto no tiene matriz' });
    }

    
    const scores: any = {};

    matrizActual.forEach((matrizItem) => {
        const criterioActual = criterios.find(c => c.id === matrizItem.id_criterio);
        if (criterioActual) {
            // multiplicacion
            const weightedValue = matrizItem.valor * criterioActual.peso;
            //acumulacion
            if (!scores[matrizItem.id_alternativa]) {
                scores[matrizItem.id_alternativa] = 0;
            }
            scores[matrizItem.id_alternativa] += weightedValue;
        }
    });
    //save in scoreModel


    const scoreList = Object.keys(scores).map((key) => {
        return {
            id_proyecto: parseInt(proyecto_id),
            id_alternativa: parseInt(key),
            score: scores[key]
        };
    });
    await scoreModel.bulkCreate(scoreList, { updateOnDuplicate: ['score'] });


    return res.status(201).json({
        matriz: matrizActual,
        criterios: criterios,
        scores
    });
};

const getScore = async(req:Request, res:Response)=>{
    const {proyecto_id} = req.params;
    const scoreProyecto = await scoreModel.findAll({
        where:{
            id_proyecto: proyecto_id
        }
    });
    if(scoreProyecto.length===0){
        return res.status(404).json({message:'Este proyecto aun no tiene scores calculados'});
    }
    return res.status(200).json(scoreProyecto);
};
export { score, getScore };
