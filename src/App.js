import Login from "./components/Login/index";
import ChatRoom from "./components/ChatRoom/index";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import AuthProvider from "./Context/AuthProvider";
import AppProvider from "./Context/AppProvider";
import AddRoomModal from "./components/Modal/AddRoomModal";
import InviteMemberModal from "./components/Modal/InviteMemberModal";
import InfoRoomModal from "./components/Modal/InfoRoomModal";

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
        </AppProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
