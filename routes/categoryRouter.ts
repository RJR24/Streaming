import { Router } from "express";
import { getAllCategories } from "../controllers/categoryController";
const categoryRouter = Router();


categoryRouter.get("/categories", getAllCategories )


export default categoryRouter