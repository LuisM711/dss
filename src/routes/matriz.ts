import { Router } from "express";
import { postMatriz } from "../controllers/matriz";

const router = Router();
router.post("/", postMatriz);
export{router};