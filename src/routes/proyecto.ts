import { Router } from "express";
import{deleteProyecto, getProyecto, postProyecto, updateProyecto} from "../controllers/proyectos"


const router = Router();

router.post('/', postProyecto);
router.get('/', getProyecto);
router.put('/:proyecto_id',updateProyecto);
router.delete('/:proyecto_id',deleteProyecto);

export{router};