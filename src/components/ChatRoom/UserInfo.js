import { Avatar } from "antd";
import { signOut } from "firebase/auth";
import { useContext } from "react";
import { AppContext } from "../../Context/AppProvider";
import { AuthContext } from "../../Context/AuthProvider";
import { auth } from "../../firebase/config";

function UserInfo() {
  const { setSelectedRoomId } = useContext(AppContext);
  const {
    user: { displayName, photoURL },
  } = useContext(AuthContext);

  const handleLogOut = () => {
    signOut(auth);
    setSelectedRoomId("");
  };

  return (
    <div className="w-full px-5 py-5 flex items-center justify-between h-[80px]">
      <div className="flex items-center gap-2">
        <Avatar src={photoURL}>
          {!photoURL && displayName?.charAt(0)?.toUpperCase()}
        </Avatar>
        <div className="text-prm-white text-lg font-medium break-words">
          {displayName}
        </div>
      </div>
      <button
        onClick={handleLogOut}
        className="border px-3 py-2 bg-prm-black font-medium text-prm-orange border-prm-orange hover:bg-prm-orange hover:text-prm-black hover:border-prm-orange rounded-sm transition-hover"
      >
        Đăng xuất
      </button>
    </div>
  );
}

export default UserInfo;
