import { Avatar } from "antd";
import { format, formatRelative } from "date-fns";
import React, { useMemo } from "react";

function Message({ text, displayName, createdAt, photoURL }) {
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

  return (
    <div className="mb-4">
      <div className="flex items-center">
        <Avatar size="small" src={photoURL}>
          {!photoURL && displayName?.charAt(0)?.toUpperCase()}
        </Avatar>
        <div>
          <span className="text-prm-white text-lg font-semibold ml-3">
            {displayName}
          </span>
          <span className="text-neutral-400 text-xs ml-3">
            {messageCreatedAt}
          </span>
        </div>
      </div>
      <div>
        <p className="text-prm-white text-xl px-3 py-2 ml-5 mt-2 w-fit bg-[#272829] rounded break-words text">
          {text}
        </p>
      </div>
    </div>
  );
}

export default Message;
