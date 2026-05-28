import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
  name: String,
  spec: String,
  exp: Number,
  img: String,
  available: Boolean,
  availability: {
    monday: { start: String, end: String, slots: [String] },
    tuesday: { start: String, end: String, slots: [String] },
    wednesday: { start: String, end: String, slots: [String] },
    thursday: { start: String, end: String, slots: [String] },
    friday: { start: String, end: String, slots: [String] },
    saturday: { start: String, end: String, slots: [String] },
    sunday: { start: String, end: String, slots: [String] },
  },
});

export default mongoose.model("Doctor", doctorSchema);