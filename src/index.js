require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const bagRoutes = require("./routes/bagRoutes");
const userRoutes = require("./routes/userRoutes");
const createAdmin = require("./createAdmin");

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://127.0.0.1:5173",
      "https://lays-vue.onrender.com",
      "https://lays-threejs.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json({ limit: "8mb" }));

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("Connected to MongoDB Atlas");
    await createAdmin();
    console.log("Admin ready: admin@admin.com / Admin");
  })
  .catch((err) => console.error("MongoDB connection error:", err.message));

app.get("/", (req, res) => {
  res.json({
    status: "success",
    message: "API running successfully",
  });
});

app.use("/bag", bagRoutes);
app.use("/user", userRoutes);

app.use("/api/v1/bag", bagRoutes);
app.use("/api/v1/user", userRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
