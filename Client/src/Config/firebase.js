import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBrdNfK7Q2f3pKrsGM2OpRvCBQ_isWAD60",
    authDomain: "multimedia-a6825.firebaseapp.com",
    databaseURL: "https://multimedia-a6825-default-rtdb.firebaseio.com",
    projectId: "multimedia-a6825",
    storageBucket: "multimedia-a6825.appspot.com",
    messagingSenderId: "670693742554",
    appId: "1:670693742554:web:bf2c1705cf76f4a2c5d2e3",
    measurementId: "G-7GXG0R8TL3"
};

const app = initializeApp(firebaseConfig);

const firestore = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { firestore, storage, auth };