import React, { useState, useContext  } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { LanguageContext } from '../context/languageContext';
//import '../styles/signin.css'; // Optional, your custom CSS if needed
import { useNavigate } from 'react-router-dom';
import SignUp from './signup';
import { auth } from "../firebase"
import { signInWithEmailAndPassword } from 'firebase/auth';
//import Header from './header';  
//import NavBar from './navbar'; 

const SignIn = () => {
  // State for email, password, and toggling password visibility
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { multiLang } = useContext(LanguageContext);
  const text = {
    FI :{
        h1txt:"Kirjaudu",
        email:"Säköposti",
        pwd:"Salasana",
        forget:"Unodut salasana?",
        login:"Kirjaudu",
        SignUp:"Rekisteröidy",
        noaccount:"Ei tunnusta? "
    },
    
    EN :{
        h1txt:"Sign in",
        email:"Email",
        pwd:"Password",
        forget:"Forget password?",
        login:"Kirjaudu",
        signUp:"Sign up",
        noaccount:"Don’t have an account?"
    }
  }

  // Handler for submitting the form
  /*old code
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === "test@example.com" && password === "password") {
      setError("");
      console.log("Login successful");
      // Redirect to dashboard or any other page after successful login
      navigate('/dashboard');
    } else {
      setError("Invalid email or password");
    }
  };
*/
//new code test
const handleSubmit = async(e) => {
  e.preventDefault();
  try {
    await signInWithEmailAndPassword(auth, email, password);
    setError("");
    console.log("login successful");
    navigate("/userData");
  }catch(err) {
    setError("wrong email or password");
    console.error(err.message);
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
          {error && <p className="text-red-500 text-center">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
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
              {text[multiLang].pwd}
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
                {/* Toggle Button for Password Visibility */}
                <button
                  type="button"
                  onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 focus:outline-none"
                >
                  {isPasswordVisible ? "Hide" : "Show"}
                </button>
              </div>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="btn btn-primary w-full bg-purple-500 text-white rounded py-2 hover:bg-purple-600 focus:outline-none"
              >
                {text[multiLang].login}
              </button>
            </div>
            <div className="text-center mt-4">
              <a href="#forgot-password" className="text-sm text-gray-500 hover:text-purple-600">
              {text[multiLang].forget}
              </a>
            </div>
          </form>
          <div className="text-center mt-6">
            <p className="text-sm">
            {text[multiLang].noaccount}{" "}
              <a
                href="#signup"
                className="text-purple-500 hover:text-purple-700"
                onClick={() => navigate('/signup')}
              >
                 {text[multiLang].signUp}
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;