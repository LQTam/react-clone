import React, { useCallback, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import { HOME, LOGIN, MESSENGER } from "./routes";
import Home from "./pages/Home";
import Login from "./pages/Login";
import axios from "./axios";
import Pusher from "pusher-js";
import {
  addNewPost,
  deletePostByGivenId,
  setPostsData,
} from "./features/post/postSlice";
import { addNewConversation } from "./features/conversation/conversationSlice";
import Messenger from "./pages/Messenger";
import { auth } from "./firebase";
import { setUserLogin } from "./features/user/userSlice";
function App() {
  const dispatch = useDispatch();
  const [currentConversation, setCurrentConversation] = React.useState(null);
  const syncFeed = useCallback(() => {
    axios
      .get("/retrieve/posts")
      .then(({ data }) => dispatch(setPostsData(data)));
  }, [dispatch]);

  useEffect(() => {
    const pusher = new Pusher(process.env.REACT_APP_PUSHER_KEY, {
      cluster: process.env.REACT_APP_PUSHER_CLUSTER,
      authEndpoint: `${process.env.REACT_APP_SERVER_ENDPOINT}/${process.env.REACT_APP_PUSHER_AUTH_ENDPOINT}`,
    });
    const postChannel = pusher.subscribe("posts");
    const conversationChannel = pusher.subscribe("conversations");

    postChannel.bind("inserted", function (data) {
      dispatch(addNewPost(data));
    });
    postChannel.bind("deleted", function (data) {
      let { _id } = data;
      dispatch(deletePostByGivenId({ _id }));
    });
    conversationChannel.bind("inserted", function (data) {
      dispatch(addNewConversation(data));
    });
    return () => {
      postChannel.unbind_all();
      postChannel.unsubscribe();
      conversationChannel.unbind_all();
      conversationChannel.unsubscribe();
    };
  }, []);

  useEffect(() => {
    syncFeed();
  }, [syncFeed]);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        let { displayName, email, photoURL, uid } = user;
        dispatch(setUserLogin({ displayName, email, photoURL, uid }));
      }
    });
  }, [dispatch]);
  function handleGetCurrentConversation(c, u) {
    setCurrentConversation(u);
  }

  return (
    <div className="app">
      <Router>
        <Switch>
          <Route path={LOGIN}>
            <Login />
          </Route>
          <Route path={MESSENGER}>
            <Header />
            <Messenger />
          </Route>
          <Route path={HOME}>
            <Header setCurrentConversation={handleGetCurrentConversation} />
            <div className="app__body">
              <Home currentConversation={currentConversation} />
            </div>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
