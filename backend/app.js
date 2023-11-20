// backend/app.js
const express = require('express');
const cors = require('cors');
const { mongoose, db } = require('./models/db');
const listsRouter = require('./routes/lists');
const tasksRouter = require('./routes/tasks');
const userRouter = require('./routes/user')

const app = express();
const PORT = process.env.PORT || 3002;
app.use(cors());
app.use(express.json());

app.use('/lists', listsRouter);
app.use('/tasks', tasksRouter);
app.use('/user',userRouter)
// app.use('/', (req,res)=>{
//   res.send("hi rahul")
// });

// Listen directly, assuming a reliable and fast database connection
app.listen(PORT, () => {
  console.log('Server is running on port', PORT);
});

// Handle database connection errors
db.on('error', (err) => {
  console.error('MongoDB connection error:', err);
  process.exit();
});

// Log when the database connection is successfully opened
db.once('open', () => {
  console.log('Connected to MongoDB');
});
