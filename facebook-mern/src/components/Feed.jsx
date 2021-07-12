import "../css/Feed.css";
import StoryReel from "./StoryReel";
import MessageSender from "./MessageSender";
import Post from "./Post";
import { selectPostsData } from "../features/post/postSlice";
import { useSelector } from "react-redux";

function Feed() {
  const postsData = useSelector(selectPostsData);
  return (
    <div className="feed">
      <StoryReel />
      <MessageSender />
      {postsData?.map((post, key) => (
        <Post
          _id={post._id}
          key={key}
          profilePic={post.avatar}
          message={post.text}
          timestamp={post.timestamp}
          imgName={post.imgName}
          userName={post.user}
          uid={post.uid}
          images={post.images}
        />
      ))}
    </div>
  );
}

export default Feed;
