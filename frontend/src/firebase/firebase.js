import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {

  apiKey: "AIzaSyB3LXoU94ODOjmZObSoh1ip0dhcgEvSlzA",

  authDomain: "ai-vision-detect.firebaseapp.com",

  projectId: "ai-vision-detect",

  storageBucket: "ai-vision-detect.firebasestorage.app",

  messagingSenderId: "322470253806",

  appId: "1:322470253806:web:3be1287982302402654fff",

};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);