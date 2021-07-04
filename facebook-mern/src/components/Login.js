import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "../css/Login.css";
import { setUserLogin } from "../features/user/userSlice";
import { auth, provider } from "../firebase";

function Login() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then(({ user: { displayName, email, photoURL, uid } }) => {
        dispatch(setUserLogin({ displayName, email, photoURL, uid }));
      })
      .catch((err) => setError(err.message));
  };
  const createAccount = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(() => setMessage("Create account successful."))
      .catch((err) => setError(err.message));
  };
  const signInWithEmailAndPassword = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then(({ user: { displayName, email, photoURL, uid } }) => {
        dispatch(setUserLogin({ displayName, email, photoURL, uid }));
      })
      .catch((err) => setError(err.message));
  };
  return (
    <div className="login">
      <div className="login__logo">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Facebook_Logo_%282019%29.svg/1280px-Facebook_Logo_%282019%29.svg.png"
          alt="fb text"
        />
        <p>
          Facebook giúp bạn kết nối và chia sẻ với mọi người trong cuộc sống của
          bạn.
        </p>
      </div>
      <div className="login__form">
        <p className={`errorMessage ${error !== "" && "show"}`}>{error}</p>
        <p className={`successMessage ${message !== "" && "show"}`}>
          {message}
        </p>
        <div type="submit" className="googleLogin" onClick={signIn}>
          <button>Google SignIn</button>
        </div>
        <form>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <button
            type="submit"
            className="signinBtn"
            onClick={signInWithEmailAndPassword}
          >
            Login
          </button>
          <Link to="/password/forgot" className="forgotBtn">
            Forgot password?
          </Link>
          <hr />
          <button onClick={createAccount} className="createAccount">
            Create new account
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
