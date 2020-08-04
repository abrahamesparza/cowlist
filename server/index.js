const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static(path.join('public')));

app.get('/', (req, res) => {
  res.send('Hello - Server');
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});