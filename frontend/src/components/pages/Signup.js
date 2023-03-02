import { useContext, useState } from "react";
import styles from "../styling/form.module.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { Context } from "../../Context/AuthContext";
function Signup() {
  //
  function handleSubmit(e) {
    e.preventDefault();
    if (passwordConfirm !== password) {
      setError(true);
      setMessage("The passwords does not match.");
    } else {
      console.log(email, password, userName);
      axios
        .post("https://localhost:3001/api/users/", {
          email: email,
          password: password,
          name: userName,
        })
        .then((res) => {
          console.log("user added successfully!");
          setError(false);
          setMessage(res.data.message);
          console.log(message);
        })
        .catch((error) => {
          console.log("an error has ocurred.");
          setError(true);
          console.log(error.data);
          setMessage(error.response.data.message);
          console.log(message);
        });
    }
  }

  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [userName, setUserName] = useState();
  const [passwordConfirm, setPasswordConfirm] = useState();
  return (
    <div className={styles.background}>
      <div className={styles.form}>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputDiv}>
            <label htmlFor="e-mail">Enter your e-mail:</label>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            ></input>
          </div>
          <div className={styles.inputDiv}>
            <label htmlFor="name">Enter your username:</label>
            <input
              type="text"
              onChange={(e) => setUserName(e.target.value)}
              value={userName}
              required
            ></input>
          </div>
          <div className={styles.inputDiv}>
            <label htmlFor="password">Input your password:</label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            ></input>
          </div>
          <div className={styles.inputDiv}>
            <label htmlFor="passwordConfirm">Confirm your password:</label>
            <input
              type="password"
              onChange={(e) => setPasswordConfirm(e.target.value)}
              value={passwordConfirm}
              required
            ></input>
          </div>
          <p>
            Already have an account?{" "}
            <Link to="/login/">
              {" "}
              <span>Login</span>{" "}
            </Link>
          </p>
          <p className={styles[error ? "error" : "success"]}>{message}</p>
          <button type="submit">Submit</button>
        </form>
      </div>
      {message && <p> {message} </p>}
    </div>
  );
}

export default Signup;
