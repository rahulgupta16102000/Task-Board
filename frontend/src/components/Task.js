import React, { useState } from 'react';
import { useDrag } from 'react-dnd';
import './Task.css'
const Task = ({ task, onTaskDrag,onCompleted }) => {
  const [completionStatus, setCompletionStatus] = useState(task.completed);
  console.log('task',task)
  const handleStatusChange = () => {
    // const newStatus = !completionStatus;
    // setCompletionStatus(newStatus);

    onCompleted(task._id)
    // Update the completion status on the server
    // You may need to send a request to your backend to update the task's completion status
  };

  const [{ isDragging }, drag] = useDrag({
    type: 'task', // Define the type here
    item: { task },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        onTaskDrag(item.task, dropResult.listId);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
   console.log('isDragging',isDragging)
  return (
    <div className={`Task ${isDragging ? 'dragging' : ''}`} ref={drag}>
      <p>{task.description}</p>
      <input
        type="checkbox"
        checked={completionStatus}
        onChange={handleStatusChange}
      />
    </div>
  );
};

export default Task;
