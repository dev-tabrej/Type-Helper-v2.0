import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      minLength: 6,
      required: true,
    },
    email: {
      type: String,
      unique: true,
    },
    profilePic: {
      type: String,
      default: "",
    },
    results: [
      {
        typingType: {
          type: String,
          required: true,
        },
        accuracy: {
          type: Number,
          required: true,
        },
        wps: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
