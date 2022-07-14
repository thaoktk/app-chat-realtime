import { Avatar, Modal, Tooltip } from "antd";
import { format } from "date-fns";
import React, { useContext, useMemo } from "react";
import { AppContext } from "../../Context/AppProvider";

function InfoRoomModal() {
  const { roomSelected, members, isInfoRoomVisible, setIsInfoRoomVisible } =
    useContext(AppContext);

  const handleCancel = () => {
    setIsInfoRoomVisible(false);
  };

  const roomCreatedAt = useMemo(() => {
    if (roomSelected) {
      return format(
        new Date(roomSelected?.createdAt.seconds * 1000),
        "dd/MM/yyyy HH:mm:ss"
      );
    } else {
      return null;
    }
  }, [roomSelected]);

  return (
    <div>
      <Modal
        title="Thông tin phòng"
        visible={isInfoRoomVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <div className="">
          <div className="mb-3 flex justify-center">
            <Avatar
              src={roomSelected?.roomPhotoURL}
              className="w-[100px] h-[100px] flex items-center justify-center text-3xl"
            >
              {!roomSelected?.roomPhotoURL &&
                roomSelected?.name.charAt(0).toUpperCase()}
            </Avatar>
          </div>
          <div className="text-center text-prm-black text-xl font-semibold">
            {roomSelected?.name}
          </div>
          <div className="mt-2 text-center text-prm-black text-lg">
            {roomSelected?.description}
          </div>
          <Avatar.Group
            maxCount={5}
            size="large"
            maxStyle={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
            className="mt-5 flex items-center justify-center"
          >
            {members.map((member) => {
              return (
                <Tooltip
                  title={member.displayName}
                  placement="bottom"
                  key={member.id}
                >
                  <Avatar src={member.photoURL}>
                    {!member.photoURL &&
                      member.displayName?.charAt(0)?.toUpperCase()}
                  </Avatar>
                </Tooltip>
              );
            })}
          </Avatar.Group>
          <div className="mt-5 text-center text-lg text-prm-black">
            Tạo lúc: {roomCreatedAt}
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default InfoRoomModal;
