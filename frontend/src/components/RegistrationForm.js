// frontend/src/components/RegistrationForm.js
import React, { useState } from 'react';
import {  useNavigate } from 'react-router-dom';
const RegistrationForm = ({ onRegister }) => {
    const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    // Implement your registration logic here
    const registrationData = { username, password };

  
    // Send registration request to the backend
    if(username && password){

        try {
          const response = await fetch('http://localhost:3002/user/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(registrationData),
          });
    
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
    
          const userData = await response.json();
          onRegister(userData);
           
          navigate('/login')
        } catch (error) {
          console.error('Registration failed:', error);
        }
    }else{
        alert('please enter and password')
    }
  };

  return (
    <div>

    <form onSubmit={handleRegister}>
      <label>
        Username:
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <button type="submit">Register</button>
    </form>
    <button onClick={()=>{navigate("/login")}}>Login</button>

    </div>
  );
};

export default RegistrationForm;
