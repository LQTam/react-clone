import React from "react";
import "./App.css";
import Header from "./components/Header";
import Home from "./components/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Detail from "./components/Detail";
import Login from "./components/Login";
import { DETAIL, HOME, LOGIN } from "./app/routes";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route path={LOGIN}>
            <Login />
          </Route>
          <Route path={`${DETAIL}/:id`}>
            <Detail />
          </Route>
          <Route path={HOME}>
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
