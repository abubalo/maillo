import mongoose from "mongoose";

export const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  profileImage: { type: String, required: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  lastLoggedin: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true },
  role: { type: String, default: "regular" },
  settings: {
    theme: { type: String, default: "light" },
    notifications: { type: Boolean, default: true },
  },
});

userSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
