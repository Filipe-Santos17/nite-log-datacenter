import { initializeApp } from 'firebase/app';
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {googleApiKey} from "./configFiles";

const firebaseConfig = {
    apiKey: `${googleApiKey}`,
    authDomain: "nitelog-1e1a5.firebaseapp.com",
    projectId: "nitelog-1e1a5",
    storageBucket: "nitelog-1e1a5.appspot.com",
    messagingSenderId: "1041625278497",
    appId: "1:1041625278497:web:849a7e09933a85c8f3db60",
    measurementId: "G-YFD8RGSW6E"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);