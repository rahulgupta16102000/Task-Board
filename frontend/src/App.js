// frontend/src/App.js
import   { useState } from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import ListBoard from './components/ListBoard';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
// import PrivateRoute from './components/PrivateRoute';

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
  };
  const handleRegister = (userData) => {
    setUser(userData);
  };
const isAuthenticated =()=>{
     if(user)return true;
     return false;
}
const PrivateRoute = ({   isAuthenticated  , children }) => {
  return isAuthenticated ? children : <Navigate to="/login" />;
};
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        <Route path="/registration" element={<RegistrationPage onRegister={handleRegister} />} />
        <Route
          path="/lists"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <ListBoard />
            </PrivateRoute>
          }
        />
        {/* Use PrivateRoute after login */}
        {/* <PrivateRoute path="/lists" element={<ListBoard />} isAuthenticated={isAuthenticated()} /> */}

        {/* Redirect to login if not authenticated */}
        <Route
          path="/"
          element={
            isAuthenticated() ? (
              <Navigate to="/lists" />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      
    </Routes>
    </BrowserRouter>
  );
}

export default App;
