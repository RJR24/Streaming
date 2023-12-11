import { Schema, Document, model, Types } from "mongoose";

interface IUser extends Document {
  name: string;
  email: string;
  password: string; //  store hashed passwords
  avatar?: string; // URL or file path to user's avatar
  isAdmin: boolean;
  myList: Types.ObjectId[]; // Array of movie IDs in the user's My List
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
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
        type: Schema.Types.ObjectId,
        ref: "MovieModel", // Reference to the Movie model 
      },
    ],
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

const UserModel = model<IUser>("User", userSchema);

export default UserModel;
