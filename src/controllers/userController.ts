/// <reference path="../custom.d.ts" />

import { Request, Response, RequestParamHandler  } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Joi from "joi";

import UserModel, { IUser } from "../models/UserModel";
import TokenBlackList from "../models/tokenBlackList";

// import  { IUser } from '../models/UserModel'; // Update the path accordingly
const saltRounds = 10;
const jwtSecret = process.env.JWT_SECRET!;

// Validation schema for user registration
const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(8)
    .required()
    .pattern(
      new RegExp(
        '^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\\-={}[]|;:"<>,.?/~`])'
      )
    )
    .message(
      "Password must be at least 8 characters long and include at least one letter, one number, and one special character."
    ),
  terms: Joi.boolean().valid(true).required(),
});

// Validation schema for user login
const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

// Validation schema for updating user profile
const updateUserProfileSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phoneNumber: Joi.string().allow(null, "").optional(), // Optional, can be null or empty
  dateOfBirth: Joi.date().iso().optional(), // Optional date in ISO format
});

// Define Joi schema for updateProfilePicture endpoint
const uploadProfilePictureSchema = Joi.object({
  file: Joi.object({
    path: Joi.string().required(),
  }).required(),
});

// Extend the existing Request type to include the 'file' property
interface RequestWithFile extends Request {
  file: {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    size: number;
    destination: string;
    filename: string;
    path: string;
  };
  params: {
    userId: string;
  };
 
}

///////////////////////////////

const registerUser = async (req: Request, res: Response) => {
  try {
    const { error, value } = registerSchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        error: "Validation error",
        message: error.details[0].message,
      });
    }

    const { name, email, password } = value;

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
      name,
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
    const { error, value } = loginSchema.validate(req.body);
    console.log(error, value);

    if (error) {
      return res.status(400).json({
        error: "Validation error",
        message: error.details[0].message,
      });
    }

    const { email, password } = value;

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
    // middleware extracts user information from the token
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
    // Extract data from request body
    const { name, email, phoneNumber, dateOfBirth } = req.body;

    // Validate the data using Joi schema
    const { error, value } = updateUserProfileSchema.validate({
      name,
      email,
      phoneNumber,
      dateOfBirth,
    });

    if (error) {
      return res.status(400).json({
        error: "Validation error",
        message: error.details[0].message,
      });
    }

    // Extract validated data
    const {
      name: validatedName,
      email: validatedEmail,
      phoneNumber: validatedPhoneNumber,
      dateOfBirth: validatedDateOfBirth,
    } = value;

    // Get the user ID from the authenticated user
    const userId = req.user?._id;

    // Ensure the user is authenticated
    if (!userId) {
      return res.status(401).json({
        error: "Unauthorized",
        message: "User not authenticated",
      });
    }

    // Update user's personal information in the database
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      {
        name: validatedName,
        email: validatedEmail,
        phoneNumber: validatedPhoneNumber,
        dateOfBirth: validatedDateOfBirth,
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        error: "Not Found",
        message: "User not found",
      });
    }

    return res.status(200).json({
      message: "Personal information updated successfully!",
      data: updatedUser,
    });
  } catch (error: unknown) {
    console.error("Error updating personal information:", error);
    return res.status(500).json({
      error: "Internal server error",
      message: (error as Error).message,
    });
  }
};

const uploadProfilePicture  = async (
  req: RequestWithFile,
  res: Response
): Promise<Response<any, Record<string, any>>> => {
  try {
    const userId = req.params.userId; // Extract userId from request parameters
    const { file } = req.body;

    console.log(file);
    
    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { avatar: file.path }, // Assuming you store the file path in 'file.path'
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    return res
      .status(200)
      .json({
        message: "Profile picture uploaded successfully",
        user: updatedUser,
      });
  } catch (error: any) {
    console.error("Error uploading profile picture:", error);
    return res.status(500).json({
      error: "Internal server error",
      message: error.message,
    });
  }
};

const addToMyList = async (req: Request, res: Response) => {
  const { movieId } = req.params;
  const userId = req.user._id; // user information stored in req.user
  const { title, backdrop_path } = req.body;

  try {
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Add the movieId to the user's myList
    if (!user.myList.some((movie) => movie.id === movieId)) {
      user.myList.push({ id: movieId, title, imageUrl: backdrop_path });
      await user.save();
    }

    return res.status(200).json({ message: "Movie added to My List" });
  } catch (error: any) {
    console.error("Error adding movie to My List:", error);
    return res.status(500).json({
      error: "Internal server error",
      message: error.message || "Unknown error occurred",
    });
  }
};

const removeFromMyList = async (req: Request, res: Response) => {
  const { movieId } = req.params;
  const userId = req.user._id;

  try {
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Remove the movieId from the user's myList
    const movieIndex = user.myList.findIndex((movie) => movie.id === movieId);
    if (movieIndex !== -1) {
      user.myList.splice(movieIndex, 1);
      await user.save();
    }

    return res.status(200).json({ message: "Movie removed from My List" });
  } catch (error: any) {
    console.error("Error removing movie from My List:", error);
    return res.status(500).json({
      error: "Internal server error",
      message: error.message || "Unknown error occurred",
    });
  }
};

const getMyListMovieDetails = async (req: Request, res: Response) => {
  const { movieId } = req.params;
  const userId = req.user._id;

  try {
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the movieId is in the user's myList
    const isInMyList = user.myList.some((movie) => movie.id === movieId);

    if (isInMyList) {
      return res.status(200).json({
        isInMyList: true,
        movieDetails: user.myList.find((movie) => movie.id === movieId),
      });
    } else {
      return res.status(200).json({
        isInMyList: false,
      });
    }
  } catch (error: any) {
    console.error("Error fetching movie details from My List:", error);
    return res.status(500).json({
      error: "Internal server error",
      message: error.message || "Unknown error occurred",
    });
  }
};

const userMoviesList = async (req: Request, res: Response) => {
  const { movieId } = req.params;
  const userId = req.user._id;

  try {
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the movieId is in the user's myList
    const myListLength = user.myList.length;
    // console.log(MyList)
    if (myListLength) {
      return res.status(200).json({ myList: user.myList });
    } else {
      return res.status(200).json({
        MyList: { myList: [] },
      });
    }
  } catch (error: any) {
    console.error("Error fetching movie List:", error);
    return res.status(500).json({
      error: "Internal server error",
      message: error.message || "Unknown error occurred",
    });
  }
};

const getUsersList = async (req: Request, res: Response) => {
  try {
    const users = await UserModel.find({}, { password: 0 });

    return res.status(200).json({ users });
  } catch (error: any) {
    console.error("Error fetching users list:", error);
    return res.status(500).json({
      error: "Internal server error",
      message: error.message || "Unknown error occurred",
    });
  }
};

export {
  registerUser,
  loginUser,
  updateUserProfile,
  getUserProfile,
  logoutUser,
  removeFromMyList,
  addToMyList,
  getMyListMovieDetails,
  userMoviesList,
  getUsersList,
  uploadProfilePicture,
};
