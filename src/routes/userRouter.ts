import { Router } from "express";
import {
  getUserProfile,
  loginUser,
  registerUser,
  logoutUser,
  updateUserProfile
} from "../controllers/userController";
import { isLoggedIn } from "../middlewares/auth";

const userRouter = Router();

userRouter.get("/profile", isLoggedIn, getUserProfile);
userRouter.put("/update", isLoggedIn, updateUserProfile);
userRouter.post("/signup", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/logout", logoutUser);

export default userRouter;
