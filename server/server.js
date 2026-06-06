import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import collegeRoutes from "./routes/collegeRoutes.js";
import compareRoutes from "./routes/compareRoutes.js";
import savedCollegeRoutes from "./routes/savedCollegeRoutes.js";
import reviewsRoutes from "./routes/reviewsRoutes.js";

import authMiddleware from "./middleware/authMiddleware.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());

const defaultAllowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "https://campusfind-lemon.vercel.app",
];

const allowedOrigins = (process.env.CLIENT_ORIGINS || "")
  .split(",")
  .map((origin) => origin.trim().replace(/\/$/, ""))
  .filter(Boolean);

const corsAllowedOrigins = [...new Set([...defaultAllowedOrigins, ...allowedOrigins])];

// cors config
app.use(
  cors({
    origin(origin, callback) {
      if (!origin || corsAllowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error(`CORS blocked origin: ${origin}`));
    },
    credentials: true,
  })
);

// ================= ROUTES =================

// PUBLIC ROUTES
app.use("/api/user", authRoutes); // login, signup
app.use("/api/colleges", collegeRoutes); // listing, details
app.use("/api/compare", compareRoutes); // compare colleges

// PROTECTED ROUTES
app.use("/api/saved_colleges", authMiddleware, savedCollegeRoutes);
app.use("/api/reviews", reviewsRoutes); // compare colleges

// server listens
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
