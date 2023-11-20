// frontend/src/pages/LoginPage.js
import React from 'react';
import LoginForm from '../components/LoginForm';

const LoginPage = ({ onLogin }) => {
  return (
    <div>
      <h2>Login Page</h2>
      <LoginForm onLogin={onLogin} />
    </div>
  );
};

export default LoginPage;
