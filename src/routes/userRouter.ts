import { Router } from "express";
import {
  getUserProfile,
  loginUser,
  registerUser,
  logoutUser,
  updateUserProfile,
  getMyListMovieDetails,
  userMoviesList,
  getUsersList,
} from "../controllers/userController";
import { addToMyList, removeFromMyList } from "../controllers/userController";
import { isAdmin, isLoggedIn } from "../middlewares/auth";

const userRouter = Router();

userRouter.get("/profile", isLoggedIn, getUserProfile);
userRouter.put("/update", isLoggedIn, updateUserProfile);
userRouter.post("/auth/signup", registerUser);
userRouter.post("/auth/login", loginUser);
userRouter.post("/auth/logout", logoutUser);

// Add to My List
userRouter.post("/api/user/myList/add/:movieId", isLoggedIn, addToMyList);
// Remove from My List
userRouter.post(
  "/api/user/myList/remove/:movieId",
  isLoggedIn,
  removeFromMyList
);
// Get Movie Details
userRouter.get("/api/user/myList/:movieId", isLoggedIn, getMyListMovieDetails);
// Get User Movie List
userRouter.get("/api/user/myList/", isLoggedIn, userMoviesList);

userRouter.get("/api/usersList", isLoggedIn, isAdmin, getUsersList);

export default userRouter;
