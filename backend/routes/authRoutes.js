import express from "express";
import { sendOtp, verifyOtpAndRegister ,sendResetOtp,resetPassword} from "../controllers/authController.js";
import { body } from "express-validator";

const router = express.Router();
import { loginAdmin } from "../controllers/authController.js";

router.post("/login", loginAdmin);

router.post(
  "/send-otp",
  body("email").isEmail(),
  sendOtp
);

router.post(
  "/verify-otp",
  [
    body("email").isEmail(),
    body("otp").isLength({ min: 6, max: 6 }),
    body("password").isLength({ min: 6 })
  ],
  verifyOtpAndRegister
);

router.post("/send-reset-otp", sendResetOtp);

router.post("/reset-password", resetPassword);
export default router;