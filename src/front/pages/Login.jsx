// src/front/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useGlobalReducer from '../hooks/useGlobalReducer';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { dispatch } = useGlobalReducer();  // hook importado por defecto
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    const backendUrl = import.meta.env.VITE_BACKEND_URL.replace(/\/+$/, '');
    const res = await fetch(`${backendUrl}/api/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    if (!res.ok) return alert('Login fallido');
    dispatch({ type: 'set_hello', payload: 'Autenticado' }); // placeholder tras login
    navigate('/');
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          className="form-control mb-3"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email"
          id="email"
          
        />
        <input
          type="password"
          name="password"
          className="form-control mb-3"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
          id='password'
        />
        <button className="btn btn-primary">Entrar</button>
      </form>
      <p className="mt-3">
        ¿No tienes cuenta? <a href="/register">Regístrate</a>
      </p>
    </div>
  );
};
