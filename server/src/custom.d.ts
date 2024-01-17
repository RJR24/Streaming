import { Document } from "mongoose";
import { User as UserModel } from "../src/models/UserModel"

declare module "express" {
  interface Request {
    user?: UserModel & Document; 
  }
}