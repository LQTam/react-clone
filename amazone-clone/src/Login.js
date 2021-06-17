import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { auth } from "./firebase";
import "./Login.css";
function Login() {
	const history = useHistory();
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('');

	const signIn = (e) => {
		e.preventDefault();

		auth.signInWithEmailAndPassword(email, password)
			.then(auth => {
				if (auth) 
				history.push('/user')
			
			})
		.catch(err=> alert(err.message))
	}
	const register = (e) => {
		e.preventDefault();
		auth.createUserWithEmailAndPassword(email, password)
			.then((auth) => {
				if (auth) {
					history.push('/')
				}
			})
			.catch(error => alert(error.message));
	}
  return (
    <div className="login">
      <Link to="/">
        <img
          src="https://pngimg.com/uploads/amazon/amazon_PNG24.png"
          alt="Amazon Logo"
          className="login__logo"
        />
      </Link>
      <div className="login__container">
        <h1>Sign-in</h1>
        <form>
          <h5>E-mail</h5>
          <input type="text" onChange={e => setEmail(e.target.value)} />

          <h5>Password</h5>
          <input type="password" onChange={e=> setPassword(e.target.value)} />
          <button type="submit" onClick={signIn} className='login__button'>Sign In</button>
        </form>

        <p>
          By continuing, you agree to Amazon's{" "}
          <Link to="/">Conditions of Use</Link> and{" "}
          <Link to="/">Privacy Notice</Link>.
        </p>
      </div>
      <div className="new__account">
        <div className="new__accountDivider">
          <h5>New to Amazon?</h5>
			  </div>
			  <button className="register" onClick={register}>Create your Amazon account</button>
      </div>
    </div>
  );
}

export default Login;
