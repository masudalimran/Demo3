import mongoose from "mongoose";
const strSchema = new mongoose.Schema(
  {
    text: String,
  },
  {
    timestamps: true,
  }
);

const str = mongoose.model("String", strSchema);
export default str;
