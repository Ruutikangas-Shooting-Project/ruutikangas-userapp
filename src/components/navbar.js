import React,{ useEffect, useState, useContext }  from 'react';
import { LanguageContext } from '../context/languageContext';

const NavBar = () => {
      // State for toggling the mobile menu
    const [isOpen, setIsOpen] = useState(false);
    const [isSignin, setIsSignin] = useState(false);
    const { multiLang } = useContext(LanguageContext); 
    
    const toggleBur = () =>{
        setIsOpen(!isOpen);
        console.log(isOpen);
    }  
    //give laguage, other views need to notice this
    const text = {
        FI: {
            home: "Etusivu",
            signin: 'Kirjaudu',
            register: 'Rekisteröidy',
            signOut: 'Ulos',
            contact: 'Yhteystiedot',
        },
        EN: {
            home: "Home",
            signin: 'Sign in',
            register: 'Register',
            signOut: 'Sign out',
            contact: 'Contact us',
        }
        }  
    //setup login, token
    useEffect(()=>{
        const token = localStorage.getItem("token");
        if(token) {
            setIsSignin(true)
        }else{
            setIsSignin(false)
        }  
    }, []);

    const handleSignin=()=>{
        localStorage.setItem("token", "mockJWTtoken");
        setIsSignin(true);
    }  
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
                <a href="https://ruutikangas.fi/" className="hover:text-green-500"> {text[multiLang].home}</a>
                {isSignin?(
                    <>
                       <a href="#logout" className="hover:text-green-500">{text[multiLang].signOut}</a>
                    </>
                ):(
                    <>
                    <a href="#kirjaudu" className="hover:text-green-500">{text[multiLang].signin}</a>
                    <a href="#registeroidy" className="hover:text-green-500">{text[multiLang].register}</a>
                    </>
                )}
                <a href="#contact" className="hover:text-green-500">{text[multiLang].contact}</a>
            </div>
            {/* Hamburger for Mobile */}
            {/*onClick={()=>setIsOpen(!isOpen)*/}
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
          {/* Mobile Menu onClick={()=>setIsOpen(false)}
          */}
          <div 
            className={`md:hidden fixed top-0 px-10 left-50 w-full h-full transition-transform transform ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
            } bg-white text-black z-50 flex flex-col items-center space-y-8 pt-16`}
            >
            <button 
            className="text-black focus:outline-none"
            onClick={toggleBur}


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
                <a href="https://ruutikangas.fi/" className="hover:text-green-500">{text[multiLang].home}</a>
                {isSignin?(
                    <>
                       <a href="#logout" className="hover:text-green-500">{text[multiLang].signOut}</a>
                    </>
                ):(
                    <>
                       <a href="#kirjaudu" className="hover:text-green-500">{text[multiLang].signin}</a>
                       <a href="#registeroidy" className="hover:text-green-500">{text[multiLang].register}</a>
                    </>
                )}
                <a href="#contact" className="hover:text-green-500">{text[multiLang].contact}</a>
          </div>
    </nav>
  );
}

export default NavBar;
