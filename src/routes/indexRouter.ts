import { Router } from "express";
import { index } from "../controllers/indexController";
import userRouter from "./userRouter";
import categoryRouter from "./categoryRouter";
const indexRouter = Router();

indexRouter.use(userRouter)
indexRouter.use(categoryRouter)


indexRouter.get("/", index)


export default indexRouter