import { Request, Response } from 'express';
import { criterio } from '../models/criterios.model';
import { proyecto } from '../models/proyectos.model';
import { alternativas } from '../models/alternativas.model';
import { matriz } from '../models/matriz.model';

const postMatriz = async(req:Request, res:Response)=>{
    try{
        const {id_proyecto, filas} = req.body;
        //Validar que exista el proyecto
        const proyectoFound = await proyecto.findByPk(id_proyecto);
        //console.log(proyectoFound);
        if(!proyectoFound){
            return res.status(404).json({message: 'Ese proyecto no existe'});
        }

        interface Fila{
            id_alternativa:number,
            id_criterio:number,
            valor:number
        }
        // const decisionData = filas.map(async (fila: Fila) => {
        //     return {
        //       id_proyecto: id_proyecto,           // Use project ID from request body
        //       id_alternativa: fila.id_alternativa, // Each row has its own id_alternativa
        //       id_criterio: fila.id_criterio,       // Each row has its own id_criterio
        //       valor: fila.valor                    // Each row has its own value
        //     };
        //   });
        filas.forEach((element: any)=> {
            matriz.create({
                id_proyecto:id_proyecto,
                id_alternativa:element.id_alternativa,
                id_criterio:element.id_criterio,
                valor:element.valor
            }
            );

            
        });

          //console.log(decisionData)
          return res.status(222).json({})
          //await matriz.bulkCreate(decisionData);
        //const decisionData = await Promise.all(filas.map(async (fila: Fila) => {
          //  console.log(req.body)
        //  console.log(req.body.filas[1]
            //return matriz.create({
              //id_proyecto: req.body.id_proyecto, // Assuming id_proyecto comes from the request body
              //id_alternativa: fila.id_alternativa,
              //id_criterio: fila.id_criterio,
              //valor: fila.valor
            //});
          //}));
         // return res.status(200).json({ message: 'Matriz creada exitosamente', decisionData });
    }catch(error){
        res.status(500).json({message:error});
    }
}
export{postMatriz}