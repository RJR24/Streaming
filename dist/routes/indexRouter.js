"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const indexController_1 = require("../controllers/indexController");
const userRouter_1 = __importDefault(require("./userRouter"));
const categoryRouter_1 = __importDefault(require("./categoryRouter"));
const indexRouter = (0, express_1.Router)();
indexRouter.use(userRouter_1.default);
indexRouter.use(categoryRouter_1.default);
indexRouter.get("/", indexController_1.index);
exports.default = indexRouter;
