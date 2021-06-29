import React from "react";
import "../css/Widget.css";

function Widget() {
  return (
    <div className="widgets">
      <iframe
        src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FPersonal-Learning-English-103638948572232&tabs=timeline&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&width=340&height=1500"
        width="340"
        height="1500"
        style={{ border: "none", overflow: "hidden" }}
        scrolling="no"
        frameBorder="0"
        allowtransparency="true"
        title="Personal Learning English Page"
        allow="encrypted-media"
      ></iframe>
      {/* <iframe
        src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FPageQuangNinhHaLong&tabs=timeline&show_facepile=true"
        width="340"
        height="1500"
        style={{ border: "none", overflow: "hidden" }}
        scrolling="no"
        frameborder="0"
        allowTransparency="true"
        allow="encrypted-media"
      ></iframe>
      <iframe
        src="https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2F100005270687317%2Fvideos%2F1724403461078660&show_text=true"
        width="340"
        height="1500"
        style={{ border: "none", overflow: "hidden" }}
        scrolling="no"
        frameborder="0"
        allowTransparency="true"
        allow="encrypted-media"
        allowFullScreen="true"
      ></iframe> */}
    </div>
  );
}

export default Widget;
