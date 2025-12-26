require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const bagRoutes = require("./routes/bagRoutes");

const app = express();

const allowedOrigins = [
  "https://lays-vue.onrender.com",
  "http://localhost:5173",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Accept"],
    credentials: false,
    optionsSuccessStatus: 200,
  })
);

app.options("*", cors());

app.use(express.json());

const port = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error("MongoDB connection error:", err.message));

app.get("/", (req, res) => {
  res.json({ status: "success", message: "API running successfully" });
});

app.use("/bag", bagRoutes);

app.get("/health", (req, res) => {
  res.json({ ok: true, origin: req.headers.origin || null });
});

app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
