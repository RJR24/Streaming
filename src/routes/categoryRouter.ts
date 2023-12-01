import { Router } from "express";
import {
  createCategory,
  removeCategory,
  getAllCategories,
  updateCategory,
} from "../controllers/categoryController";

const categoryRouter = Router();

categoryRouter.get("/categories", getAllCategories);
categoryRouter.post("/category", createCategory);
categoryRouter.delete("/category/:id", removeCategory);
categoryRouter.put("/category/:id", updateCategory);

export default categoryRouter;
