import { Avatar, Modal, notification } from "antd";
import React, { useContext, useState } from "react";
import { AppContext } from "../../Context/AppProvider";
import { updateDocument } from "../../firebase/service";

function ChangeNickNameModal() {
  const [isChangeNickName, setIsChangeNickName] = useState(false);
  const [accountChange, setAccountChange] = useState(0);
  const [uidOfMember, setUidOfMember] = useState("");
  const [nickName, setNickName] = useState("");

  const {
    roomSelected,
    members,
    selectedRoomId,
    isChangeNickNameVisible,
    setIsChangeNickNameVisible,
  } = useContext(AppContext);

  const handleCancel = () => {
    setIsChangeNickNameVisible(false);
    setIsChangeNickName(false);
  };

  const handleIsChangeNickName = (index, uid) => {
    setAccountChange(index);
    setIsChangeNickName(true);
    setUidOfMember(uid);
  };

  const handleSetNickName = (e) => {
    setNickName(e.target.value);
  };

  const openNotification = () => {
    notification["warning"]({
      message: "Lưu ý",
      description: "Biệt danh không được quá 60 ký tự và không được để trống",
    });
  };

  const handleKeyUp = (e) => {
    if (e.key === "Enter") {
      handleChangeNickName();
    }
  };

  const handleChangeNickName = () => {
    if (nickName.length <= 0 || nickName.length >= 30) {
      openNotification();
      return;
    } else {
      updateDocument("rooms", selectedRoomId, {
        members: roomSelected?.members.map((member) => {
          if (member.uid === uidOfMember) {
            return {
              ...member,
              nickName,
            };
          } else return member;
        }),
      });

      setIsChangeNickName(false);
      setNickName("");
    }
  };

  return (
    <div>
      <Modal
        title="Đặt biệt danh"
        visible={isChangeNickNameVisible}
        onCancel={handleCancel}
        footer={null}
        className="modal-change-nickname"
      >
        {members.map((member, index) => {
          return (
            <div key={index} className="mb-5">
              <div className="flex items-center">
                <Avatar src={member.photoURL}>
                  {!member.photoURL &&
                    member.displayName?.charAt(0)?.toUpperCase()}
                </Avatar>
                <div className="ml-4 w-full">
                  <p className="text-lg font-semibold">{member.displayName}</p>
                  {isChangeNickName && index === accountChange ? (
                    <div className="w-full flex items-center">
                      <input
                        type="text"
                        value={nickName}
                        placeholder="Đặt biệt danh"
                        className="outline-none border rounded-md w-full px-2 py-1 mr-3 mt-1"
                        onChange={handleSetNickName}
                        onKeyUp={handleKeyUp}
                      />
                      {isChangeNickName && (
                        <div className="flex justify-between items-center gap-2">
                          <div onClick={handleChangeNickName}>✔️</div>
                          <div onClick={() => setIsChangeNickName(false)}>
                            ❌
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <p
                      onClick={() => handleIsChangeNickName(index, member.uid)}
                      className="py-1"
                    >
                      {roomSelected?.members[index]?.nickName !== null
                        ? roomSelected?.members[index]?.nickName + "🖋️"
                        : "Đặt biệt danh 🖋️"}
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </Modal>
    </div>
  );
}

export default ChangeNickNameModal;
