import React, { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Home = () => {
  const { store, dispatch } = useGlobalReducer();

  const loadMessage = async () => {
    try {
      // Elimina barras finales de la URL base
      const rawUrl = import.meta.env.VITE_BACKEND_URL || '';
      const backendUrl = rawUrl.replace(/\/+$/, '');

      const response = await fetch(`${backendUrl}/api/hello`);
      const data = await response.json();

      if (response.ok) {
        dispatch({ type: 'set_hello', payload: data.message });
      }

      return data;
    } catch (error) {
      throw new Error(
        `Could not fetch the message from the backend. Please ensure your Flask server is running on port 3001 and accessible at ${import.meta.env.VITE_BACKEND_URL}`
      );
    }
  };

  useEffect(() => {
    loadMessage();
  }, []);

  return (
    <div className="text-center mt-5">
      <h1 className="display-4">Hello Rigo!!</h1>
      <div className="alert alert-info">
        {store.message ? (
          <span>{store.message}</span>
        ) : (
          <span className="text-danger">
            Loading message from the backend...
          </span>
        )}
      </div>
    </div>
  );
};
