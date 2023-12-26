import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/UserModel";
import TokenBlackList from "../models/tokenBlackList";

export const isLoggedIn = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  let token = req.header("x-auth-token");

  if (!token) {
    res.status(401).json({ error: "Access denied. No token provided." });
    return;
  }

  // Check for the "Bearer " prefix and remove it
  const bearerPrefix = "Bearer ";
  if (token.startsWith(bearerPrefix)) {
    token = token.slice(bearerPrefix.length);
  }

  try {
    const findToken = await TokenBlackList.findOne({ token });

    if (findToken) {
      res.status(401).json({ error: "Access denied. Token has been blacklisted." });
      return;
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
    const user = await User.findById(decoded.userId);

    if (!user) {
      res.status(401).json({ error: "Invalid token. User not found!" });
      return;
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token." });
  }
};

export const isAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  if (!req.user?.isAdmin) {
    console.log(req)
    res.status(403).json({ error: "ACCESS DENIED! Admin permission needed." });
    return;
  }

  next();
};
