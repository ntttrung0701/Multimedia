const { storage, db } = require('../Config/firebase');
const { ref, uploadBytes, getDownloadURL } = require('firebase/storage');
const { collection, addDoc, getDocs } = require('firebase/firestore');

// Upload Sound
exports.uploadSound = async (req, res) => {
  try {
    const file = req.file;
    const storageRef = ref(storage, `sounds/${Date.now()}-${file.originalname}`);
    await uploadBytes(storageRef, file.buffer);
    const url = await getDownloadURL(storageRef);

    const docRef = await addDoc(collection(db, 'sounds'), {
      name: file.originalname,
      url: url,
      createdAt: new Date(),
    });

    res.status(200).json({ id: docRef.id, url: url });
  } catch (error) {
    console.error('Error uploading sound:', error);
    res.status(500).json({ error: 'Failed to upload sound' });
  }
};

// Fetch Sounds
exports.getAllSounds = async (req, res) => {
  try {
    const querySnapshot = await getDocs(collection(db, 'sounds'));
    const sounds = [];
    querySnapshot.forEach((doc) => {
      sounds.push({ id: doc.id, ...doc.data() });
    });
    res.status(200).json(sounds);
  } catch (error) {
    console.error('Error fetching sounds:', error);
    res.status(500).json({ error: 'Failed to fetch sounds' });
  }
};