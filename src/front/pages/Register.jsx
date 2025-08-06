import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    const backendUrl = import.meta.env.VITE_BACKEND_URL.replace(/\/+$/, '');
    const res = await fetch(`${backendUrl}/api/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    if (!res.ok) return alert('Registro fallido');
    navigate('/login');
  };

  return (
    <div className="container mt-5">
      <h2>Regístrate</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" className="form-control mb-3" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
        <input type="password" className="form-control mb-3" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
        <button className="btn btn-success">Crear cuenta</button>
      </form>
      <p className="mt-3">
        ¿Ya tienes cuenta? <a href="/login">Inicia sesión</a>
      </p>
    </div>
  );
};