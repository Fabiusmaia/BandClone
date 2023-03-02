import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { useRef } from "react";
import { Context } from "../../Context/AuthContext";
import {
  FaPlus,
  FaSmile,
  FaSadCry,
  FaFileUpload,
  FaMinus,
} from "react-icons/fa";
import styles from "../styling/panel.module.css";
function UserPanel() {
  const [errorPopUp, setErrorPopUp] = useState(false);
  const [successPopUp, setSuccessPopUp] = useState(false);
  const [message, setMessage] = useState("");
  const [cover, setCover] = useState("");
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState([]);
  const [albumImage, setAlbumImage] = useState();
  const [tracks, setTracks] = useState([]);
  const [sendingCover, setSendingCover] = useState(false);
  const [sendingTrackData, setSendingTrackData] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [toggleIcon, setToggleIcon] = useState(true);
  const [authenticated, apiURL] = useContext(Context); //
  const [data, setData] = useState({});
  const [albumName, setAlbumName] = useState("");
  const navigate = useNavigate();
  const userId = localStorage.getItem("user_id");
  let newStateArray = inputs.slice();
  const isMounted = useRef(false);

  useEffect(() => {
    axios
      .get(`${apiURL}/api/users/${userId}/`, {
        headers: { "x-access-token": localStorage.getItem("token") },
      })
      .then((response) => {
        setData(response.data.user);
      })

      .catch((error) => {
        if (error.response.status === 401) {
          navigate("/login");
        } else if (error.response.data.message === "jwt expired") {
          navigate("/logout");
        }
      });
  }, []);
  let formData = new FormData();
  formData.append("upload_preset", "b04ex0je");
  function handleSubmit(e) {
    console.log(inputs.length);
    if (inputs.length === 0) {
      e.preventDefault();

      setMessage("At least 1 track is required.");
      setErrorPopUp(true);
      setTimeout(() => {
        setErrorPopUp(false);
      }, 3000);
    } else {
      setLoading(true);
      setSendingTrackData(true);
      let promises = [];
      for (let i = 0; i < inputs.length; i++) {
        promises.push(
          new Promise((resolve, reject) => {
            let path = tracks[i].path;
            formData.append(`file`, path);
            axios
              .post(
                "https://api.cloudinary.com/v1_1/doaz7klln/video/upload",
                formData,
                {
                  headers: {},
                }
              )
              .then((response) => {
                let obj = tracks[i];
                obj.path = response.data.secure_url;
                console.log(tracks);
                resolve();
              });
          })
        );
      }

      Promise.all(promises).then(() => {
        console.log("all promises resolved!");
        setSendingCover(true);
        setSendingTrackData(false);
        formData.append("file", albumImage);
        axios
          .post(
            "https://api.cloudinary.com/v1_1/doaz7klln/image/upload",
            formData,
            {
              headers: {},
            }
          )
          .then((response) => {
            setSendingCover(false);
            setSendingTrackData(true);
            console.log(response.data.secure_url);
            setCover(response.data.secure_url);
          })
          .catch((error) => {
            setSendingCover(false);
            setSendingTrackData(true);
            setMessage("Error:", error.data.message);
          });
      });
    }
  }
  useEffect(() => {
    if (isMounted.current) {
      axios
        .post(
          `${apiURL}/api/albums/`,
          {
            name: albumName,
            cover: cover,
            userId: userId,
            tracks: [...tracks],
          },
          { headers: { "x-access-token": localStorage.getItem("token") } }
        )
        .then((response) => {
          console.log(response);
          setMessage(response.data.message);
          setSuccessPopUp(true);
          setTimeout(() => {
            setSuccessPopUp(false);
          }, 3000);
        })
        .catch((error) => {
          console.log(error, tracks);
          setMessage(error.data);
          setErrorPopUp(true);
          setTimeout(() => {
            setErrorPopUp(false);
          }, 3000);
        });
      setSendingTrackData(false);
      setLoading(false);
      setInputs([]);
      setTracks([]);
    } else {
      isMounted.current = true;
    }
  }, [cover]);

  function handleClick() {
    setToggle(true);
    setToggleIcon(false);

    if (toggle === true) {
      setToggle(false);
      setToggleIcon(true);
    }
    newStateArray = [1];
  }
  function addTrack(e, i) {
    let obj = tracks;
    obj[i].name = e.target.value;
    setTracks(obj);
    console.log(tracks);
    console.log(albumImage);
  }
  function setTrackFile(e, i) {
    let obj = tracks;
    console.log(obj[i]);
    obj[i].path = e.target.files[0];
    setTracks(obj);
  }
  function addInput(e) {
    setTracks([...tracks, { name: "", path: "" }]);
    newStateArray.push(inputs.length + 1);
    setInputs(newStateArray);
    console.log(albumImage);
    console.log(albumName);
  }
  return (
    <div className={styles.panelContainer}>
      {!authenticated && (
        <div>
          <p>401 unauthorized</p>
        </div>
      )}
      {authenticated && (
        <div>
          {loading && (
            <div className={styles.loading}>
              {sendingCover && <h2>Sending album cover to the server...</h2>}
              {sendingTrackData && <h2>Sending track data to the server...</h2>}
              <img src={require("../styling/loading.gif")} />
            </div>
          )}
          {!loading && (
            <div>
              {successPopUp && (
                <div className={styles.successPopUp}>
                  <h3>{message}</h3>
                  <FaSmile />
                </div>
              )}
              {errorPopUp && (
                <div className={styles.errorPopUp}>
                  <h3>{message}</h3>
                  <FaSadCry />
                </div>
              )}
              <h1>Hello, {data.name}</h1>
              <div className={styles.formDiv}>
                <h1
                  className={styles.ddclick}
                  onClick={() => {
                    handleClick();
                  }}
                >
                  {" "}
                  {toggleIcon ? <FaPlus /> : <FaMinus />} Create a new album
                </h1>
                <form
                  className={toggle ? styles.dropdown_toggle : styles.dropdown}
                  onSubmit={(e) => handleSubmit(e)}
                >
                  <div className={styles.albumInput}>
                    <div className={styles.inputField}>
                      <label htmlFor="name">Album name</label>
                      <br />
                      <input
                        type="text"
                        required
                        alue={albumName}
                        onChange={(e) => setAlbumName(e.target.value)}
                      ></input>
                    </div>
                    <div className={styles.inputField}>
                      <label htmlFor="cover">Album image cover</label>
                      <br></br>
                      <input
                        type="file"
                        required
                        className={styles.fileInput}
                        onChange={(e) => {
                          setAlbumImage(e.target.files[0]);
                        }}
                      ></input>
                      <br></br>
                    </div>
                    {inputs.map((t, i) => {
                      return (
                        <div className={styles.inputContainer}>
                          <label htmlFor="name">
                            {" "}
                            Track {i + 1} name:
                            <br></br>
                          </label>
                          <input
                            type="text"
                            required
                            name={`track${i}`}
                            onChange={(e) => {
                              addTrack(e, i);
                            }}
                          ></input>
                          <div className={styles.inputField}>
                            <label htmlFor="name"> Track {i + 1} file:</label>
                            <br></br>
                            <input
                              type="file"
                              id="fileInput"
                              required
                              name={`track${i}`}
                              onChange={(e) => {
                                setTrackFile(e, i);
                              }}
                              accept=".mp3, .wav, .flac, .ogg"
                            ></input>
                          </div>
                          <br></br>
                        </div>
                      );
                    })}{" "}
                    <br></br>
                  </div>
                  <div className={styles.inputField}>
                    <h3
                      className={styles.addTrack}
                      onClick={(e) => {
                        addInput();
                      }}
                    >
                      {" "}
                      <FaPlus /> Add track
                    </h3>
                  </div>
                  <div className={styles.inputField}>
                    <input type="submit"></input>
                  </div>
                </form>
                <hr></hr>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
export default UserPanel;
