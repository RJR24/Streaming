"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var userController_1 = require("../controllers/userController");
var userRouter = (0, express_1.Router)();
userRouter.get("/users", userController_1.getAllUsers);
exports.default = userRouter;
