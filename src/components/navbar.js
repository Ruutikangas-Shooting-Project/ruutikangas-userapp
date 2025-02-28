import React,{ useEffect, useState, useContext }  from 'react';
import { LanguageContext } from '../context/languageContext';
import { Link, useNavigate } from "react-router-dom";
import ShootingInfo from '../views/shootingInfo';

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isSignin, setIsSignin] = useState(false);
    const { multiLang } = useContext(LanguageContext); 
    const navigate = useNavigate(); 

    const toggleBur = () =>{
        setIsOpen(!isOpen);
        //console.log(isOpen);
    }  
    //give laguage, other views need to notice this
    const text = {
        FI: {
            home: "Etusivu",
            signin: 'Kirjaudu',
            register: 'Rekisteröidy',
            signOut: 'Ulos',
            userData: 'Käyttäjätiedot',
            ShootingInfo: 'Ammunta Info',
            contact: 'Yhteystiedot',
        },
        EN: {
            home: "Home",
            signin: 'Sign in',
            register: 'Register',
            signOut: 'Sign out',
            userData: 'User data',
            ShootingInfo: 'Shooting Info',
            contact: 'Contact us',
        }
        }  
    //setup login, token
    useEffect(() => {
        const checkToken = () => {
            const token = localStorage.getItem("token");
            console.log("Checking token:", token); // Debug: 確保 token 正確
            setIsSignin(!!token); 
        };
        
        checkToken(); 
        window.addEventListener("storage", checkToken); 
    
        return () => {
            window.removeEventListener("storage", checkToken); 
        };
    }, []);
    
    
    const handleSignout=()=>{
        localStorage.removeItem("token");
        setIsSignin(false);
    };

  return (
    <nav className='bg-white px-2 sm:px-4 w-full'>
        <div className='container mx-auto flex justify-between items-center w-full'>
            <div className='flex items-center'>
            {/* Desktop Logo hidden= hidden when phone verson*/}
                <img 
                src='/images/logo-dark.png'
                alt='desktop logo'
                className='hidden md:block h-12'
                />
             {/* Mobile*/}    
                <img
                src='/images/logo-dark.png'
                alt='moblie logo'
                className="block sm:h-12 max-w-[120px] md:hidden h-12"
                />
            </div>
             {/* Desktop menu hidden= hidden when phone verson*/}
            <div className='hidden fixed md:flex space-x-4 text-black'>
            <Link to="/home" className="hover:text-green-500">
            {text[multiLang].home}
            </Link>
            {isSignin ? (
           <>
           <Link to="/userdata" className="hover:text-green-500">{text[multiLang].userData}</Link>
           <Link to="/shootinginfo" className="hover:text-green-500">Shooting Info</Link> 
           <button onClick={handleSignout} className="hover:text-red-500">{text[multiLang].signOut}</button>
           </>
        ) : (
           <>
        <Link to="/signIn" className="hover:text-green-500">{text[multiLang].signin}</Link>
        <Link to="/signUp" className="hover:text-green-500">{text[multiLang].register}</Link>
          </>
        )}
            </div>
            {/* Hamburger for Mobile */}
            <button
            className='md:hidden text-black focus:outline-none ml-2'
            onClick={toggleBur}
            >
                {!isOpen ? (
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8" fill="none"
                    viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="3" d="M4 6h16M4 6h16M4 12h16M4 18h16 "
                        />
                    </svg>
                ):(
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d='M6 18L18 6M6 6l12 12'
                    />
                </svg>
                )}
            </button>
        </div>
          {/* Mobile Menu */}
          <div 
            className={`md:hidden fixed top-0 px-10 left-50 w-full h-full transition-transform transform ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
            } bg-white text-black z-50 flex flex-col items-center space-y-8 pt-16`}
            >
            <button 
            className="text-black focus:outline-none"
            onClick={() => {
                handleSignout();
                toggleBur(); 
              }}
            >
                <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                >
                <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
                />
                </svg>
            </button>            
                {isSignin?(
                    <>
                       <a href="#logout" className="hover:text-green-500">{text[multiLang].signOut}</a>
                    </>
                ):(
                    <>
                            <Link to="/home" className="hover:text-green-500">{text[multiLang].home}</Link>
                            <Link to="/signIn" className="hover:text-green-500">{text[multiLang].signin}</Link>
                            <Link to="/signUp" className="hover:text-green-500">{text[multiLang].register}</Link>
                            <Link to="/userdata" className="hover:text-green-500">{text[multiLang].userData}</Link>
                            <Link to="/shootinginfo" className="hover:text-green-500">{text[multiLang].ShootingInfo}</Link>
                    </>
                )}
                
          </div>
    </nav>
  );
}

export default NavBar;
