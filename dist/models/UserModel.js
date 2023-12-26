"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        default: "",
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    myList: [
        {
            id: {
                type: String,
                required: true,
            },
            title: {
                type: String,
                required: true,
            },
            imageUrl: {
                type: String,
                required: true,
            },
        },
    ],
    phoneNumber: {
        type: String,
    },
    dateOfBirth: {
        type: Date,
    },
    subscriptionStatus: {
        type: String,
        enum: ["free", "basic", "premium"],
        default: "free",
    },
}, {
    timestamps: true,
});
const UserModel = (0, mongoose_1.model)("User", userSchema);
exports.default = UserModel;
//# sourceMappingURL=UserModel.js.map