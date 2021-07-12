import mongoose from "mongoose";

const notificationSchema = mongoose.Schema(
  {
    data: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("notifications", notificationSchema);
