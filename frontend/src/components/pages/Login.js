import axios from "axios";
import { useState, useEffect } from "react";
import styles from "../styling/form.module.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom"; //

function Login() {
  const { handleLogout, apiURL } = useContext(Context);
  useEffect(() => {
    handleLogout();
  }, []);
  const navigate = useNavigate();
  const { handleLogin } = useContext(Context);
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState();
  const [message, setMessage] = useState("");

  const instance = axios.create({
    baseURL: "https://localhost:3001/api/users/",
  });

  function handleSubmit(e) {
    e.preventDefault();
    axios
      .post(`${apiURL}/api/users/login/`, {
        email: email,
        password: password,
      })
      .then((response) => {
        const token = response.data.token;
        console.log(response.data);
        setError(false);
        setMessage(response.data.message);
        console.log(token);

        localStorage.setItem("token", token);
        localStorage.setItem("expiration-date", response.data.expiresIn);
        localStorage.setItem("user_id", response.data.userId);
        handleLogin();
        navigate("/");
      })
      .catch((error) => {
        if (error.response) {
          setError(true);
          setMessage(error.response.data.message);
        }
      });
  }
  return (
    <div className={styles.background}>
      <div className={styles.form}>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputDiv}>
            <label htmlFor="name">Enter your e-mail</label>
            <input
              type="text"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className={styles.inputDiv}>
            <label htmlFor="password">Enter your password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            ></input>
            <p>
              Don't have an account yet?{" "}
              <Link to="/signup/">
                {" "}
                <span>Sign up</span>{" "}
              </Link>
            </p>
          </div>
          <button type="submit">Submit</button>
          <p className={styles[error ? "error" : "success"]}>{message}</p>
        </form>
      </div>
    </div>
  );
}

export default Login;
