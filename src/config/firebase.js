import { initializeApp } from 'firebase/app';
import { getAuth, signOut } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// import Constants from 'expo-constants';
// Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyDiOq2Lg4WeuAUqXb7PTL4C0MIjUoDWQ_o",
    authDomain: "uderchat.firebaseapp.com",
    projectId: "uderchat",
    storageBucket: "uderchat.appspot.com",
    messagingSenderId: "63791659111",
    appId: "1:63791659111:web:55dbeaadcc9e3da1bc3cc2"
};
// initialize firebase
initializeApp(firebaseConfig);
export const auth = getAuth();
export const database = getFirestore();

// export const signOutApp = signOut();