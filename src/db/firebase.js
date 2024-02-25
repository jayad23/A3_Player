import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDatabase, ref } from "firebase/database";
import { getEnvVariables } from "getEnv";
// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyBMAwVeFwutWdm8CuHUCZFmpS5D-qXfuyE",
//   authDomain: "hack-a-boss.firebaseapp.com",
//   projectId: "hack-a-boss",
//   storageBucket: "hack-a-boss.appspot.com",
//   messagingSenderId: "400783196743",
//   appId: "1:400783196743:web:a17c57db66379c5a78a762",
// };

const firebaseConfig = getEnvVariables;

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const realTimeDb = getDatabase();
export const realTimeDbRef = ref;
