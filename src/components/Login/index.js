import {
  FacebookAuthProvider,
  getRedirectResult,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
} from "firebase/auth";
import React from "react";
import { auth } from "../../firebase/config";
import { addDocument, generateKeywords } from "../../firebase/service";

const fbProvider = new FacebookAuthProvider();
const ggProvider = new GoogleAuthProvider();

function Login() {
  const addUser = (tokenResponse, user) => {
    if (tokenResponse?.isNewUser) {
      addDocument("users", {
        displayName: user.displayName,
        photoURL: user.photoURL,
        email: user.email,
        uid: user.uid,
        providerId: tokenResponse.providerId,
        keywords: generateKeywords(user.displayName),
      });
    }
  };

  const handleFBLogin = async () => {
    signInWithRedirect(auth, fbProvider);
    const { _tokenResponse, user } = await getRedirectResult(auth);
    addUser(_tokenResponse, user);
  };

  const handleGGLogin = async () => {
    signInWithRedirect(auth, ggProvider);
    const { _tokenResponse, user } = await getRedirectResult(auth);
    addUser(_tokenResponse, user);
  };

  return (
    <div className="min-h-screen max-w-screen-xl min-w-full flex justify-center items-center bg-prm-black">
      <div className="">
        <h2 className="text-4xl text-center text-prm-white">
          App Chat Realtime
        </h2>
        <div className="mt-10 flex flex-col">
          <button
            onClick={handleGGLogin}
            className="text-xl px-5 py-2 border text-prm-orange border-prm-orange hover:bg-prm-orange hover:text-prm-black rounded-sm transition-hover"
          >
            Đăng nhập bằng Google
          </button>
          <button
            onClick={handleFBLogin}
            className="mt-5 text-xl px-5 py-2 border text-prm-orange border-prm-orange hover:bg-prm-orange hover:text-prm-black rounded-sm transition-hover"
          >
            Đăng nhập bằng Facebook
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
