// frontend/src/components/LoginForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const LoginForm = ({ onLogin }) => {
    const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    // Implement your login logic here
    const loginData = { username, password };

    // Send login request to the backend
    if(username && password){

        try {
          const response = await fetch('http://localhost:3002/user/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData),
          });
    
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
    
          const userData = await response.json();
          localStorage.setItem("user", JSON.stringify(username));
          onLogin(userData);
          navigate('/lists')
        } catch (error) {
          console.error('Login failed:', error);
        }
    }else{
        alert('please put name and password')
    }
  };

  return (
    <div>
    <form onSubmit={handleLogin}>
      <label>
        Username:
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <button type="submit">Login</button>
    </form>
      <button onClick={()=>{navigate("/registration")}}>signUp</button>
      </div>
  );
};

export default LoginForm;
