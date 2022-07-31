import { PlusOutlined } from "@ant-design/icons";
import { Avatar, Collapse, Typography } from "antd";
import React, { useContext } from "react";
import { AppContext } from "../../Context/AppProvider";

const { Panel } = Collapse;

function RoomList() {
  const {
    rooms,
    selectedRoomId,
    setIsAddRoomVisible,
    setSelectedRoomId,
  } = useContext(AppContext);

  const handleAddRoom = () => {
    setIsAddRoomVisible(true);
  };

  return (
    <div className="w-full px-2 py-3 room-list h-full overflow-y-auto">
      <Collapse ghost>
        <Panel
          header="Danh sách các phòng"
          key="1"
          className="text-prm-white text-lg"
        >
          {rooms.map((room) => {
            return (
              <Typography.Link
                key={room.id}
                onClick={() => setSelectedRoomId(room.id)}
                className={`block mb-2 font-medium text-ellipsis overflow-hidden whitespace-nowrap ${
                  room.id === selectedRoomId ? "active" : ""
                }`}
              >
                <Avatar src={room.roomPhotoURL} className="mr-3 ">
                  {!room.roomPhotoURL && room.name.charAt(0).toUpperCase()}
                </Avatar>
                  <span>{room.name}</span>
              </Typography.Link>
            );
          })}
          <button
            onClick={handleAddRoom}
            className="mt-4 text-prm-white hover:text-prm-orange transition-hover flex items-center"
          >
            <PlusOutlined className="mr-3" />
            Tạo phòng mới
          </button>
        </Panel>
      </Collapse>
    </div>
  );
}

export default RoomList;
