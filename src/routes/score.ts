import { Router } from "express";
import { getScore, score } from "../controllers/score"


const router = Router();
router.post('/:proyecto_id', score);
router.get('/:proyecto_id', getScore);


export{router};