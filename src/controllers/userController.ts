/// <reference path="../custom.d.ts" />

import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "../models/UserModel";
import TokenBlackList from "../models/tokenBlackList";

const saltRounds = 10;
const jwtSecret = process.env.JWT_SECRET!;

const registerUser = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    // Check if the user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        error: "User already exists",
        message: "A user with this email already exists",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new user
    const newUser = await UserModel.create({
      username,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      message: "User registered successfully!",
      data: newUser,
    });
  } catch (error: unknown) {
    console.error("Error registering user:", error);
    return res.status(500).json({
      error: "Internal server error",
      message: (error as Error).message,
    });
  }
};

const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(401).json({
        error: "Authentication failed",
        message: "Invalid email or password",
      });
    }

    // Compare the provided password with the hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({
        error: "Authentication failed",
        message: "Invalid email or password",
      });
    }

    // Generate a JWT token for authentication
    const token = jwt.sign({ userId: user._id }, jwtSecret, {
      expiresIn: "1h", // Token expiration time
    });

    return res.status(200).json({
      message: "Login successful!",
      token,
    });
  } catch (error: unknown) {
    console.error("Error logging in:", error);
    return res.status(500).json({
      error: "Internal server error",
      message: (error as Error).message,
    });
  }
};

const logoutUser = async (req: Request, res: Response) => {
  try {
    const token = req.header("x-auth-token");

    if (!token) {
      return res.status(400).json({ error: "No token provided" });
    }

    // Check if the token is in the blacklist
    const findToken = await TokenBlackList.findOne({ token });

    if (findToken) {
      return res.status(401).json({
        error: "Token already blacklisted / User already logged out!",
      });
    }

    // Add the token to the blacklist
    await TokenBlackList.create({ token });

    return res.status(200).json({ message: "Logout successful" });
  } catch (error: unknown) {
    console.error("Error logging out:", error);
    return res.status(500).json({
      error: "Internal server error",
      message: (error as Error).message,
    });
  }
};

const getUserProfile = async (req: Request, res: Response) => {
  try {
    // my middleware extracts user information from the token
    const user = req.user;

    return res.status(200).json({
      message: "User profile retrieved successfully!",
      data: user,
    });
  } catch (error: unknown) {
    console.error("Error fetching user profile:", error);
    return res.status(500).json({
      error: "Internal server error",
      message: (error as Error).message,
    });
  }
};
const updateUserProfile = async (req: Request, res: Response) => {
  try {
    const { username, email } = req.body;
    const userId = req.user?._id;

    if (!userId) {
      return res.status(401).json({
        error: "Unauthorized",
        message: "User not authenticated",
      });
    }

    // Update user profile
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { username, email },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        error: "Not Found",
        message: "User not found",
      });
    }

    return res.status(200).json({
      message: "User profile updated successfully!",
      data: updatedUser,
    });
  } catch (error: unknown) {
    console.error("Error updating user profile:", error);
    return res.status(500).json({
      error: "Internal server error",
      message: (error as Error).message,
    });
  }
};

export {
  registerUser,
  loginUser,
  updateUserProfile,
  getUserProfile,
  logoutUser,
};
