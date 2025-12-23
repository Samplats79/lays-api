require('dotenv').config();
const express = require('express');

const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.json({
    status: 'success',
    message: 'API running successfully',
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
