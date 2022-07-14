import {
  InfoCircleOutlined,
  SmileOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import React, { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../../Context/AppProvider";
import { AuthContext } from "../../Context/AuthProvider";
import { addDocument, updateDocument } from "../../firebase/service";
import Message from "./Message";

function ChatWindow() {
  const [valueInput, setValueInput] = useState("");

  const {
    roomSelected,
    selectedRoomId,
    members,
    messages,
    setIsInviteMemberVisible,
    setIsInfoRoomVisible,
    setSelectedRoomId,
  } = useContext(AppContext);

  const {
    user: { uid, photoURL, displayName },
  } = useContext(AuthContext);

  const handleInviteMember = () => {
    setIsInviteMemberVisible(true);
  };

  const handleOutRoom = () => {
    const roomDeleteCurrUser = {
      ...roomSelected,
      members: members.filter((member) => member.uid !== uid),
    };
    updateDocument("rooms", selectedRoomId, roomDeleteCurrUser);
    setSelectedRoomId("");
  };

  const handleInfoRoom = () => {
    setIsInfoRoomVisible(true);
  };

  const handleInputChange = (e) => {
    setValueInput(e.target.value);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (valueInput.trim().length !== 0) {
      addDocument("messages", {
        text: valueInput,
        uid,
        photoURL,
        displayName,
        roomId: selectedRoomId,
      });
      setValueInput("");
    }
  };

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="bg-second-black h-screen">
      {selectedRoomId === "" ? (
        <div className="w-full h-full flex justify-center items-center">
          <SmileOutlined className="text-3xl text-prm-orange mr-3" />
          <span className="text-prm-white text-xl md:text-2xl">
            Hãy chọn hoặc tạo phòng chat
          </span>
        </div>
      ) : (
        <div className="w-full h-full">
          <div className="p-5 h-[90px] flex md:justify-between justify-around items-center ">
            <div className="w-fit">
              <p className="text-prm-white text-xl font-semibold break-words">
                {roomSelected?.name}
              </p>
              <span className="text-prm-white mt-2 break-words text-ellipsis block w-[200px]">
                {roomSelected?.description}
              </span>
            </div>
            <div className="flex items-center justify-center md:gap-5 gap-3">
              <button
                onClick={handleInviteMember}
                className="md:mr-2 text-prm-white text-lg hover:text-prm-orange flex items-center justify-center gap-2 transition-hover"
              >
                <UserAddOutlined />
                Mời
              </button>
              <button
                onClick={handleOutRoom}
                className="md:mr-4 text-prm-white text-lg hover:text-prm-orange flex items-center justify-center gap-2 transition-hover"
              >
                Thoát
              </button>
              <InfoCircleOutlined
                onClick={handleInfoRoom}
                className="md:mr-4 text-prm-white text-lg hover:text-prm-orange flex items-center justify-center gap-2 transition-hover"
              />
            </div>
          </div>
          <div className="px-5 py-5 flex flex-col justify-end content-message">
            <div className="max-h-full overflow-y-auto message-list">
              {messages.map((message) => {
                return (
                  <Message
                    key={message.id}
                    text={message.text}
                    photoURL={message.photoURL}
                    displayName={message.displayName}
                    createdAt={message.createdAt}
                  />
                );
              })}
              <div ref={messagesEndRef} />
            </div>
            <form className="mt-3 w-full flex" onSubmit={handleOnSubmit}>
              <input
                value={valueInput}
                onChange={handleInputChange}
                type="text"
                placeholder="Nhập vào tin nhắn"
                className="w-full p-2 border border-gray-700 bg-second-black text-prm-white text-lg outline-none rounded-sm"
              />
              <button
                onClick={handleOnSubmit}
                type="submit"
                className="px-3 py-2 border border-prm-orange text-prm-orange bg-second-black rounded-sm"
              >
                Gửi
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatWindow;
