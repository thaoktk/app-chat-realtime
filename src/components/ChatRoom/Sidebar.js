import React from "react";
import RoomList from "./RoomList";
import UserInfo from "./UserInfo";

function Sidebar() {
  return (
    <div className="bg-prm-black w-full lg:h-screen h-fit">
      <UserInfo />
      <RoomList />
    </div>
  );
}

export default Sidebar;
