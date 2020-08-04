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

// const moolawn = new Cow({
//   id: 6,
//   name: 'MooLawn',
//   description: 'a legendary Chinese warrior from the Northern and Southern dynasties period (420–589) of Chinese history.'
// });

// moolawn.save((err, sil) => {
//   if (err) console.error(err);
//   else console.log('Saved:', sil);
// });

module.exports = {
  Cow
}