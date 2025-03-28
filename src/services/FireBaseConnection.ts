import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyCrD-ip4O2Ho0bev-CigAoUoGvIDow3tLM",
  authDomain: "webcarros-ed27d.firebaseapp.com",
  projectId: "webcarros-ed27d",
  storageBucket: "webcarros-ed27d.firebasestorage.app",
  messagingSenderId: "675087992771",
  appId: "1:675087992771:web:50ceb6568d54bde0ca1f76"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app)
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };