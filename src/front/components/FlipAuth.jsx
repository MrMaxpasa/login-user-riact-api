import React, { useState } from 'react';
import useGlobalReducer from '../hooks/useGlobalReducer';
import { useNavigate } from 'react-router-dom';
import '../styles/auth.css';

export const FlipAuth = () => {
  const { dispatch } = useGlobalReducer();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '', name: '' });
  const [isRegister, setIsRegister] = useState(false);
  const backendUrl = import.meta.env.VITE_BACKEND_URL.replace(/\/+$/, '');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    const path = isRegister ? '/api/register' : '/api/login';
    const body = isRegister
      ? { email: form.email, password: form.password }
      : { email: form.email, password: form.password };
    const res = await fetch(`${backendUrl}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    if (!res.ok) return alert('Error');
    dispatch({ type: 'set_hello', payload: 'Autenticado' });
    navigate('/');
  };

  return (
    <div className="wrapper">
      <label className="switch">
        <input
          type="checkbox"
          className="toggle"
          checked={isRegister}
          onChange={() => setIsRegister(!isRegister)}
        />
        <span className="slider"></span>
        <span className="card-side"></span>
        <div className="flip-card__inner">
          <div className="flip-card__front">
            <div className="title">Log in</div>
            <form className="flip-card__form" onSubmit={handleSubmit}>
              <input
                className="flip-card__input"
                name="email"
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
              />
              <input
                className="flip-card__input"
                name="password"
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
              />
              <button className="flip-card__btn">Let`s go!</button>
            </form>
          </div>
          <div className="flip-card__back">
            <div className="title">Sign up</div>
            <form className="flip-card__form" onSubmit={handleSubmit}>
              <input
                className="flip-card__input"
                name="name"
                type="text"
                placeholder="Name"
                value={form.name}
                onChange={handleChange}
              />
              <input
                className="flip-card__input"
                name="email"
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
              />
              <input
                className="flip-card__input"
                name="password"
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
              />
              <button className="flip-card__btn">Confirm!</button>
            </form>
          </div>
        </div>
      </label>
    </div>
  );
};