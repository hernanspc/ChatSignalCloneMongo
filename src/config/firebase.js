import { initializeApp } from "firebase/app";
import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    updateProfile,
} from "firebase/auth";
import { getStorage } from "firebase/storage";
import { initializeFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDiOq2Lg4WeuAUqXb7PTL4C0MIjUoDWQ_o",
    authDomain: "uderchat.firebaseapp.com",
    projectId: "uderchat",
    storageBucket: "uderchat.appspot.com",
    messagingSenderId: "63791659111",
    appId: "1:63791659111:web:55dbeaadcc9e3da1bc3cc2"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = initializeFirestore(app, {
    experimentalForceLongPolling: true,
});