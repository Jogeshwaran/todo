import { initializeApp } from 'firebase/app';
import {getFirestore} from 'firebase/firestore'
const firebaseApp = initializeApp({
        apiKey: "AIzaSyA7X3y1485piSr4Df9dtdDDbE-yyQU5cNc",
        authDomain: "todoapp-b4f80.firebaseapp.com",
        projectId: "todoapp-b4f80",
        storageBucket: "todoapp-b4f80.appspot.com",
        messagingSenderId: "525997542359",
        appId: "1:525997542359:web:5dd995f92eb1c25ed65992"
});

const db = getFirestore(firebaseApp);

export default db;