import express from "express";
import {
  createBillboard,
  deleteBillboard,
  getAllBillboards,
  getInDemandBillboards,
  updateBillboard,
} from "../controllers/billboardController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.post("/", protect, adminOnly, upload.single("image"), createBillboard);
router.put("/:id", protect, adminOnly, upload.single("image"), updateBillboard);
router.delete("/:id", protect, adminOnly, deleteBillboard);

router.get("/in-demand", getInDemandBillboards);
router.get("/", getAllBillboards);

export default router;
