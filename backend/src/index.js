const express = require('express');
const app = express();

// Use the PORT provided by Render, default to 3000 locally
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
