import { Document } from "mongoose";
import { User as UserModel } from "./models/UserModel";

declare module "express" {
  interface Request {
    user?: UserModel & Document; 
  }
}