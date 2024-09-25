import { Router } from "express";
import { score } from "../controllers/score"


const router = Router();
router.get('/:proyecto_id', score);


export{router};