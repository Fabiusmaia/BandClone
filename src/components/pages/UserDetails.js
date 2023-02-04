import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "../styling/userDetails.module.css"

function UserDetails() {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [albums, setAlbums] = useState([])

  useEffect(() => {
    axios.get(`http://localhost:3001/api/users/${id}`, 
    {headers: { "x-access-token": localStorage.getItem("token") }  })
      .then((response) => {
        setData(response.data.user);
        setAlbums(response.data.albums)
        console.log(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className={styles.wrapper}>
    <div className={styles.container}>
      <div className={styles.albums}>
    {albums.map((a) => {
      return(
      <div className={styles.album}>
        <img src={a.cover} className={styles.albumCover}/>
        <h3>{a.name}</h3>
        </div>
      )
    })}
   
      </div>
      <div className={styles.username}>
      <h1>{data.name}</h1>
      </div>

    </div>
    </div>
  );
}
export default UserDetails;
