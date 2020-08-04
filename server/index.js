const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const db = require('../database/index')

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static(path.join('public')));

app.get('/', (req, res) => {
  res.end();
});

app.get('/api/cows', (req, res) => {
  //handle api call to get all cows from list
  db.Cow.find({}, (err, data) => {
    if (err) {
      res.status(500).send(err)
    }
    else {
      res.status(200).send(data)
    }
  });
});

app.post('/api/cows', (req, res) => {
  //handle api call to post new cow to cows list
  let data = req.body;

  db.Cow.create({
    name: data.name,
    description: data.description
  }, (err, data) => {
    if (err) {
      res.status(500).send(err)
    }
    else {
      res.status(200).send(data);
    }
  });
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});