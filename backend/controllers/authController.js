import otpGenerator from "otp-generator";
import Otp from "../models/Otp.js";
import { sendEmail } from "../config/email.js";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

import { validationResult } from "express-validator";

const handleValidation = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors });
    return true;
  }
};


// 🔐 LOGIN ADMIN
import jwt from "jsonwebtoken";


export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ msg: "All fields required" });
    }

    const admin = await User.findOne({ email, role: "admin" });

    if (!admin) {
      return res.status(400).json({ msg: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid email or password" });
    }

    // 🔐 JWT Token
    const token = jwt.sign(
      {
        id: admin._id,
        role: admin.role
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      msg: "Login successful",
      token
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};

// 📌 SEND OTP
import crypto from "crypto";

export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ msg: "Email required" });
    }

    // 🔒 Check if admin already exists
    const existingAdmin = await User.findOne({ role: "admin" });
    if (existingAdmin) {
      return res.status(400).json({ msg: "Admin already exists" });
    }

    // 🚫 Limit: 1 OTP per 60 seconds
    const recentOtp = await Otp.findOne({
      email,
      createdAt: { $gt: Date.now() - 60 * 1000 }
    });

    if (recentOtp) {
      return res.status(429).json({ msg: "Wait before requesting another OTP" });
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // 🔐 Hash OTP
    const hashedOtp = crypto
      .createHash("sha256")
      .update(otp)
      .digest("hex");

    // Delete old OTPs
    await Otp.deleteMany({ email });

    // Save new OTP
    await Otp.create({
      email,
      otp: hashedOtp,
      expiresAt: Date.now() + 5 * 60 * 1000
    });

    // Send email
    await sendEmail(email, "Your OTP Code", `Your OTP is: ${otp}`);

    res.json({ msg: "OTP sent securely" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// 📌 VERIFY OTP
export const verifyOtpAndRegister = async (req, res) => {
  try {
    const { email, otp, password } = req.body;

    if (!email || !otp || !password) {
      return res.status(400).json({ msg: "All fields required" });
    }

    const record = await Otp.findOne({ email });

    if (!record) {
      return res.status(400).json({ msg: "No OTP found" });
    }

    // 🔐 Hash incoming OTP
    const hashedOtp = crypto
      .createHash("sha256")
      .update(otp)
      .digest("hex");

    if (record.otp !== hashedOtp) {
      return res.status(400).json({ msg: "Invalid OTP" });
    }

    if (record.expiresAt < Date.now()) {
      return res.status(400).json({ msg: "OTP expired" });
    }

    // Prevent multiple admins
    const existingAdmin = await User.findOne({ role: "admin" });
    if (existingAdmin) {
      return res.status(400).json({ msg: "Admin already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    const admin = await User.create({
      email,
      password: hashedPassword,
      role: "admin"
    });

    // Delete OTP after use
    await Otp.deleteMany({ email });

    res.json({ msg: "Admin created securely", admin });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};