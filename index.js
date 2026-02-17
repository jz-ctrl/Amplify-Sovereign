const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

// This is the 'Brain' for Miracle Spritz
app.get('/', (req, res) => {
  res.send('<h1>Miracle Spritz Engine Online</h1><p>Monitoring Field Athletics Traffic...</p>');
});

app.listen(port, () => {
  console.log('Engine listening on port ' + port);
});
