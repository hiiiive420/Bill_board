import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import authRoutes from "./routes/authRoutes.js";
import testRoutes from "./routes/testRoutes.js";
import bill from "./routes/billboardRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";

dotenv.config();


const app = express();

// 🛡️ Security middleware
app.use(helmet());
app.use(express.json());

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

// 🚫 Rate limiter
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
}));


// Test route
app.get("/", (req, res) => {
  res.send("API running securely 🚀");
});
app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);
app.use("/api/billboards",bill);
app.use("/api/contact", contactRoutes);

// DB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Start server
app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
