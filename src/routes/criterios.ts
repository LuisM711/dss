import { Router } from "express";
import { postCriterio, getCriterios, updateCriterio, deleteCriterio, updateCriterioPeso, getSingleCriterio } from "../controllers/criterios";
const router = Router();

router.post("/:id_proyecto", postCriterio);
router.get("/:id_proyecto",getCriterios);
router.get("/:id_proyecto/:id_criterio",getSingleCriterio);
router.put("/:id_proyecto/:id_criterio",updateCriterio);
router.delete("/:id_proyecto/:id_criterio",deleteCriterio);
router.patch("", updateCriterioPeso);

export{router};