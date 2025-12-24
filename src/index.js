require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const bagRoutes = require('./routes/bagRoutes');

const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB Atlas'))
  .catch((err) => console.error('❌ MongoDB connection error:', err.message));

app.get('/', (req, res) => {
  res.json({ status: 'success', message: 'API running successfully' });
});

// 👇 dit is belangrijk
app.use('/bag', bagRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
