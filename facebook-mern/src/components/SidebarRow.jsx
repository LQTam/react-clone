import React from "react";
import "../css/SidebarRow.css";

function SidebarRow({ Icon, title }) {
  return (
    <div className="sidebar__row">
      {Icon && <Icon />}
      <p>{title}</p>
    </div>
  );
}

export default SidebarRow;
