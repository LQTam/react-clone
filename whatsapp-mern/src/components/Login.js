import React from "react";
import { Button } from "@material-ui/core";
import { auth, provider } from "../firebase";
import "../css/Login.css";
import { useStateValue } from "../StateProvider";
import { actionTypes } from "../reducer";
function Login() {
  const [{}, dispatch] = useStateValue();
  const signIn = async () => {
    auth
      .signInWithPopup(provider)
      .then(({ user }) => dispatch({ type: actionTypes.SET_USER, user }))
      .catch((err) => console.log(err.message));
  };
  return (
    <div className="login">
      <div className="login__container">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/220px-WhatsApp.svg.png"
          alt="upload"
        />
        <div className="login__text">
          <h1>Sign in to WhatsApp</h1>
        </div>
        <Button type="submit" onClick={signIn}>
          Sign in with Google
        </Button>
      </div>
    </div>
  );
}

export default Login;
