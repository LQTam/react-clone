import { Button } from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";
import "../css/Login.css";
import { setUserLogin } from "../features/user/userSlice";
import { auth, provider } from "../firebase";

function Login() {
  const dispatch = useDispatch();
  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then(({ user: { displayName, email, photoURL } }) => {
        dispatch(setUserLogin({ displayName, email, photoURL }));
      });
  };
  return (
    <div className="login">
      <div className="login__logo">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Facebook_f_logo_%282019%29.svg/100px-Facebook_f_logo_%282019%29.svg.png"
          alt="fb circle"
        />
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Facebook_Logo_%282019%29.svg/1280px-Facebook_Logo_%282019%29.svg.png"
          alt="fb text"
        />
      </div>
      <Button type="submit" onClick={signIn}>
        Google SignIn
      </Button>
    </div>
  );
}

export default Login;
