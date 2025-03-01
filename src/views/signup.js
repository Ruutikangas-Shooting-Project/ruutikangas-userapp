import React, { useState, useContext  } from 'react';
import { auth, db } from '../firebase';
import 'bootstrap/dist/css/bootstrap.min.css';
import { LanguageContext } from '../context/languageContext';
//import '../styles/signup.css'; // Optional custom CSS
import { createUserWithEmailAndPassword } from "firebase/auth"
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
//import Header from './header';  
//import NavBar from './navbar'; 


const SignUp = () => {
  // State for input fields and password visibility
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false); 

  //for multi language
  const { multiLang } = useContext(LanguageContext);
  const navigate = useNavigate();

  const text = {
    FI :{
        h1txt:"Rekisteröidy",
        firstname:"Etunimi",
        lastName:"Sukunimi",
        email:"Säköposti",
        createpwd:"Sinun Salasana",
        confirmpwd:"Vahvista Salasana",
        haveacc:"Onko sinulla jo tili?",
        login:"Kirjaudu",
        SignUp:"Rekisteröidy"
    },
    
    EN :{
        h1txt:"Sign Up",
        firstName:"First Name",
        lastName:"Last Name",
        email:"Email",
        createpwd:"Create Password",
        confirmpwd:"Confirm Password",
        haveacc:"Already have an account?",
        login:"Kirjaudu",
        signUp:"Sign up"

    }
  }

  // Handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      setError("All fields are required.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword
      (auth, email, password);

      const user = userCredential.user;
  
      // 在 Firestore 中新增用戶詳細資料
      await setDoc(doc(db, "users", user.uid), {
        fm: firstName,
        lm: lastName,
        //due to email save to auth
        email: user.email, 
      });
      setSuccess(true);
      console.log("User signed up and added to database:", user.uid);
      navigate("/signin");
    } catch (error) {
      console.error("Error during signup:", error);
      setError("Signup failed. Please try again.");
      setSuccess(false);
    }
  };

  return (
    <>
      {/* Include Header and NavBar 
            <Header />
      <NavBar />
      */}

      <div className="min-h-screen flex items-center justify-center bg-gray-200">
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md mx-auto md:max-w-lg">
          <h1 className="text-center text-2xl md:text-3xl font-bold mb-6">
          {text[multiLang].h1txt}
          </h1>
            {/* show successful or fail*/}
        {success && (
          <p className="text-green-500 text-center">
            Registration successful! Direct to login...
          </p>
        )}
          {error && <p className="text-red-500 text-center">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-group">
              <label htmlFor="firstname" className="block text-sm font-medium">
              {text[multiLang].firstName}
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                className="form-control block w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-green-300"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
               </div>
               <div className="form-group">
              <label htmlFor="lastname" className="block text-sm font-medium">
              {text[multiLang].lastName}
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                className="form-control block w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-green-300"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
               </div>
          
            <div className="form-group">
              <label htmlFor="email" className="block text-sm font-medium">
              {text[multiLang].email}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-control block w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-green-300"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password" className="block text-sm font-medium">
              {text[multiLang].createpwd}
              </label>
              <div className="relative">
                <input
                  type={isPasswordVisible ? "text" : "password"}
                  id="password"
                  name="password"
                  className="form-control block w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-green-300"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 focus:outline-none"
                >
                  {isPasswordVisible ? "Hide" : "Show"}
                </button>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="confirm-password" className="block text-sm font-medium">
              {text[multiLang].confirmpwd}
              </label>
              <input
                type="password"
                id="confirm-password"
                name="confirmPassword"
                className="form-control block w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-green-300"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="btn btn-primary w-full bg-purple-500 text-white rounded py-3 hover:bg-purple-600 focus:outline-none text-lg"
              >
                 {text[multiLang].signUp}
              </button>
            </div>
          </form>
          <div className="text-center mt-6">
            <p className="text-sm">
            {text[multiLang].haveacc}{" "}
              <a
                href="#signin"
                className="text-purple-500 hover:text-purple-700"
                onClick={() => navigate('/signin')}
              >
                 {text[multiLang].login}
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;