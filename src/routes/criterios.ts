import { Router } from "express";
import { postCriterio, getCriterios, updateCriterio, deleteCriterio } from "../controllers/criterios";
const router = Router();

router.post("/:id_proyecto", postCriterio);
router.get("/:id_proyecto",getCriterios);
router.put("/:id_proyecto/:id_criterio",updateCriterio);
router.delete("/:id_proyecto/:id_criterio",deleteCriterio);

export{router};