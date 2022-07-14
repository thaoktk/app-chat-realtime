import { createContext, useContext, useMemo, useState } from "react";
import useFirestore from "../hooks/useFirestore";
import { AuthContext } from "./AuthProvider";

export const AppContext = createContext();

function AppProvider({ children }) {
  const [isAddRoomVisible, setIsAddRoomVisible] = useState(false);
  const [isInviteMemberVisible, setIsInviteMemberVisible] = useState(false);
  const [isInfoRoomVisible, setIsInfoRoomVisible] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState("");

  const { user } = useContext(AuthContext);

  const roomsCondition = useMemo(() => {
    return {
      fieldName: "members",
      operator: "array-contains",
      compareValue: user.uid,
    };
  }, [user.uid]);
  const rooms = useFirestore("rooms", roomsCondition);

  const roomSelected = useMemo(() => {
    return rooms.find((room) => room.id === selectedRoomId);
  }, [rooms, selectedRoomId]);

  const usersCondition = useMemo(() => {
    return {
      fieldName: "uid",
      operator: "in",
      compareValue: roomSelected?.members, // các member là các uid
    };
  }, [roomSelected?.members]);

  const members = useFirestore("users", usersCondition);

  const messagesCondition = useMemo(() => {
    return {
      fieldName: "roomId",
      operator: "==",
      compareValue: selectedRoomId,
    };
  }, [selectedRoomId]);

  const messages = useFirestore("messages", messagesCondition);

  return (
    <AppContext.Provider
      value={{
        rooms,
        roomSelected,
        members,
        messages,
        isAddRoomVisible,
        setIsAddRoomVisible,
        isInviteMemberVisible,
        setIsInviteMemberVisible,
        isInfoRoomVisible,
        setIsInfoRoomVisible,
        selectedRoomId,
        setSelectedRoomId,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default AppProvider;
