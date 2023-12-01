"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeCategory = exports.updateCategory = exports.getAllCategories = exports.createCategory = void 0;
const CategoryModel_1 = __importDefault(require("../models/CategoryModel"));
const mongoose_1 = __importDefault(require("mongoose"));
const createCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description } = req.body;
        const newCategory = yield CategoryModel_1.default.create({ title, description });
        return res
            .status(201)
            .json({ message: "Category created successfully!", data: newCategory });
    }
    catch (error) {
        console.log("Error creating category:", error);
        return res.status(500).json({
            error: "Error creating category",
            message: error.message,
        });
    }
});
exports.createCategory = createCategory;
const getAllCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categoriesList = yield CategoryModel_1.default.find();
        return res.status(200).json({ data: categoriesList });
    }
    catch (error) {
        console.log("Error fetching categories:", error);
        return res.status(500).json({
            error: "Error fetching categories",
            message: error.message,
        });
    }
});
exports.getAllCategories = getAllCategories;
const updateCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                error: "Invalid ObjectId",
                message: "The provided ID is not a valid ObjectId.",
            });
        }
        const categoryId = new mongoose_1.default.Types.ObjectId(id);
        const { title, description } = req.body;
        const category = yield CategoryModel_1.default.findByIdAndUpdate(categoryId, { title, description }, { new: true });
        if (!category) {
            return res.status(404).json({
                error: "Category not found",
                message: "Category not found!",
            });
        }
        return res.json({
            message: "Category updated successfully!",
            data: category,
        });
    }
    catch (error) {
        console.log("Error updating category:", error);
        if (error instanceof Error) {
            return res.status(500).json({
                error: "Error updating category",
                message: error.message,
            });
        }
        else {
            return res.status(500).json({ error: "Unknown error" });
        }
    }
});
exports.updateCategory = updateCategory;
const removeCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                error: "Invalid ObjectId",
                message: "The provided ID is not a valid ObjectId.",
            });
        }
        const categoryId = new mongoose_1.default.Types.ObjectId(id);
        const category = yield CategoryModel_1.default.findByIdAndDelete(categoryId);
        if (!category) {
            return res
                .status(404)
                .json({ error: "Category not found", message: "Category not found!" });
        }
        return res.status(200).json({ message: "Category removed successfully!" });
    }
    catch (error) {
        console.log("Error removing category:", error);
        if (error instanceof Error) {
            return res
                .status(500)
                .json({ error: "Internal error", message: error.message });
        }
        else {
            return res.status(500).json({ error: "Unknown error" });
        }
    }
});
exports.removeCategory = removeCategory;
//# sourceMappingURL=categoryController.js.map