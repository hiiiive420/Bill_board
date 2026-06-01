import { validationResult } from "express-validator";
import { sendEmail } from "../config/email.js";

export const sendContactInquiry = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ msg: "Please check the form fields.", errors: errors.array() });
  }

  const {
    name,
    email,
    phone,
    company,
    campaignGoal,
    location,
    budget,
    timeline,
    message,
  } = req.body;

  const recipient = process.env.CONTACT_EMAIL || process.env.EMAIL_USER;

  if (!recipient) {
    return res.status(500).json({ msg: "Contact email is not configured." });
  }

  const subject = `New billboard inquiry from ${name}`;
  const text = [
    "New Sign Art contact inquiry",
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone || "Not provided"}`,
    `Company: ${company || "Not provided"}`,
    `Campaign goal: ${campaignGoal}`,
    `Preferred location: ${location}`,
    `Budget: ${budget}`,
    `Timeline: ${timeline}`,
    "",
    "Message:",
    message,
  ].join("\n");

  await sendEmail(recipient, subject, text);

  return res.status(200).json({ msg: "Inquiry sent successfully." });
};
