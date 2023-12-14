import { Schema, Document, model, Types } from "mongoose";

interface IUser extends Document {
  name: string;
  email: string;
  password: string; //  store hashed passwords
  avatar?: string; // URL or file path to user's avatar
  isAdmin: boolean;
  myList: String[]; // Array of movie IDs in the user's My List
}

const userSchema = new Schema<IUser>(
  {
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
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    myList: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

const UserModel = model<IUser>("User", userSchema);

export default UserModel;
