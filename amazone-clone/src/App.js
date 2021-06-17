import './App.css';
import Header from './Header';
import Home from './Home';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Login from './Login';
import User from './User';
import { auth } from './firebase';
import { useStateValue } from './StateProvider'
import { useEffect } from 'react';
import { SET_USER } from './actions';
import Footer from './Footer';

function App() {
  const [{ user }, dispatch] = useStateValue();
  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      if (authUser) {
        dispatch({
          type: SET_USER,
          user: authUser
        })
      }
      else {
        dispatch({
          type: SET_USER,
          user: null
        })
      }
    })
  }, [])
  return (
    <div className="app">
      <Router>
        <Switch>
          <Route path='/signin'>
            <Login />
          </Route>
          <Route path='/user'>
            <Header user={user} />
            <User user={user}/>
            <Footer />
          </Route>
          <Route path='/'>
            <Header user={user} />
            <Home />
            <Footer />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
