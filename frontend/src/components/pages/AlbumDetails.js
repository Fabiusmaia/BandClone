import styles from "../styling/albumDetails.module.css";
import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { Context } from "../../Context/AuthContext";
import { useContext } from "react";

function AlbumDetails() {
  const { apiURL } = useContext(Context);
  const { id, name } = useParams();
  const [album, setAlbum] = useState({});
  useEffect(() => {
    axios
      .get(`${apiURL}/api/albums/${id}`, {
        headers: { "x-access-token": localStorage.getItem("token") },
      })
      .then((response) => {
        console.log(response.data.album);
        setAlbum(response.data.album);
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <div className={styles.container}>
      <img src={album.cover}></img>
      <h1>{album.name}</h1>
      <h3>
        by <span className={styles.userName}>{name}</span>
      </h3>
      {album.tracks && (
        <div className={styles.mediaPlayer}>
          {album.tracks.map((t) => {
            return (
              <div className={styles.track}>
                <p>{t.name}</p>
                <audio controls>
                  <source src={t.path} type="audio/mp3"></source>
                </audio>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default AlbumDetails;
