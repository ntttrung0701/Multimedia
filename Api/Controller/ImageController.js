// api/Controller/ImageController.js
const { storage, db } = require('../Config/firebase');
const { ref, uploadBytes, getDownloadURL, deleteObject } = require('firebase/storage');
const { collection, addDoc, getDocs, doc, getDoc, deleteDoc } = require('firebase/firestore');

// Upload Image
exports.uploadImage = async (req, res) => {
  try {
    const file = req.file;
    const storageRef = ref(storage, `images/${Date.now()}-${file.originalname}`);
    await uploadBytes(storageRef, file.buffer);
    const url = await getDownloadURL(storageRef);

    const docRef = await addDoc(collection(db, 'images'), {
      name: file.originalname,
      url: url,
      createdAt: new Date(),
    });

    res.status(200).json({ id: docRef.id, url: url });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ error: 'Failed to upload image' });
  }
};

// Fetch Images
exports.getAllImages = async (req, res) => {
  try {
    const querySnapshot = await getDocs(collection(db, 'images'));
    const images = [];
    querySnapshot.forEach((doc) => {
      images.push({ id: doc.id, ...doc.data() });
    });
    res.status(200).json(images);
  } catch (error) {
    console.error('Error fetching images:', error);
    res.status(500).json({ error: 'Failed to fetch images' });
  }
};

// Get Image by ID
exports.getImageById = async (req, res) => {
  try {
    const docRef = doc(db, 'images', req.params.id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      res.status(200).json(docSnap.data());
    } else {
      res.status(404).json({ message: 'Image not found' });
    }
  } catch (error) {
    console.error('Error fetching image by ID:', error);
    res.status(500).json({ error: 'Failed to fetch image' });
  }
};

// Delete Image
exports.deleteImage = async (req, res) => {
  try {
    const { id } = req.params;
    const { imageName } = req.body;

    console.log(`Attempting to delete file: images/${imageName}`);

    // Delete from Firebase Storage
    const storageRef = ref(storage, `images/${imageName}`);
    await deleteObject(storageRef);

    // Delete from Firestore
    const docRef = doc(db, 'images', id);
    await deleteDoc(docRef);

    res.status(200).json({ message: 'Image deleted successfully' });
  } catch (error) {
    console.error('Error deleting image:', error);
    res.status(500).json({ error: 'Failed to delete image' });
  }
};
exports.saveEditedImage = async (req, res) => {
  try {
    const { imageData, fileName } = req.body;

    // Tạo tên file duy nhất nếu không có
    const uniqueFileName = fileName || `edited_image_${Date.now()}.png`;

    // Tạo reference tới Firebase Storage
    const storageRef = storage.ref(`images/${uniqueFileName}`);

    // Lưu ảnh lên Firebase Storage
    await storageRef.putString(imageData, 'data_url');

    // Lấy URL tải xuống của ảnh
    const url = await storageRef.getDownloadURL();

    // Lưu URL và thông tin ảnh vào Firestore
    await firestore.collection('images').add({
      name: uniqueFileName,
      url: url,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });

    res.status(200).json({ message: 'Ảnh đã được lưu thành công!', url });
  } catch (error) {
    console.error('Lỗi khi lưu ảnh:', error);
    res.status(500).json({ error: 'Lỗi khi lưu ảnh. Vui lòng thử lại.' });
  }
};