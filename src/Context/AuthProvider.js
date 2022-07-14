import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config";
import { useNavigate } from "react-router-dom";
import { createContext, useEffect, useState } from "react";
import { Spin } from "antd";

export const AuthContext = createContext();

function AuthProvider({ children }) {
  const navigate = useNavigate();

  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { displayName, photoURL, email, uid } = user;
        setUser({ displayName, photoURL, email, uid });
        setIsLoading(false);
        navigate("/");
      } else {
        setIsLoading(false);
        navigate("/login");
      }
    });

    return () => {
      unsubAuth();
    };
  }, [navigate]);

  return (
    <AuthContext.Provider value={{ user }}>
      {isLoading ? (
        <div className="max-w-screen min-h-screen flex justify-center items-center bg-prm-black">
          <Spin size="large" />
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
