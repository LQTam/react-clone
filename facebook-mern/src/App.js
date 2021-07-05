import React, { useEffect } from "react";
import "./App.css";
import Feed from "./components/Feed";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Widget from "./components/Widget";
import { BrowserRouter as Router, Route, useHistory } from "react-router-dom";
import { Switch } from "react-router-dom";
import Login from "./components/Login";
import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import { setUserLogin } from "./features/user/userSlice";
import { HOME, LOGIN } from "./routes";

function App() {
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        let { displayName, email, photoURL, uid } = user;
        dispatch(setUserLogin({ displayName, email, photoURL, uid }));
      }
    });
  }, [dispatch, history]);
  return (
    <div className="app">
      <Router>
        <Switch>
          <Route path={LOGIN}>
            <Login />
          </Route>
          <Route path={HOME}>
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
    </div>
  );
}

export default App;
