"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const auth_1 = require("../middlewares/auth");
const userRouter = (0, express_1.Router)();
userRouter.get("/profile", auth_1.isLoggedIn, userController_1.getUserProfile);
userRouter.put("/update", auth_1.isLoggedIn, userController_1.updateUserProfile);
userRouter.post("/auth/signup", userController_1.registerUser);
userRouter.post("/auth/login", userController_1.loginUser);
userRouter.post("/auth/logout", userController_1.logoutUser);
exports.default = userRouter;
//# sourceMappingURL=userRouter.js.map