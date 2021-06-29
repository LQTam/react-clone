import React, { useEffect } from "react";
import "./App.css";
import Feed from "./components/Feed";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Widget from "./components/Widget";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import Login from "./components/Login";
import { auth } from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import { selectUserName, setUserLogin } from "./features/user/userSlice";

function App() {
  const dispatch = useDispatch();
  const userName = useSelector(selectUserName);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        let { displayName, email, photoURL } = user;
        dispatch(setUserLogin({ displayName, email, photoURL }));
      }
    });
  }, [dispatch]);
  return (
    <div className="app">
      {!userName ? (
        <Login />
      ) : (
        <Router>
          <Switch>
            {/* <Route path="/login">
              <Login />
            </Route> */}
            <Route path="/">
              <Header />
              <div className="app__body">
                {/* HEADER */}

                {/* SIDEBAR */}
                <Sidebar />
                {/* FEED */}
                <Feed />
                {/* WIDGETS */}
                <Widget />
              </div>
            </Route>
          </Switch>
        </Router>
      )}
    </div>
  );
}

export default App;
