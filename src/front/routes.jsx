// src/front/routes.jsx
import React from 'react';
import { createBrowserRouter, createRoutesFromElements, Route, Navigate } from 'react-router-dom';
import { Layout } from './pages/Layout';
import { Home } from './pages/Home';
import { Single } from './pages/Single';
import { Demo } from './pages/Demo';
import { FlipAuth } from './components/FlipAuth';
import useGlobalReducer from './hooks/useGlobalReducer';

// Componente para proteger rutas
const ProtectedRoute = ({ children }) => {
  const { store } = useGlobalReducer();
  const isLogged = store.message !== null;
  return isLogged ? children : <Navigate to="/login" replace />;
};

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Ruta única para login y registro */}
      <Route path="/login" element={<FlipAuth />} />
      <Route path="/register" element={<FlipAuth />} />

      {/* Rutas protegidas bajo Layout */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
        errorElement={<Navigate to="/login" replace />}
      >
        <Route index element={<Home />} />
        <Route path="single/:theId" element={<Single />} />
        <Route path="demo" element={<Demo />} />
      </Route>

      {/* Cualquier otra ruta redirige a login */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </>
  )
);
