import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './LoginForm';
import { UserContext } from '../../UserContext';

const Login = () => {
  const { login } = React.useContext(UserContext);
  if (login) return <Navigate to="/user" />;
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
      <div className="hidden lg:block bg-cover bg-no-repeat bg-center " style={{ backgroundImage: "url('/src/Assets/login.jpg')" }}></div>

      <div className="flex items-center justify-center p-4 lg:p-8 w-full">
        <div className="w-full max-w-md">
          {' '}
          <Routes>
            <Route path="/" element={<LoginForm />} />
          </Routes>
        </div>
      </div>
    </section>
  );
};

export default Login;
