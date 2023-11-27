import { Request, Response } from "express";

const getAllCategories = (req: Request, res: Response) => {
  res.send("Your Categories!");
};

export { getAllCategories };
