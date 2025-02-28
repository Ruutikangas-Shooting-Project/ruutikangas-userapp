import React, { useState, useContext, useEffect, useRef   } from 'react';
import { LanguageContext } from '../context/languageContext';
import { useNavigate } from 'react-router-dom';
import { auth, db } from "../firebase"
import { getStorage, ref, getDownloadURL } from "firebase/storage"
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from "firebase/firestore"
import { clear } from '@testing-library/user-event/dist/clear';


const UserData = () => {
  // State for email, password, and toggling password visibility
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState({});
  const [mediaFiles, setMediaFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const storage = getStorage();
  const navigate = useNavigate();
  const logoutTimerRef = useRef(null); 
  const inactivityLimit = 10 * 60 *1000; 
  const { multiLang } = useContext(LanguageContext);
  const text = {
    FI :{
        h1txt:"Tervetuloa!",
        email:"Säköposti:  ",
        Firstname:"Edunimi:  ",
        Lastname:"Sukunimi:  ",
        signOut: "Kirjaudu ulos",
        ShootingInfo: "Anta ammunta Info",
        media:"Sinun tiedostot:  ",
    },
    
    EN :{
        h1txt:"Welcome!",
        email:"Email:  ",
        Firstname:"First Name:   ",
        Lastname:"Last Name:  ",
        signOut: "Sign out",   
        ShootingInfo: "Give Shooting Info",
        media:"Your files:  ",        
    }
  }
  const handleSignOut = async() => {
    try {
      clearInterval(logoutTimerRef.current);
      await signOut(auth);
      console.log("Sign out successful");
      navigate("/signin");
    }catch(error){
      console.error("Sign out error:", error);
    }
  };
  // Auto logout after inactivity
  useEffect(() => {
    let timeLeft = inactivityLimit;
    logoutTimerRef.current = setInterval(() => {
      timeLeft -= 1;
      //console.log(`Auto Logout in: ${Math.floor(timeLeft / 60)}:${String(timeLeft % 60).padStart(2, '0')}`);
      
      if (timeLeft <= 0) {
        clearInterval(logoutTimerRef.current);
        handleSignOut();
      }
    }, 1000); 
const logoutTimer = () => {
  timeLeft = inactivityLimit;
  console.log("Debug, user active autologout timer reset");
}
//const activityEvents = ["mousemove", "keydown", "click",  "touchstart", "touchmove"];
//activityEvents.forEach(event => window.addEventListener(event, logoutTimer));

return () => {
  clearInterval(logoutTimerRef.current);
  //activityEvents.forEach(event => window.removeEventListener(event, logoutTimer));
};
}, []);

const fetchUserData = async(currentUser) =>{
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
  }};

  const fetchMediaFiles = async (currentUser) => {
    try {    
      const token = await currentUser.getIdToken();
      console.log("Token:", token);
      const response = await fetch("http://localhost:3001/media", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response:", errorText);
        throw new Error(`Failed to fetch media files: ${response.statusText}`);
      }

      const { files } = await response.json();
      const updatedFiles = await Promise.all(
        files.map(async (file) => {
          try {
            const filesRef = ref(
              storage,
              `drone_media/${file.name}`
            );
            const downloadURL = await getDownloadURL(filesRef);
            return { ...file, url: downloadURL };
          } catch (error) {
            console.error(`Error getting download URL for ${file.name}:`, error);
            return file; 
          }
        })
      );

      console.log("Updated files with valid URLs:", updatedFiles);
      setMediaFiles(updatedFiles);
    } catch (error) {
      console.error("Error fetching media files:", error);
      setMediaFiles([]);
    } finally {
      setLoading(false);
    }
  };    

useEffect(()=>{
   const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    if(currentUser){
      console.log("Current User:", currentUser);
      setUser(currentUser);
      fetchUserData(currentUser);
      fetchMediaFiles(currentUser);
    } else {
      console.log("User not signed in");
      setLoading(false);
      navigate("/signin"); 
    }});
    return () => unsubscribe();
  }, [navigate]);
  useEffect(() => {
    if (user) {
      fetchMediaFiles(user);
    }
  }, [userData, user]); 
  if (loading) return <p>Loading...</p>;

  const deleteFile = async (fileName) => {
    console.log("🗑️ Attempting to delete file:", fileName);
  
    if (!window.confirm(`Are you sure you want to delete ${fileName}?`)) {
      console.log("❌ User canceled deletion.");
      return;
    }
    try {
      if (!user) {
        console.error("❌ No user is signed in.");
        return;
      }
      const token = await user.getIdToken();
      const folderName = `${userData.fm} ${userData.lm}`;
      console.log("🔍 Deleting file from storage path:", `drone_media/${folderName}/${fileName}`);
      const response = await fetch(`http://localhost:3001/media/${encodeURIComponent(folderName)}/${encodeURIComponent(fileName)}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`, 
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error deleting file from server:", errorText);
        throw new Error("Failed to delete file from server.");
      }
  
      console.log(`Successfully deleted ${fileName} from server.`);
      setMediaFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileName));
      console.log(`Updated UI: ${fileName} removed from list.`);
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };
  
  return (
    <>
      <div>
        <h1>{text[multiLang].h1txt}</h1>
        <p>{text[multiLang].email} {userData.email}</p>
        <p>{text[multiLang].Firstname}{userData.fm}</p>
        <p>{text[multiLang].Lastname}{userData.lm}</p>
        <h2>{text[multiLang].media}</h2>
        {mediaFiles.length >0 ?(
        mediaFiles
        .filter((file) => file.name && file.url) 
        .map((file, index) => (
        <div
          key={index}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '10px',
            marginBottom: '10px'
          }}>
          <a
            href={file.url}
            target="_blank"
            rel="noreferrer"
            download={file.name}
            style={{textDecoration: "none", color: "blue", fontSize: "18px"}}
          >
            {file.name} 📥
          </a>

          <button 
            onClick={() => deleteFile(file.name)}
            style={{ 
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "red",
              fontSize: "16px",
            }} 
            title="Delete">
            🗑️
          </button>
          </div>
        ))
      ):(<p>No Media files available</p>)}
      <button onClick={handleSignOut}
      style={{
        marginTop: "20px",
        padding: "10px 20px",
        background: "red",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
      }}>{text[multiLang].signOut}</button>
      <button onClick={() => navigate("/shootinginfo")}
      style={{
        marginTop: "20px",
        padding: "10px 20px",
        background: "blue",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
      }}>{text[multiLang].ShootingInfo}</button>
      </div>
    </>
  );
};

export default UserData;
