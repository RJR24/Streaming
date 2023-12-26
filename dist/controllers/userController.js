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
exports.uploadProfilePictureHandler = exports.getUsersList = exports.userMoviesList = exports.getMyListMovieDetails = exports.addToMyList = exports.removeFromMyList = exports.logoutUser = exports.getUserProfile = exports.updateUserProfile = exports.loginUser = exports.registerUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const joi_1 = __importDefault(require("joi"));
const UserModel_1 = __importDefault(require("../models/UserModel"));
const tokenBlackList_1 = __importDefault(require("../models/tokenBlackList"));
const saltRounds = 10;
const jwtSecret = process.env.JWT_SECRET;
const registerSchema = joi_1.default.object({
    name: joi_1.default.string().required(),
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string()
        .min(8)
        .required()
        .pattern(new RegExp('^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\\-={}[]|;:"<>,.?/~`])'))
        .message("Password must be at least 8 characters long and include at least one letter, one number, and one special character."),
    terms: joi_1.default.boolean().valid(true).required(),
});
const loginSchema = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().required(),
});
const updateUserProfileSchema = joi_1.default.object({
    name: joi_1.default.string().required(),
    email: joi_1.default.string().email().required(),
    phoneNumber: joi_1.default.string().allow(null, "").optional(),
    dateOfBirth: joi_1.default.date().iso().optional(),
});
const uploadProfilePictureSchema = joi_1.default.object({
    file: joi_1.default.object({
        path: joi_1.default.string().required(),
    }).required(),
});
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error, value } = registerSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                error: "Validation error",
                message: error.details[0].message,
            });
        }
        const { name, email, password } = value;
        const existingUser = yield UserModel_1.default.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                error: "User already exists",
                message: "A user with this email already exists",
            });
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, saltRounds);
        const newUser = yield UserModel_1.default.create({
            name,
            email,
            password: hashedPassword,
        });
        return res.status(201).json({
            message: "User registered successfully!",
            data: newUser,
        });
    }
    catch (error) {
        console.error("Error registering user:", error);
        return res.status(500).json({
            error: "Internal server error",
            message: error.message,
        });
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const user = yield UserModel_1.default.findOne({ email });
        if (!user) {
            return res.status(401).json({
                error: "Authentication failed",
                message: "Invalid email or password",
            });
        }
        const passwordMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({
                error: "Authentication failed",
                message: "Invalid email or password",
            });
        }
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, jwtSecret, {
            expiresIn: "1h",
        });
        return res.status(200).json({
            message: "Login successful!",
            token,
        });
    }
    catch (error) {
        console.error("Error logging in:", error);
        return res.status(500).json({
            error: "Internal server error",
            message: error.message,
        });
    }
});
exports.loginUser = loginUser;
const logoutUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.header("x-auth-token");
        if (!token) {
            return res.status(400).json({ error: "No token provided" });
        }
        const findToken = yield tokenBlackList_1.default.findOne({ token });
        if (findToken) {
            return res.status(401).json({
                error: "Token already blacklisted / User already logged out!",
            });
        }
        yield tokenBlackList_1.default.create({ token });
        return res.status(200).json({ message: "Logout successful" });
    }
    catch (error) {
        console.error("Error logging out:", error);
        return res.status(500).json({
            error: "Internal server error",
            message: error.message,
        });
    }
});
exports.logoutUser = logoutUser;
const getUserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        return res.status(200).json({
            message: "User profile retrieved successfully!",
            data: user,
        });
    }
    catch (error) {
        console.error("Error fetching user profile:", error);
        return res.status(500).json({
            error: "Internal server error",
            message: error.message,
        });
    }
});
exports.getUserProfile = getUserProfile;
const updateUserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { name, email, phoneNumber, dateOfBirth } = req.body;
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
        const { name: validatedName, email: validatedEmail, phoneNumber: validatedPhoneNumber, dateOfBirth: validatedDateOfBirth, } = value;
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        if (!userId) {
            return res.status(401).json({
                error: "Unauthorized",
                message: "User not authenticated",
            });
        }
        const updatedUser = yield UserModel_1.default.findByIdAndUpdate(userId, {
            name: validatedName,
            email: validatedEmail,
            phoneNumber: validatedPhoneNumber,
            dateOfBirth: validatedDateOfBirth,
        }, { new: true });
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
    }
    catch (error) {
        console.error("Error updating personal information:", error);
        return res.status(500).json({
            error: "Internal server error",
            message: error.message,
        });
    }
});
exports.updateUserProfile = updateUserProfile;
const uploadProfilePictureHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const { file } = req.body;
        console.log(file);
        if (!file) {
            return res.status(400).json({ error: "No file uploaded" });
        }
        const updatedUser = yield UserModel_1.default.findByIdAndUpdate(userId, { avatar: file.path }, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ error: "User not found" });
        }
        return res.status(200).json({
            message: "Profile picture uploaded successfully",
            user: updatedUser,
        });
    }
    catch (error) {
        console.error("Error uploading profile picture:", error);
        return res.status(500).json({
            error: "Internal server error",
            message: error.message,
        });
    }
});
exports.uploadProfilePictureHandler = uploadProfilePictureHandler;
const addToMyList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { movieId } = req.params;
    const userId = req.user._id;
    const { title, backdrop_path } = req.body;
    try {
        const user = yield UserModel_1.default.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        if (!user.myList.some((movie) => movie.id === movieId)) {
            user.myList.push({ id: movieId, title, imageUrl: backdrop_path });
            yield user.save();
        }
        return res.status(200).json({ message: "Movie added to My List" });
    }
    catch (error) {
        console.error("Error adding movie to My List:", error);
        return res.status(500).json({
            error: "Internal server error",
            message: error.message || "Unknown error occurred",
        });
    }
});
exports.addToMyList = addToMyList;
const removeFromMyList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { movieId } = req.params;
    const userId = req.user._id;
    try {
        const user = yield UserModel_1.default.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        const movieIndex = user.myList.findIndex((movie) => movie.id === movieId);
        if (movieIndex !== -1) {
            user.myList.splice(movieIndex, 1);
            yield user.save();
        }
        return res.status(200).json({ message: "Movie removed from My List" });
    }
    catch (error) {
        console.error("Error removing movie from My List:", error);
        return res.status(500).json({
            error: "Internal server error",
            message: error.message || "Unknown error occurred",
        });
    }
});
exports.removeFromMyList = removeFromMyList;
const getMyListMovieDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { movieId } = req.params;
    const userId = req.user._id;
    try {
        const user = yield UserModel_1.default.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        const isInMyList = user.myList.some((movie) => movie.id === movieId);
        if (isInMyList) {
            return res.status(200).json({
                isInMyList: true,
                movieDetails: user.myList.find((movie) => movie.id === movieId),
            });
        }
        else {
            return res.status(200).json({
                isInMyList: false,
            });
        }
    }
    catch (error) {
        console.error("Error fetching movie details from My List:", error);
        return res.status(500).json({
            error: "Internal server error",
            message: error.message || "Unknown error occurred",
        });
    }
});
exports.getMyListMovieDetails = getMyListMovieDetails;
const userMoviesList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { movieId } = req.params;
    const userId = req.user._id;
    try {
        const user = yield UserModel_1.default.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        const myListLength = user.myList.length;
        if (myListLength) {
            return res.status(200).json({ myList: user.myList });
        }
        else {
            return res.status(200).json({
                MyList: { myList: [] },
            });
        }
    }
    catch (error) {
        console.error("Error fetching movie List:", error);
        return res.status(500).json({
            error: "Internal server error",
            message: error.message || "Unknown error occurred",
        });
    }
});
exports.userMoviesList = userMoviesList;
const getUsersList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield UserModel_1.default.find({}, { password: 0 });
        return res.status(200).json({ users });
    }
    catch (error) {
        console.error("Error fetching users list:", error);
        return res.status(500).json({
            error: "Internal server error",
            message: error.message || "Unknown error occurred",
        });
    }
});
exports.getUsersList = getUsersList;
//# sourceMappingURL=userController.js.map