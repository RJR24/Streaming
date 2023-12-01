"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const categorySchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
}, {
    timestamps: true,
});
const CategoryModel = (0, mongoose_1.model)("Category", categorySchema);
exports.default = CategoryModel;
//# sourceMappingURL=CategoryModel.js.map