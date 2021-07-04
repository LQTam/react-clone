import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    uuid: { type: String, required: true, unique: true },
    displayName: { type: String, required: true },
    email: { type: String, required: true, max: 500, unique: true },
    password: { type: String, required: true, min: 6 },
    photoURL: { type: String, default: "" },
    followers: { type: Array, default: [] },
    followings: { type: Array, default: [] },
    isAdmin: { type: Boolean, default: false },
    desc: { type: String, max: 50 },
    city: { type: String, max: 50 },
    from: { type: String, max: 50 },
    relationship: { type: Number, enum: [1, 2, 3] },
  },
  { timestamps: true }
);

export default mongoose.models("users", userSchema);
