import { Schema, Document, model } from "mongoose";

export interface ICategory extends Document {
  title: string;
  description?: string;
}

const categorySchema = new Schema<ICategory>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

const CategoryModel = model<ICategory>("Category", categorySchema);

export default CategoryModel;
