require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const bagRoutes = require("./routes/bagRoutes");

const app = express();

// ✅ CORS allowlist (localhost + jouw Render Vue domain)
const allowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "https://lays-vue.onrender.com",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (bv Postman)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS: " + origin));
    },
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ✅ Preflight requests
app.options("*", cors());

app.use(express.json());

const port = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch((err) => console.error("❌ MongoDB connection error:", err.message));

app.get("/", (req, res) => {
  res.json({ status: "success", message: "API running successfully" });
});

app.use("/bag", bagRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
