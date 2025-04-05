// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyAeyPvbVMkA9t657zR7AT1-NBtgcCHkVnE",
    authDomain: "synccharge-17361.firebaseapp.com",
    databaseURL: "https://synccharge-17361-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "synccharge-17361",
    storageBucket: "synccharge-17361.firebasestorage.app",
    messagingSenderId: "874091018582",
    appId: "1:874091018582:web:ca244f4d431f091f153ef7"
  };

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database, ref, get };
