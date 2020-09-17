const mongoose = require('mongoose');
const db = mongoose.connection;

mongoose.connect('mongodb://localhost/cowlist', {useNewUrlParser: true});

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('Connected to mongodb'));

const cowSchema =  new mongoose.Schema({
  id: Number,
  name: String,
  description: String
});

const Cow = mongoose.model('Cow', cowSchema);

module.exports = {
  Cow
}