import { createContext, useState, useEffect } from "react";
import axios from "axios";

const Context = createContext();

function AuthProvider({ children }) {
  const apiURL = process.env.REACT_APP_API_URL;
  const userId = localStorage.getItem("user_id");
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const expirationDate = localStorage.getItem("expiration-date");
  useEffect(() => {
    if (token && expirationDate > Date.now() / 1000) {
      setAuthenticated(true);
      console.log(expirationDate, Date.now() / 1000);
    } else {
      console.log(expirationDate, Date.now() / 1000);
      handleLogout();
    }
    setLoading(false);
  }, [authenticated]);

  function handleLogin() {
    setAuthenticated(true);
  }

  function handleLogout() {
    localStorage.clear();
    setAuthenticated(false);
  }
  if (loading) {
    return <h1>Loading...</h1>;
  } else {
    return (
      <Context.Provider
        value={{ authenticated, handleLogin, handleLogout, userId, apiURL }}
      >
        {children}
      </Context.Provider>
    );
  }
}

export { Context, AuthProvider };
