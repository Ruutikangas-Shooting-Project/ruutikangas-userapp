// server.js
const express = require('express');
//slove the cors error issue
const cors = require('cors');
const admin = require('firebase-admin');
const { doc, getDoc } = require('firebase/firestore');
const { getStorage } = require('firebase-admin/storage');
const { getFirestore } = require('firebase-admin/firestore');
//const { getAuth, signInWithEmailAndPassword } = require('firebase/auth');

const app = express();
const PORT = process.env.PORT || 3001;

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(require('./service-account-key.json')),
  //storageBucket: "gs://ruutinkangas.firebasestorage.app"
  storageBucket: "ruutinkangas.firebasestorage.app"
 //change the bucket name
});

const bucket = admin.storage().bucket();
//20250220新代碼
const db = getFirestore();
//舊代碼
// const db= admin.firestore();
//set up cors
app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());

//20250220新代碼,驗證token
async function verifyToken(req, res, next) {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken; 
    next();
  } catch (error) {
    console.error("Token verification error:", error);
    return res.status(403).json({ error: "Invalid token" });
  }
}

//firebase SDK
app.get('/media', verifyToken, async (req, res) => {
  try {
    const userId = req.user.uid;
    console.log("userUID:", userId);
    const userDoc = db.collection("users").doc(userId);
    const userSnap = await userDoc.get();
    if (!userSnap.exists) {
      return res.status(404).json({ error: 'User not found in Firestore' });
    }
    const userData = userSnap.data();
    const folderName = `${userData.fm} ${userData.lm}`;
    const prefix = `drone_media/${folderName}/`;

    console.log("Storage folder:", prefix);
    const [files] = await bucket.getFiles({ prefix });

    if (files.length === 0) {
      return res.status(404).json({ error: "No files found" });
    }
    //new code to give signurl to get download url
    const filesData = await Promise.all(
      files.map(async (file) => {
      const [url] = await file.getSignedUrl({
        action: 'read',
        expires: Date.now() + 100 * 60 * 1000, // 10 minutes limit
      });
      return {
        name: file.name.split('/').pop(),
        url: url,
        type: file.metadata.contentType || 'unknown',
      };
    }));
 
    res.status(200).json({ files: filesData });
  } catch (error) {
    console.error("error, can not get media file:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.delete('/media/:folderName/:fileName', verifyToken, async (req, res) => {
  try {
    const userId = req.user.uid;
    const folderName = req.params.folderName;
    const fileName = req.params.fileName;

    if (!userId) {
      return res.status(401).json({ error: 'No userId found' });
    }
    if (!fileName) {
      return res.status(400).json({ error: 'No fileName found' });
    }

    const userDoc = db.collection("users").doc(userId);
    const userSnap = await userDoc.get();
    if (!userSnap.exists) {
      return res.status(404).json({ error: 'User not found!' });
    }

    const userData = userSnap.data();
    const expectedFolderName = `${userData.fm} ${userData.lm}`;

    if (folderName !== expectedFolderName) {
      return res.status(403).json({ error: 'Unauthorized to delete this file' });
    }

    const filePath = `drone_media/${folderName}/${fileName}`;
    console.log("Deleting file:", filePath);

    const fileRef = bucket.file(filePath);
    const [exists] = await fileRef.exists();
    if (!exists) {
      return res.status(404).json({ error: 'File not found' });
    }

    await fileRef.delete();
    console.log(`File ${filePath} deleted successfully`);
    res.status(200).json({ message: 'File deleted successfully' });

  } catch (error) {
    console.error("Error deleting media file:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

