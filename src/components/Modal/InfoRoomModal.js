import { MoreOutlined } from "@ant-design/icons";
import { Avatar, Modal, notification, Tooltip } from "antd";
import { format } from "date-fns";
import React, { useContext, useMemo, useState } from "react";
import { AppContext } from "../../Context/AppProvider";
import { updateDocument } from "../../firebase/service";

const colorsRoom = ["#272829", "#003865", "#7F5283", "#898AA6", "#A10035"];

function InfoRoomModal() {
  const [isChangeRoomName, setIsChangeRoomName] = useState(false);
  const [isChangeRoomDesc, setIsChangeRoomDesc] = useState(false);
  const [roomName, setRoomName] = useState("");
  const [roomDesc, setRoomDesc] = useState("");

  const {
    roomSelected,
    members,
    selectedRoomId,
    isInfoRoomVisible,
    setIsInfoRoomVisible,
    setIsChangeNickNameVisible,
  } = useContext(AppContext);

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

  const handleChangeColor = (color) => {
    updateDocument("rooms", selectedRoomId, { colorRoom: color });
  };

  const handleOpenChangeNickNameModal = () => {
    setIsChangeNickNameVisible(true);
    setIsInfoRoomVisible(false);
  };

  const openNotificationRoomName = () => {
    notification["warning"]({
      message: "Lưu ý",
      description: "Tên phòng không được để trống và quá 30 ký tự!",
    });
  };

  const openNotificationRoomDesc = () => {
    notification["warning"]({
      message: "Lưu ý",
      description: "Mô tả phòng không được để trống và quá 40 ký tự!",
    });
  };

  const handleChangeRoomName = () => {
    if (roomName.length <= 0 || roomName.length >= 30) {
      openNotificationRoomName();
      return;
    } else {
      updateDocument("rooms", selectedRoomId, {
        name: roomName,
      });

      setRoomName("");
      setIsChangeRoomName(false);
    }
  };

  const handleChangeRoomDesc = () => {
    if (roomDesc.length <= 0 || roomDesc.length >= 30) {
      openNotificationRoomDesc();
      return;
    } else {
      updateDocument("rooms", selectedRoomId, {
        description: roomDesc,
      });

      setRoomDesc("");
      setIsChangeRoomDesc(false);
    }
  };

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
            {isChangeRoomName ? (
              <input
                type="text"
                value={roomName}
                placeholder={roomSelected?.name}
                className="outline-none border rounded-md px-3 py-1 mt-1"
                onChange={(e) => setRoomName(e.target.value)}
              />
            ) : (
              <span>{roomSelected?.name}</span>
            )}
            {isChangeRoomName ? (
              <div className="inline-block ml-2">
                <span className="px-1" onClick={handleChangeRoomName}>
                  ✔️
                </span>
                <span
                  className="px-1"
                  onClick={() => setIsChangeRoomName(false)}
                >
                  ❌
                </span>
              </div>
            ) : (
              <span
                className="px-2 ml-2"
                onClick={() => setIsChangeRoomName(true)}
              >
                🖋️
              </span>
            )}
          </div>
          <div className="mt-3 text-center text-prm-black text-lg">
            {isChangeRoomDesc ? (
              <input
                type="text"
                value={roomDesc}
                placeholder={roomSelected?.description}
                className="outline-none border rounded-md px-3 py-1 mt-1"
                onChange={(e) => setRoomDesc(e.target.value)}
              />
            ) : (
              <span>{roomSelected?.description}</span>
            )}
            {isChangeRoomDesc ? (
              <div className="inline-block ml-2">
                <span className="px-1" onClick={handleChangeRoomDesc}>
                  ✔️
                </span>
                <span
                  className="px-1"
                  onClick={() => setIsChangeRoomDesc(false)}
                >
                  ❌
                </span>
              </div>
            ) : (
              <span
                className="px-2 ml-2"
                onClick={() => setIsChangeRoomDesc(true)}
              >
                🖋️
              </span>
            )}
          </div>
          <div className="mt-5 flex justify-center items-center">
            <Avatar.Group
              maxCount={5}
              size="large"
              maxStyle={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
              className="flex items-center justify-center"
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
            <MoreOutlined
              className="text-xl px-2 cursor-pointer"
              title="Change nick name of each member"
              onClick={handleOpenChangeNickNameModal}
            />
          </div>
          <div className="mt-6">
            <p className="text-lg text-center font-medium mb-3">Đổi màu chat</p>
            <div className="flex justify-center items-center gap-2">
              {colorsRoom.map((color, index) => {
                return (
                  <div
                    key={index}
                    style={{ backgroundColor: color }}
                    className={`rounded-full w-[25px] h-[25px] transition-all ${
                      color === roomSelected?.colorRoom
                        ? "border-4 border-gray-300"
                        : ""
                    }`}
                    onClick={() => handleChangeColor(color)}
                  ></div>
                );
              })}
            </div>
          </div>
          <div className="mt-5 text-center text-lg text-prm-black">
            Tạo lúc: {roomCreatedAt}
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default InfoRoomModal;
