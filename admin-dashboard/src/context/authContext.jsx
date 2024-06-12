import { createContext, useEffect, useReducer } from "react";

const initialState = {
  admin:
    localStorage.getItem("admin") !== undefined
      ? JSON.parse(localStorage.getItem("admin"))
      : null,
  role: localStorage.getItem("role") || null,
  token: localStorage.getItem("token") || null,
};

export const authContext = createContext(initialState);

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        admin: null,
        role: null,
        token: null,
      };

    case "LOGIN_SUCCESS":
      return {
        admin: action.payload.admin,
        role: action.payload.role,
        token: action.payload.token,
      };

    case "LOGOUT":
      return {
        admin: null,
        role: null,
        token: null,
      };

    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    localStorage.setItem("admin", JSON.stringify(state.admin));
    localStorage.setItem("role", state.role);
    localStorage.setItem("token", state.token);
  }, [state]);

  return (
    <authContext.Provider
      value={{
        admin: state.admin,
        role: state.role,
        token: state.token,
        dispatch,
      }}
    >
      {children}
    </authContext.Provider>
  );
};
