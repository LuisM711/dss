import { Router } from "express";
import{deleteAlternativa, GetAlternativas, postAlternativa, updateAlternativa} from "../controllers/alternativas";

const router = Router();

router.post("/:id_proyecto", postAlternativa);
router.get("/:id_proyecto", GetAlternativas);
router.put("/:id_proyecto/:id_alternativa",updateAlternativa);
router.delete("/:id_proyecto/:id_alternativa", deleteAlternativa);

export{router};