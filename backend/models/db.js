// backend/models/db.js
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/taskboarddb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to MongoDB');
});

db.on('error', (err) => {
  console.error(`MongoDB connection error: ${err}`);
  process.exit();
});

module.exports = { mongoose, db }; // export both mongoose and db
