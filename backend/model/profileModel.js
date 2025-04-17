import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  phone: { type: String, default: "" },           // Make optional
  branch: { type: String, default: "" },
  age: { type: Number, default: null },
  education: { type: String, default: "" },       // Make optional
  github: { type: String, default: "" },
  linkedin: { type: String, default: "" }
});



const profileModel = mongoose.models.Profile || mongoose.model("Profile", profileSchema)

export default profileModel;
