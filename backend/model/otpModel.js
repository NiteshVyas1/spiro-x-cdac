import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
  email: { type: String, required: true },
  otp: { type: String, required: true },
  expiry: { type: Date, required: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
});

const OTP = mongoose.model("OTP", otpSchema);

export default OTP;
