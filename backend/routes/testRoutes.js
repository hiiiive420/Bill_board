import express from "express";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/admin", protect, adminOnly, (req, res) => {
  res.json({ msg: "Admin access granted 🔥" });
});

export default router;