import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function UserDetails() {
  const { id } = useParams();
  const [data, setData] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/users/${id}`)
      .then((response) => {
        setData(response.data);
        console.log(response.data);
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <div>
      <h1>{data.name}</h1>
    </div>
  );
}
export default UserDetails;
