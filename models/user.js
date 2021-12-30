import mongoose from "mongoose";

/* PetSchema will correspond to a collection in your MongoDB database. */
const UserSchema = new mongoose.Schema({
  email: {
    /* The name of this pet */

    type: String,
    required: [true, "Please provide an email."],
  },
  password: {
    type: String,
    required: [true, "Please provide valid password"],
  },
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
