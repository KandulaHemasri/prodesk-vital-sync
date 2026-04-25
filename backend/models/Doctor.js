import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
  name: String,
  spec: String,
  exp: Number,
  img: String,
  available: Boolean,
});

export default mongoose.model("Doctor", doctorSchema);