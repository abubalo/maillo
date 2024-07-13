import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: false },
  lastName: { type: String, required: false },
  profileImage: { type: String, required: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true },
  isAdmin: { type: Boolean, default: false },
  contacts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    }
  ],
  labels: [
    {
      name: { type: String, required: true },
      color: { type: String, required: false },
    }
  ],
  settings: {
    theme: { type: String, default: 'light' },
    notifications: { type: Boolean, default: true },
  },
  emails: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Email',
    }
  ],
});

UserSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;
