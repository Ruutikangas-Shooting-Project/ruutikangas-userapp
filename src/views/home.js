import React,{ useContext, useState, useEffect }  from "react";
import { Link } from "react-router-dom";
import { LanguageContext } from '../context/languageContext';


const Home = () => {
    const { multiLang } = useContext(LanguageContext);
    const  [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
      const checkToken = () => {
        const token = localStorage.getItem("idToken");
        const tokenExpire = localStorage.getItem("tokenExpire");
    
        if (!token || !tokenExpire || Date.now() > Number(tokenExpire)) {
          console.log("Token expired, logging out");
          setIsLoggedIn(false);
          localStorage.removeItem("idToken");
          localStorage.removeItem("tokenExpire");
        } else {
          console.log("Valid token found");
          setIsLoggedIn(true);
        }
      };
    
      checkToken();
      const interval = setInterval(checkToken, 60 * 1000); // 每分鐘檢查 Token
    
      return () => clearInterval(interval);
    }, []);

    const text = {
        FI: {
          h1text: "Tervetuloa Ruutikankaan ampumaradalle",
          ptext: "Kirjaudu sisään tai rekisteröidy jos haluat päästä käsiksi harjoitusvideoihisi",
          btnReg: "Rekisteröidy",
          btnLogin: "Kirjaudu",
          btnSInfo: "Ammunta Info",
          btnUser:"Käyttäjätiedot",
          privacytxt: "Tietosuojaseloste: Rekisteröitymällä tai kirjautumalla hyväksyt tietojesi käytön kuten on kuvattu tietosuojakäytännössämme。",
        },
        EN: {
          h1text: "Welcome to Ruutikangas Shooting Sport Center",
          ptext: "Ruutikangas Shooting Sport Center has over 300 shooting places on 35 tracks",
          btnReg: "Sign up",
          btnLogin: "Login",
          btnSInfo: "Shooting Info",
          btnUSer:"User Data",
          privacytxt: "Privacy Notice: By registering or logging in, you agree to our use of your data as outlined in our Privacy Policy.",
        },
      };    

  return (
    <main className="container mx-auto px-4 max-w-screen-sm">
      <h2 className="text-xl sm:text-3xl font-bold text-right my-8"> {text[multiLang].h1text}</h2>
      <p className="text-right text-sm md:text-base"> {text[multiLang]?.ptext}</p>
      <div className="flex sm:flex-row md:flex-col items-center justify-centern my-8 space-x-2 md:space-y-0 md:space-x-4">
      {isLoggedIn ? (
        <>
                            <Link to="/shootinginfo">
                        <button
                            type="button"
                            className="btn btn-primary bg-purple-500 text-white rounded py-2 px-6 hover:bg-purple-600 focus:outline-none"
                        >
                            {text[multiLang].btnShoot}
                        </button>
                    </Link>
                    
        </> ) : (
                    <>
                        <Link to="/signin">
                            <button
                                type="button"
                                className="btn btn-primary bg-purple-500 text-white rounded py-2 px-6 hover:bg-purple-600 focus:outline-none"
                            >
                                {text[multiLang].btnLogin}
                            </button>
                        </Link>

                        <Link to="/signup">
                            <button
                                type="button"
                                className="btn btn-primary bg-purple-500 text-white rounded py-2 px-6 hover:bg-purple-600 focus:outline-none"
                            >
                                {text[multiLang].btnReg}
                            </button>
                        </Link>
                    </>
                )}
                <Link to="/shootinginfo">
                    <button
                        type="button"
                        className="btn btn-primary bg-purple-500 text-white rounded py-2 px-6 hover:bg-purple-600 focus:outline-none"
                    >
                        {text[multiLang].btnSInfo}
                    </button>
                </Link>
            </div>

      <p className="text-right text-sm md:text-base">
      {text[multiLang].privacytxt}
      </p>
    </main>
  );
};

export default Home;
