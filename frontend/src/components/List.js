import React, { useState } from 'react';
import Task from './Task';
import './list.css';
import { useDrop } from 'react-dnd';

function List({ list, onUpdateList, onTaskDrag }) {
  const id = list._id;
  const [newTaskName, setNewTaskName] = useState('');
  const [createTask, setCreateTask] = useState(false);

  const handleNewTaskSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3002/tasks/${list._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ description: newTaskName, listId: id }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const newTask = await response.json();

      // Update the state by creating a new object
      const updatedList = {
        ...list,
        tasks: [...(list.tasks || []), newTask],
      };

      // Call the parent component's callback to update the list
      onUpdateList(updatedList);
      setNewTaskName('');
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const [{ isOver }, drop] = useDrop({
    accept: 'task',
    drop: (item) => onTaskDrag(item.task, id),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });
 const  onCompleted =(id)=>{
      console.log('id',id)
      fetch(`http://localhost:3002/tasks/${id}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          // Assuming that list.tasks is an array, you may need to adjust this based on your data structure
          list.tasks = list.tasks.filter((task) => task._id !== id);
          // Call the parent component's callback to update the list
          onUpdateList(list);
        })
        .catch((error) => console.error('Error deleting task:', error));
       
 }
  return (
    <div className={`List ${isOver ? 'drag-over' : ''}`} ref={drop}>
      <h3>{list.name}</h3>
      <ul>
        {list.tasks &&
          list.tasks.map((task) => (
            <Task key={task.id} task={task} onTaskDrag={onTaskDrag} onCompleted={onCompleted}/>
          ))}
      </ul>
      {createTask && (
        <form onSubmit={handleNewTaskSubmit}>
          <label>
            Task Name:
            <input
              type="text"
              value={newTaskName}
              onChange={(e) => setNewTaskName(e.target.value)}
            />
          </label>
          <button type="submit">Create Task</button>
        </form>
      )}
      {!createTask && (
        <button onClick={() => setCreateTask(true)}>+</button>
      )}
    </div>
  );
}

export default List;
