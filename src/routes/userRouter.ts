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
  uploadProfilePictureHandler,
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

// Route to handle file upload
// userRouter.post("/users/:userId/upload-profile-picture",isLoggedIn,uploadProfilePicture);
// Explicitly specify the type for the router and use the handler
// userRouter.post<{ userId: string }>(
//   "/users/:userId/upload-profile-picture",
//   isLoggedIn,
//   uploadProfilePictureHandler as RequestHandlerParams<
//     { userId: string },
//     any,
//     any,
//     ParsedQs,
//     Record<string, any>
//   >
// );



export default userRouter;
