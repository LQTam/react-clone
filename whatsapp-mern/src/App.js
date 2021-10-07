import { useEffect, useState } from "react";
import "./App.css";
import Chat from "./components/Chat";
import Sidebar from "./components/Sidebar";
import Pusher from "pusher-js";
import axios from "./axios";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { auth } from "./firebase";
import Login from "./components/Login";
import { actionTypes } from "./reducer";
import { useStateValue } from "./StateProvider";
require("dotenv").config();

function App() {
  const [{ user }, dispatch] = useStateValue();
  // const [messages, setMessages] = useState([]);
  const [rooms, setRooms] = useState([]);
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({
          type: actionTypes.SET_USER,
          user: authUser,
        });
      } else {
        dispatch({
          type: actionTypes.SET_USER,
          user: null,
        });
      }
    });
  }, []);
  useEffect(() => {
    // axios.get("/messages/sync").then((response) => {
    //   setMessages(response.data);
    // });

    axios.get("/rooms/sync").then(({ data }) => {
      setRooms(data);
    });
  }, []);

  useEffect(() => {
    var pusher = new Pusher(process.env.REACT_APP_PUSHER_KEY, {
      cluster: "ap1",
    });

    // var messageChannel = pusher.subscribe("messages");
    // messageChannel.bind("inserted", function (newMessage) {
    //   setMessages([...messages, newMessage]);
    // });
    var roomChannel = pusher.subscribe("rooms");
    roomChannel.bind("inserted", function (newRoom) {
      setRooms([...rooms, newRoom]);
    });

    return () => {
      // messageChannel.unbind_all();
      // messageChannel.unsubscribe();
      roomChannel.unbind_all();
      roomChannel.unsubscribe();
    };
  }, [rooms]);
  return (
    <div className="app">
      {!user ? (
        <Login />
      ) : (
        <div className="app__body">
          <Router>
            <Sidebar rooms={rooms} />
            <Switch>
              {/* SIDE BAR */}
              <Route path="/rooms/:roomId">
                {/* CHAT COMPONENT */}
                <Chat />
              </Route>
              <Route path="/">
                <h1>Select a room</h1>
              </Route>
            </Switch>
          </Router>
        </div>
      )}
    </div>
  );
}

export default App;
