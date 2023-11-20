// frontend/src/pages/RegistrationPage.js
import React from 'react';
import RegistrationForm from '../components/RegistrationForm';

const RegistrationPage = ({ onRegister }) => {
  return (
    <div>
      <h2>Registration Page</h2>
      <RegistrationForm onRegister={onRegister} />
    </div>
  );
};

export default RegistrationPage;
