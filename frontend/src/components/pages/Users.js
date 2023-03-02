import axios from "axios";
import { useContext, useEffect } from "react";
import { Context } from "../../Context/AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get(`https://localhost:3001/api/users/`)
      .then(function (response) {
        setUsers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div>
      {users.map((u) => {
        return (
          <div>
            <h1>{u.email}</h1>
          </div>
        );
      })}
    </div>
  );
}

export default Users;
