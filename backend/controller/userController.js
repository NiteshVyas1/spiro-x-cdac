import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../model/userModel.js";
import Profile from "../model/profileModel.js";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

// Route for user login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User doesn't exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = createToken(user._id);

      // Ensure profile exists
      let profile = await Profile.findOne({ userId: user._id });
      if (!profile) {
        profile = new Profile({ userId: user._id });
        await profile.save();
      }

      res.json({
        success: true,
        token,
        name: user.name,
        email: user.email,
        userId: user._id,
      });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Route for user register
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "User already exists" });
    }

    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Please enter a valid email" });
    }

    if (password.length < 8) {
      return res.json({ success: false, message: "Please enter a strong password" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({ name, email, password: hashedPassword });
    const user = await newUser.save();

    // Create an empty profile on registration
    const newProfile = new Profile({ userId: user._id });
    await newProfile.save();

    const token = createToken(user._id);

    res.json({ success: true, token, userId: user._id });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Route for resetting password
const resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    res.status(200).json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    console.error("Reset password error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Route to get user profile by userId
const getUserProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const profile = await Profile.findOne({ userId }).exec();

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    return res.status(200).json(profile);
  } catch (error) {
    console.error("Error fetching profile:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Route to update or create user profile
const updateUserProfile = async (req, res) => {
  try {

    const userId = req.params.userid;
    const { phone, branch, age, education, github, linkedin } = req.body;

    let profile = await Profile.findOne({ userId });

    if (profile) {
      profile.phone = phone;
      profile.branch = branch;
      profile.age = age;
      profile.education = education;
      profile.github = github;
      profile.linkedin = linkedin;

      await profile.save();

      return res.status(200).json({ message: "Profile updated successfully", profile });
    } else {
      profile = new Profile({
        userId,
        phone,
        branch,
        age,
        education,
        github,
        linkedin,
      });

      await profile.save();

      return res.status(201).json({ message: "Profile created successfully", profile });
    }
  } catch (error) {
    console.error("Error updating profile:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export { loginUser, registerUser, resetPassword, getUserProfile, updateUserProfile };
