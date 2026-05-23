import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    password: { type: String, required: true },
    college: { type: String, default: "" },
    joinedAt: { type: Date, default: Date.now },
  },
  { collection: "users" } 
);

export default mongoose.model("User", userSchema);
