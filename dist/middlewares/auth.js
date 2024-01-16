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
exports.checkSuspended = exports.isAdmin = exports.isLoggedIn = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UserModel_1 = __importDefault(require("../models/UserModel"));
const tokenBlackList_1 = __importDefault(require("../models/tokenBlackList"));
const isLoggedIn = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let token = req.header("x-auth-token");
    if (!token) {
        res.status(401).json({ error: "Access denied. No token provided." });
        return;
    }
    const bearerPrefix = "Bearer ";
    if (token.startsWith(bearerPrefix)) {
        token = token.slice(bearerPrefix.length);
    }
    try {
        const findToken = yield tokenBlackList_1.default.findOne({ token });
        if (findToken) {
            res.status(401).json({ error: "Access denied. Token has been blacklisted." });
            return;
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const user = yield UserModel_1.default.findById(decoded.userId);
        if (!user) {
            res.status(401).json({ error: "Invalid token. User not found!" });
            return;
        }
        req.user = user;
        next();
    }
    catch (error) {
        res.status(401).json({ error: "Invalid token." });
    }
});
exports.isLoggedIn = isLoggedIn;
const isAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (!((_a = req.user) === null || _a === void 0 ? void 0 : _a.isAdmin)) {
        console.log(req);
        res.status(403).json({ error: "ACCESS DENIED! Admin permission needed." });
        return;
    }
    next();
});
exports.isAdmin = isAdmin;
const checkSuspended = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req);
        if (!req.user || !req.user._id) {
            return res.status(401).json({
                error: 'Unauthorized',
                message: 'User not authenticated',
            });
        }
        const foundUser = yield UserModel_1.default.findById(req.user._id);
        if (!foundUser || foundUser.suspended) {
            return res.status(403).json({
                error: 'Forbidden',
                message: 'User account is suspended',
            });
        }
        next();
        return Promise.resolve(res.status(200).json({
            message: 'User is not suspended',
        }));
    }
    catch (error) {
        console.error('Error checking user suspension:', error);
        return res.status(500).json({
            error: 'Internal Server Error',
            message: 'An unexpected error occurred',
        });
    }
});
exports.checkSuspended = checkSuspended;
//# sourceMappingURL=auth.js.map