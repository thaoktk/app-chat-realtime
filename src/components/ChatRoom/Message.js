import { Avatar } from "antd";
import { formatRelative } from "date-fns";
import React, { useContext, useMemo } from "react";
import { AppContext } from "../../Context/AppProvider";
import { AuthContext } from "../../Context/AuthProvider";

function Message({ idUser, text, displayName, createdAt, photoURL }) {
  const {
    user: { uid },
  } = useContext(AuthContext);

  const { roomSelected } = useContext(AppContext);

  const messageCreatedAt = useMemo(() => {
    if (createdAt) {
      const time = formatRelative(
        new Date(createdAt.seconds * 1000),
        new Date()
      );
      return time.charAt(0).toUpperCase() + time.slice(1);
    } else {
      return null;
    }
  }, [createdAt]);

  const memberHasNickName = useMemo(() => {
    return roomSelected?.members.find((member) => member.uid === idUser);
  }, [roomSelected, idUser]);

  return (
    <div className="mb-4">
      {idUser === uid ? (
        <div className="flex flex-col items-end justify-center">
          <span className="text-neutral-400 text-xs mr-3 mb-1">
            {messageCreatedAt}
          </span>
          <p
            style={{ backgroundColor: roomSelected?.colorRoom }}
            className={`text-prm-white text-xl px-3 py-2 mr-3 mt-2 w-fit rounded break-words text`}
          >
            {text}
          </p>
        </div>
      ) : (
        <div>
          <div className="flex items-center">
            <Avatar size="small" src={photoURL}>
              {!photoURL && displayName?.charAt(0)?.toUpperCase()}
            </Avatar>
            <div>
              <span className="text-prm-white text-lg font-semibold ml-3">
                {memberHasNickName?.nickName || displayName}
              </span>
              <span className="text-neutral-400 text-xs ml-3">
                {messageCreatedAt}
              </span>
            </div>
          </div>
          <div>
            <p
              className={`text-prm-white text-xl px-3 py-2 ml-5 mt-2 w-fit bg-[#272829] rounded break-words text`}
            >
              {text}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Message;
