require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const bagRoutes = require('./routes/bagRoutes');

const app = express();

app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'http://127.0.0.1:5173',
      'https://lays-vue.onrender.com', // ✅ jouw online Vue
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // ✅ OPTIONS erbij
    allowedHeaders: ['Content-Type', 'Authorization'],    // ✅ nodig voor JSON
  })
);

// ✅ preflight
app.options('*', cors());

app.use(express.json());

const port = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB Atlas'))
  .catch((err) => console.error('❌ MongoDB connection error:', err.message));

app.get('/', (req, res) => {
  res.json({ status: 'success', message: 'API running successfully' });
});

app.use('/bag', bagRoutes);

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
