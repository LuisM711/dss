import { Router } from "express";
import{postProyecto} from "../controllers/proyectos"


const router = Router();

router.post('/', postProyecto);

export{router};