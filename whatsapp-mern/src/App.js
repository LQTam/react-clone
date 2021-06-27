import { useEffect, useState } from "react";
import "./App.css";
import Chat from "./components/Chat";
import Sidebar from "./components/Sidebar";
import Pusher from "pusher-js";
import axios from "./axios";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/Login";
import { useStateValue } from "./StateProvider";

function App() {
  const [{ user }, dispatch] = useStateValue();
  // const [messages, setMessages] = useState([]);
  const [rooms, setRooms] = useState([]);
  useEffect(() => {
    // axios.get("/messages/sync").then((response) => {
    //   setMessages(response.data);
    // });

    axios.get("/rooms/sync").then(({ data }) => {
      setRooms(data);
    });
  }, []);

  useEffect(() => {
    var pusher = new Pusher("56d23b108dfd4f5ecf4c", {
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
