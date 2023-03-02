import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "../styling/userDetails.module.css";
import { useNavigate } from "react-router-dom";
import plusIcon from "../styling/32339.png";
import { Link } from "react-router-dom";
import { Context } from "../../Context/AuthContext";

function UserDetails() {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const albumsPerPage = 13;
  const [numberOfPages, setNumberOfPages] = useState(0);
  const { id } = useParams();
  const [data, setData] = useState({});
  const [albums, setAlbums] = useState([]);
  const { apiURL } = useContext(Context);

  useEffect(() => {
    axios
      .get(`${apiURL}/users/${id}/`, {
        headers: { "x-access-token": localStorage.getItem("token") },
        params: { pages: page, albumsPerPage: albumsPerPage },
      })
      .then((response) => {
        setData(response.data.user);
        setAlbums(response.data.albums);
        setNumberOfPages(Math.floor(response.data.albumsCount / albumsPerPage));
        console.log(response.data);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          navigate("/login");
        } else if (error.response.data.message === "jwt expired") {
          navigate("/logout");
        }
      });
  }, [page]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.albums}>
          {albums && (
            <>
              {albums.map((a) => {
                return (
                  <div className={styles.album}>
                    <Link to={`/album/${a._id}/${data.name}`}>
                      <img src={a.cover} className={styles.albumCover} />
                      <h3>{a.name}</h3>
                    </Link>{" "}
                  </div>
                );
              })}
              <Link to={`/panel/`}>
                <div className={styles.addAlbum}>
                  <img src={plusIcon}></img>
                </div>
                <h3>Add new album</h3>
              </Link>
            </>
          )}
        </div>
        <div className={styles.username}>
          <h1>{data.name}</h1>
        </div>
      </div>
      <div className={styles.pages}>
        {" "}
        <button
          disabled={page < 1 ? true : false}
          className={styles.previous}
          onClick={() =>
            setPage((previous) => {
              return previous - 1;
            })
          }
        >
          Previous
        </button>
        <button
          disabled={numberOfPages === page ? true : false}
          className={styles.next}
          onClick={() =>
            setPage((previous) => {
              return previous + 1;
            })
          }
        >
          Next
        </button>
      </div>
    </div>
  );
}
export default UserDetails;
