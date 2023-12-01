"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const categoryController_1 = require("../controllers/categoryController");
const categoryRouter = (0, express_1.Router)();
categoryRouter.get("/categories", categoryController_1.getAllCategories);
categoryRouter.post("/category", categoryController_1.createCategory);
categoryRouter.delete("/category/:id", categoryController_1.removeCategory);
categoryRouter.put("/category/:id", categoryController_1.updateCategory);
exports.default = categoryRouter;
//# sourceMappingURL=categoryRouter.js.map