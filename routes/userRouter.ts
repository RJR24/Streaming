import { Router } from "express";
import { getAllUsers } from "../controllers/userController";
const userRouter = Router();


userRouter.get("/users", getAllUsers)


export default userRouter