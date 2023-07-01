import { Router } from "express";
import { 
    getApus,
    getApu,
    createApu,
    updateApu,
    deleteApu,
 } from "../controllers/apu_user.controller.js";
import { auth } from "../middlewares/auth.middleware.js";
import { validateSchema } from "../middlewares/validator.middleware.js";

const router = Router()

//obtener todos
router.get("/apu", auth, getApus);

//create
router.post("/apu", auth, createApu);

//obtner uno 
router.get("/apu/:id", auth, getApu);

//update
router.put("/apu/:id", auth, updateApu);

//delete
router.delete("/apu/:id", auth, deleteApu);

export default router