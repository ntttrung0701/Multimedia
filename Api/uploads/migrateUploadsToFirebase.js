const fs = require('fs');
const path = require('path');
const { initializeApp } = require('firebase/app');
const { getStorage, ref, uploadBytes, getDownloadURL } = require('firebase/storage');
const { getFirestore, collection, addDoc } = require('firebase/firestore');
// Firebase configuration
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);

const uploadDirectory = async (dir, storagePath, collectionName) => {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const fileBuffer = fs.readFileSync(filePath);

    const storageRef = ref(storage, `${storagePath}/${Date.now()}-${file}`);
    await uploadBytes(storageRef, fileBuffer);
    const url = await getDownloadURL(storageRef);

    await addDoc(collection(db, collectionName), {
      name: file,
      url: url,
      createdAt: new Date(),
    });

    console.log(`Uploaded ${file} to Firebase Storage and saved info to Firestore`);
  }
};

// Upload images
uploadDirectory(path.join(__dirname, '../uploads/image'), 'images', 'images')
  .then(() => {
    console.log('All images uploaded');
    // Upload videos
    return uploadDirectory(path.join(__dirname, '../uploads/video'), 'videos', 'videos');
  })
  .then(() => {
    console.log('All videos uploaded');
    // Delete the uploads directory
    fs.rmSync(path.join(__dirname, '../uploads'), { recursive: true, force: true });
    console.log('Uploads directory deleted');
  })
  .catch((error) => {
    console.error('Error uploading files:', error);
  });