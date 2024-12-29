import React, { useState, useContext, useEffect  } from 'react';
import { LanguageContext } from '../context/languageContext';
import { useNavigate } from 'react-router-dom';
import { auth, db } from "../firebase"
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage"
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from "firebase/firestore"


const UserData = () => {
  // State for email, password, and toggling password visibility
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState({});
  const [mediaFiles, setMediaFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  const storage = getStorage();
  const navigate = useNavigate();
  const { multiLang } = useContext(LanguageContext);
  const text = {
    FI :{
        h1txt:"Tevetuloa",
        email:"Säköposti",
        name:"Nimi",
        media:"Sinun tiedostot",
        
    },
    
    EN :{
        h1txt:"Welcome",
        email:"Email",
        name:"Name",
        media:"Your files",

        
    }
  }
useEffect(()=>{
    const fetchUserData = async(currentUser) =>
      {
        try { 
            const userDoc = doc(db, "users", currentUser.uid);
            const userSnap = await getDoc(userDoc);
            if(userSnap.exists()){
                setUserData(userSnap.data());
             } else { 
                console.error("No user data found.");
              } 
         } catch(error){
                console.error("Fetch user data error", error);
         } 
      };

     const fetchMediaFiles = async (currentUser) => {
      try {
        console.log("Fetching media files for:", currentUser.email);
        const userFolderRef = ref(storage, `drone_media/${encodeURIComponent(currentUser.email)}`);
        const files = await listAll(userFolderRef);
        if (files.items.length === 0) {
          console.log("No files found in storage for this user.");
        }
        const filesUrls = await Promise.all(
          files.items.map(async (fileRef) => {
            const url = await getDownloadURL(fileRef);
            return url;
          })
        );
        setMediaFiles(filesUrls);
      } catch (error) {
        console.error('Error fetching media files:', error);
      }
      setLoading(false);
    };

  const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    if(currentUser){
      console.log("Current User:", currentUser);
      setUser(currentUser);
      fetchUserData(currentUser);
      fetchMediaFiles(currentUser);
    } else {
      //console.log("User have not signed in");
      console.log("User not signed in");
      setLoading(false);
      navigate("/signin"); 
    }});
    return () => unsubscribe();
  }, [storage, navigate]);

  if (loading) return <p>Loading...</p>;


  return (
    <>
      <div>
        <h1>{text[multiLang].h1txt}{userData.name} </h1>
        <p>{text[multiLang].email} {userData.email}</p>
        <p>{text[multiLang].name}{userData.fm}</p>
        <h2>{text[multiLang].media}</h2>

        {mediaFiles.length >0 ?(
        mediaFiles.map((filesUrls, index) => (
          <div key={index}>
            <a href={filesUrls} target="_blank" rel="norepeat noreferrer">
              {filesUrls}</a>

          </div>
        ))
      ):(<p>No Media files available</p>)}

      </div>
    </>
  );
};

export default UserData;

//new code test
/*const handleSubmit = async(e) => {
  e.preventDefault();
  try {
    await signInWithEmailAndPassword(auth, email, password);
    setError("");
    console.log("login successful");
    navigate("dashboard");
  }catch(error) {
    setError("wrong email or password");
    console.error(error.message);
  }
};*/