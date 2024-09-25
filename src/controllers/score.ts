import { Request, Response } from 'express';
import { criterio } from '../models/criterios.model';
import { proyecto } from '../models/proyectos.model';
import { matriz } from '../models/matriz.model';

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

    return res.status(201).json({
        matriz: matrizActual,
        criterios: criterios,
        scores
    });
};

export { score };
