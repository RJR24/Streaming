"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var categoryController_1 = require("../controllers/categoryController");
var categoryRouter = (0, express_1.Router)();
categoryRouter.get("/categories", categoryController_1.getAllCategories);
exports.default = categoryRouter;
