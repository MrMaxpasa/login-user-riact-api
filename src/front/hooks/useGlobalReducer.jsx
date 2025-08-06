// src/front/hooks/useGlobalReducer.jsx
import { useContext, useReducer, createContext } from "react";
import storeReducer, { initialStore } from "../store";

// Context para el estado global
const StoreContext = createContext();

// Provider que envuelve la app
export function StoreProvider({ children }) {
  const [store, dispatch] = useReducer(storeReducer, initialStore());
  return (
    <StoreContext.Provider value={{ store, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
}

// Hook personalizado: export por defecto
export default function useGlobalReducer() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useGlobalReducer debe usarse dentro de StoreProvider");
  }
  return context; // { store, dispatch }
}
