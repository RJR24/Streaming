import { Request, Response } from "express";
import CategoryModel from "../models/CategoryModel";
import mongoose from "mongoose";

const createCategory = async (req: Request, res: Response) => {
  try {
    const { title, description } = req.body;
    const newCategory = await CategoryModel.create({ title, description });
    return res
      .status(201)
      .json({ message: "Category created successfully!", data: newCategory });
  } catch (error: unknown) {
    console.log("Error creating category:", error);
    return res.status(500).json({
      error: "Error creating category",
      message: (error as Error).message,
    });
  }
};

const getAllCategories = async (req: Request, res: Response) => {
  try {
    const categoriesList = await CategoryModel.find();
    return res.status(200).json({ data: categoriesList });
  } catch (error: unknown) {
    console.log("Error fetching categories:", error);
    return res.status(500).json({
      error: "Error fetching categories",
      message: (error as Error).message,
    });
  }
};

const updateCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Validate that id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        error: "Invalid ObjectId",
        message: "The provided ID is not a valid ObjectId.",
      });
    }

    const categoryId = new mongoose.Types.ObjectId(id);
    const { title, description } = req.body;
    const category = await CategoryModel.findByIdAndUpdate(
      categoryId,
      { title, description },
      { new: true }
    );

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
  } catch (error: unknown) {
    console.log("Error updating category:", error);
    if (error instanceof Error) {
      return res.status(500).json({
        error: "Error updating category",
        message: error.message,
      });
    } else {
      return res.status(500).json({ error: "Unknown error" });
    }
  }
};

const removeCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Validate that id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        error: "Invalid ObjectId",
        message: "The provided ID is not a valid ObjectId.",
      });
    }

    // Convert the string id to ObjectId
    const categoryId = new mongoose.Types.ObjectId(id);

    const category = await CategoryModel.findByIdAndDelete(categoryId);

    if (!category) {
      return res
        .status(404)
        .json({ error: "Category not found", message: "Category not found!" });
    }

    return res.status(200).json({ message: "Category removed successfully!" });
  } catch (error: unknown) {
    console.log("Error removing category:", error);
    if (error instanceof Error) {
      return res
        .status(500)
        .json({ error: "Internal error", message: error.message });
    } else {
      return res.status(500).json({ error: "Unknown error" });
    }
  }
};
export { createCategory, getAllCategories, updateCategory, removeCategory };
