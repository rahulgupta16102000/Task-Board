// frontend/src/components/ListBoard.js
import React, { useState, useEffect } from 'react';
import List from './List';
import './ListBoard.css'
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useNavigate } from 'react-router-dom';

function ListBoard() {
  const navigate = useNavigate()
  const [lists, setLists] = useState([]);
  const [newListName, setNewListName] = useState('');


  const fetchLists = async () => {
    try {
      const response = await fetch('http://localhost:3002/lists');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setLists(data);
    } catch (error) {
      console.error('Error fetching lists:', error);
    }
  };
  useEffect(() => {
    fetchLists()
  }, []);

  const handleNewListSubmit = async (e) => {
    e.preventDefault();
  
    try {
      console.log('Submitting new list...');
      const response = await fetch('http://localhost:3002/lists', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newListName }),
      });
  
      console.log('Response:', response); // Log the response
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const newList = await response.json();
  
      setLists((prevLists) => [...prevLists, newList]);
      setNewListName('');
    } catch (error) {
      console.error('Error creating list:', error);
      // Handle the error (e.g., display an error message)
    }
  };
  const handleUpdateList = (updatedList) => {
    // Find the index of the updated list in the current state
    const index = lists.findIndex((list) => list._id === updatedList._id);
    
    // Create a new array with the updated list
    const updatedLists = [...lists];
    updatedLists[index] = updatedList;

    // Set the updated array as the new state
    setLists(updatedLists);
  };

  const handleTaskDrag = async (draggedTask, newListId) => {
    console.log('draggedTask, newListId',draggedTask, newListId)

    // Implement logic to update the backend with the new list ID for the dragged task
    try {
      const response = await fetch(
        `http://localhost:3002/tasks/drage/${draggedTask._id}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({_id:draggedTask._id, listId: newListId }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      console.log('resp'.response)
      // Fetch updated lists after updating the backend
      fetchLists();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleLogOut=()=>{
     
      // revoke token, stop refresh timer, publish null to user subscribers and redirect to login page
      //  localStorage.removeItem("user");
      //  userSubject.next(null);
       navigate("/login");
   
  }
console.log(lists)
  return (
    <DndProvider backend={HTML5Backend}>
    <div>
      <button onClick={()=>handleLogOut()}> LogOut</button>
    </div>
    <div className="ListBoard">
      <div>
        <h2>Create a New List</h2>
        <form onSubmit={handleNewListSubmit}>
          <label>
            Name:
            <input
              type="text"
              value={newListName}
              onChange={(e) => setNewListName(e.target.value)}
            />
          </label>
          <button type="submit">Create List</button>
        </form>
      </div>

        <h2>All Lists</h2>
      <div className='alllists'>
        {lists.map((list) => (
          <List
            key={list._id}
            list={list}
            onUpdateList={handleUpdateList}
            onTaskDrag={handleTaskDrag}
          />
        ))}
      </div>
    </div>
  </DndProvider>
  );
}

export default ListBoard;
