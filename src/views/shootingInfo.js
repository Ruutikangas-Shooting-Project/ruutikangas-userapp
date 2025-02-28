import React, { useState, useEffect, useContext, useRef } from "react";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { doc, setDoc, getDoc, addDoc, collection } from "firebase/firestore";
import { onAuthStateChanged, signOut  } from "firebase/auth";
import { LanguageContext } from "../context/languageContext";
import { clear } from "@testing-library/user-event/dist/clear";



const ShootingInfo = () => {
  //const [firstName, setFirstName] = useState("");
  //const [lastName, setLastName] = useState("");
  const [userData, setUserData] = useState("");
  const [shootingTime, setShootingTime] = useState("");
  const [gateNumber, setGateNumber] = useState("Gate 1");
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const { multiLang } = useContext(LanguageContext);
  const logoutTimerRef = useRef(null); // Ref for timeout function
  const inactivityLimit = 10 * 60*1000 ; // 10 minutes in milliseconds

  const text = {
    FI: {
      h1txt: "Ilmoittaudu ammuntaan",
      firstname: "Etunimi",
      lastname: "Sukunimi",
      time: "Ammunnan ajankohta",
      gate: "Portin numero",
      submit: "Vahvista",
      success: "Rekisteröinti onnistui!",
      error: "Kaikki kentät on täytettävä!",
    },
    EN: {
      h1txt: "Register for Shooting",
      firstname: "First Name",
      lastname: "Last Name",
      time: "Shooting Time",
      gate: "Gate Number",
      submit: "Submit",
      success: "Registration Successful!",
      error: "All fields are required!",
    },
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        navigate("/signin"); 
      } else {
        setUser(currentUser);
        await fetchUserData(currentUser.uid);
        resetAutoLogout(); 
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  /* useEffect(() => {
    const resetLogoutTimer = () => {
      console.log("User active, auto logout timer reset.");
      resetAutoLogout();
    };

    window.addEventListener("mousemove", resetLogoutTimer);
    window.addEventListener("keydown", resetLogoutTimer);
    window.addEventListener("click", resetLogoutTimer);

    return () => {
      window.removeEventListener("mousemove", resetLogoutTimer);
      window.removeEventListener("keydown", resetLogoutTimer);
      window.removeEventListener("click", resetLogoutTimer);
      clearTimeout(logoutTimerRef.current);
    };
  }, []);
 */
  const resetAutoLogout = () => {
    if (logoutTimerRef.current) {
      clearTimeout(logoutTimerRef.current);
    }
    console.log("Debug for auto logout 10m.");
    logoutTimerRef.current = setTimeout(() => {
      console.log("User inactive for 10 minutes. Auto logging out...");
      console.log("Debug time out counting...");
      handleSignOut();
    }, inactivityLimit);
  };
  const handleSignOut = async () => {
    try {
      if (logoutTimerRef.current) {
        clearTimeout(logoutTimerRef.current);
      }
      await signOut(auth);
      console.log("✅ Sign out successful");
      navigate("/signin");
    } catch (error) {
      console.error("❌ Sign out error:", error);
    }
  };
  /* const handleSignOut = async () => {
    try {
      clearTimeout(logoutTimerRef.current);
      await signOut(auth);
      console.log("Sign out successful");
      navigate("/signin");
    } catch (error) {
      console.error("Sign out error:", error);
    }
  }; */

  const fetchUserData = async (uid) => {
    try {
      const userDocRef = doc(db, "users", uid);
      const userSnap = await getDoc(userDocRef);
      
      if (userSnap.exists()) {
        const data = userSnap.data();
        setUserData(data);
      } else {
        console.error("No user data found.");
      }
    } catch (error) {
      console.error("Fetch user data error:", error);
    }
  };


  useEffect(() => {
    if (success) {
        console.log("Success! Redirecting in 5 seconds...");
        const timer = setTimeout(() => {
            navigate("/userData");
        }, 5000);
        return () => clearTimeout(timer);
    }
}, [success, navigate]);

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userData?.fm || !userData?.lm || !shootingTime || !gateNumber) {
        setError(text[multiLang].error);
        return;
    }
    try {
        await addDoc(collection(db, "shootingInfo"), {
            firstName: userData.fm,
            lastName: userData.lm,
            shootingTime,
            gateNumber,
            userId: user.uid,
            timestamp: new Date() 
        });

      setSuccess(true);
      console.log("Success update! Redirecting in 5 seconds...");
      setError("");
      console.log("Shooting time registered successfully.");
      //setTimeout(() => navigate("/userData"), 5000);
    } catch (error) {
      console.error("Error registering shooting time:", error);
      setError("Registration failed, please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h1 className="text-center text-2xl font-bold mb-6">{text.EN.h1txt}</h1>

        {success && (
              <>
                <p className="text-green-500 text-center">{text[multiLang].success}</p>
                <p className="text-center">Redirecting to your profile...</p>
              </>
        ) }
        {error && <p className="text-red-500 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-group">
          <label className="block text-sm font-medium">{text[multiLang].firstname}</label>
          <p>{userData?.fm || "Loading..."}</p>
          </div>

          <div className="form-group">
          <label className="block text-sm font-medium">{text[multiLang].lastname}</label>
          <p> {userData?.lm || "Loading..."}</p>
          </div>

          <div className="form-group">
            <label className="block text-sm font-medium">{text.EN.time}</label>
            <input
              type="datetime-local"
              className="form-control w-full px-3 py-2 border rounded"
              value={shootingTime}
              onChange={(e) => setShootingTime(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="block text-sm font-medium">{text.EN.gate}</label>
            <select
              className="form-control w-full px-3 py-2 border rounded"
              value={gateNumber}
              onChange={(e) => setGateNumber(e.target.value)}
              required
            >
              <option value="Gate 1">Gate 1</option>
              <option value="Gate 2">Gate 2</option>
              <option value="Gate 3">Gate 3</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary w-full bg-blue-500 text-white rounded py-3">
            {text.EN.submit}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ShootingInfo;
