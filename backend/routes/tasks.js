// backend/routes/tasks.js
const express = require('express');
const Task = require('../models/task');

const router = express.Router();

// Get all tasks
router.get('/:id', async (req, res) => {
  console.log('reqreq',req);
  try {
    const tasks = await Task.find();
   return  res.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Create a new task
router.post('/:id', async (req, res) => {
  console.log('req',req.body)
  const { description, listId } = req.body;

  if (!description || !listId) {
    return res.status(400).json({ error: 'Description and listId are required for the task' });
  }

  try {
    const newTask = await Task.create({ description, listId });
    // res.status(201).json(newTask);
    return res.json(newTask) 
  } catch (error) {
    console.error('Error creating task:', error.message);
   return  res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.delete('/:id', async (req, res) => {
  const taskId = req.params.id;
  console.log('ree',req.params)

  try {
    const taskToRemove = await Task.findById(taskId);

    if (!taskToRemove) {
      return res.status(404).json({ message: 'Task not found' });
    }

    await taskToRemove.deleteOne();
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting task:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/drage/:id', async (req, res) => {
  console.log('req',req.body)
  const { _id, listId } = req.body;

  
  try {
    const newTask = await Task.findByIdAndUpdate({_id:_id},{
      $set:{
        'listId':listId
      }
    });
    console.log('draged',newTask)
    // res.status(201).json(newTask);
    return res.json(newTask) 
  } catch (error) {
    console.error('Error creating task:', error.message);
   return  res.status(500).json({ error: 'Internal Server Error' });
  }
});
module.exports = router;
