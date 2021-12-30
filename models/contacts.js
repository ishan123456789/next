import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide valid name."],
  },
  phoneNumber: {
    type: String,
    required: [true, "Please provide valid phone number"],
  },
  user: { type: mongoose.Types.ObjectId, ref: "User" }, // overriding _id with ObjectId
});

export default mongoose.models.ContactSchema ||
  mongoose.model("ContactSchema", ContactSchema);
