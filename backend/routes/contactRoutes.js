import express from "express";
import { body } from "express-validator";
import { sendContactInquiry } from "../controllers/contactController.js";

const router = express.Router();

router.post(
  "/",
  [
    body("name").trim().isLength({ min: 2 }).withMessage("Name is required."),
    body("email").trim().isEmail().withMessage("A valid email is required."),
    body("phone").optional({ checkFalsy: true }).trim().isLength({ min: 6 }).withMessage("Phone number is too short."),
    body("company").optional({ checkFalsy: true }).trim().isLength({ max: 80 }),
    body("campaignGoal").trim().isLength({ min: 2 }).withMessage("Campaign goal is required."),
    body("location").trim().isLength({ min: 2 }).withMessage("Preferred location is required."),
    body("budget").trim().isLength({ min: 2 }).withMessage("Budget is required."),
    body("timeline").trim().isLength({ min: 2 }).withMessage("Timeline is required."),
    body("message").trim().isLength({ min: 10 }).withMessage("Message should be at least 10 characters."),
  ],
  sendContactInquiry
);

export default router;
