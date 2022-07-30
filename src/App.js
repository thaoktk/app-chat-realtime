import { BrowserRouter, Route, Routes } from "react-router-dom";
import ChatRoom from "./components/ChatRoom/index";
import Login from "./components/Login/index";
import AddRoomModal from "./components/Modal/AddRoomModal";
import ChangeNickNameModal from "./components/Modal/ChangeNickNameModal";
import InfoRoomModal from "./components/Modal/InfoRoomModal";
import InviteMemberModal from "./components/Modal/InviteMemberModal";
import AppProvider from "./Context/AppProvider";
import AuthProvider from "./Context/AuthProvider";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<ChatRoom />} />
          </Routes>
          <AddRoomModal />
          <InviteMemberModal />
          <InfoRoomModal />
          <ChangeNickNameModal />
        </AppProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
