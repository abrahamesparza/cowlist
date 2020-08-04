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
    if (err) console.error(err);
    else console.log(data);
  });
  res.send('Success');
});

app.post('/api/cows', (req, res) => {
  //handle api call to post new cow to cows list
  db.Cow.create({
    id: 7,
    name: 'Novi',
    description: 'Sassy black labradoodle puppy'
  }, (err, data) => {
    if (err) console.error(err);
    else console.log('New post', data)
  });
  res.send('Success');
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});