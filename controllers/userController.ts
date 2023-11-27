import { Request, Response } from "express";

const getAllUsers = (req: Request, res: Response): Response => {
  return res.send("Your Users!");
};

export { getAllUsers };
