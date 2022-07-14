import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCXL43j9VzysJSd-9-PO2B7YihEsTBVSHQ",
  authDomain: "app-chat-realtime-5b389.firebaseapp.com",
  projectId: "app-chat-realtime-5b389",
  storageBucket: "app-chat-realtime-5b389.appspot.com",
  messagingSenderId: "873383541360",
  appId: "1:873383541360:web:2f8274fbff1482a6d592b5",
  measurementId: "G-GG1YPPVRN9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth();
const db = getFirestore();

const storage = getStorage(app);

export { db, auth, storage };

