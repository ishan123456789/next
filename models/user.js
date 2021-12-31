import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please provide an email."],
  },
  verified: {
    type: Boolean,
  },
  OTP: {
    type: String,
  },
  password: {
    type: String,
    required: [true, "Please provide valid password"],
  },
});

export const UserModel =
  mongoose.models.User || mongoose.model("User", UserSchema);
