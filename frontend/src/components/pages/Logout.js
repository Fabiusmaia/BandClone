import { useContext, useEffect } from "react";
import { Context } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate;
  const { handleLogout, authenticated } = useContext(Context);
  useEffect(() => {
    handleLogout();
  }, []);
  navigate("/login");

  return <div></div>;
}

export default Logout;
