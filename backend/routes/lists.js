// backend/routes/lists.js
const express = require('express');
const List = require('../models/list');

const router = express.Router();

// Get all lists
router.get('/', async (req, res) => {
  try {
    const aggregatedData = await List.aggregate([
      {
        $lookup: {
          from: 'tasks',
          localField: '_id',
          foreignField: 'listId',
          as: 'tasks'
        }
      }
    ]);

    console.log("aggregatedData", aggregatedData);
    return res.json(aggregatedData);  // Return the aggregated data as JSON response
  } catch (error) {
    console.error('Error during aggregation', error);
   return  res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Create a new list
router.post('/', async (req, res) => {
  const { name } = req.body;
console.log('name',name)
  if (!name) {
    return res.status(400).json({ error: 'Name is required for the list' });
  }

  try {
    const newList = await List.create({ name });
    console.log('newlist',newList)
    return res.json(newList) 
  } catch (error) {
    console.error('Error creating list:', error.message);
   return  res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
