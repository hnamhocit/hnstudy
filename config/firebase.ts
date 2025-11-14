import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyCwIpRcyORF1q42cw6i6sSBqcO2J_6SO3s",
  authDomain: "hnstudy.vercel.app",
  projectId: "flash-card-34e9b",
  storageBucket: "flash-card-34e9b.firebasestorage.app",
  messagingSenderId: "782714750971",
  appId: "1:782714750971:web:eb9924e93a7e3ff688ad5e"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const auth = getAuth(app)

export { db, auth }
