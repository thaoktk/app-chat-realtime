import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyARGInIWTxXRGlpWGT6_Sk6UWhhC0tcr10",
  authDomain: "app-chat-realtime-dbf44.firebaseapp.com",
  projectId: "app-chat-realtime-dbf44",
  storageBucket: "app-chat-realtime-dbf44.appspot.com",
  messagingSenderId: "260019860053",
  appId: "1:260019860053:web:000a83024460f9b5961adc",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth();
const db = getFirestore();

const storage = getStorage(app);

export { db, auth, storage };
