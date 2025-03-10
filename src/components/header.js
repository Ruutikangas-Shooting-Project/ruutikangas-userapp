import React,{ useState, useEffect, useContext }  from 'react';
import headerImage from '../images/header-bg-800x350.jpg'; 
import { LanguageContext } from '../context/languageContext';


const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const {multiLang, ChangeLanguage } = useContext(LanguageContext);
  
  const text = {
    FI: {
        title: "Ruutikankaan ampumaurheilukeskus",
        desc: "Ruutikankaan Ampumaurheilukeskuksessa on yli 300 ampumapaikkaa 35 radalla",
    },
    EN: {
      title: "Ruutikangas Shooting Sport Center",
      desc: "Ruutikangas Shooting Sport Center has over 300 shooting places on 35 tracks",
    },
    };

  return (
    
    <header 
    style={{ backgroundImage: `url(${headerImage})` }}

    className="bg-cover bg-center bg-white text-white p-4 h-[200px] md:h-[360px] w-full max-w-full xs:px-2 relative ">
   
        <div className='container mx-auto flex flex-col justify-between items-center w-full px-4'>
             {/* Left Section: Logo and Title */}
             <div className='flex items-center'>
                <h1 className='text-xl font-bold md:text-3xl lg:text-4xl w-full '>
                {text[multiLang].title}</h1>
             </div>
             <p className='text-xs md:text-sm md:mt-4 lg:text-lg'>   {/* need to adjust position */}
             {text[multiLang].desc}</p>
            
             <div className='absolute top-6 right-6 flex items-center space-x-4'>

                <div className='absolute top-6 right-6 flex space-x-2'>
                    <div className='flex space-x-2'>
                        <button
                            onClick={() => ChangeLanguage("FI")}
                            className='text-white hover:text-green-500'
                        >FI
                        </button>
                    </div>
                    <span className="text-white">|</span>
                    <button
                    onClick={()=>ChangeLanguage("EN")}
                            className='text-white hover:text-green-500'
                        >EN
                        </button>
                 
                </div>
                 {/* Sign In / Sign Up Buttons (Always Visible) */}
                 {/* try to put this at nav bar
                 <a href='#signin' className='text-white  hover:text-green-500'>Sign in</a>
                 <a href='#signup' className='text-white  hover:text-green-500 py-2 px-4 rounded'>Sign up</a>
                 */}
                           {/* Hamburger Icon (Visible on mobile) */}
          {/* command out for check                  
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
            ):(
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            )}

          </button>
          
          */}
             </div>           
        </div>

        </header>
  );
}

export default Header;

           {/* mobile view 
            cnacel
                       <div className={`fixed top-0 left-0 right-0 bg-gray-900 p-4 z-50 transition-transform ${isSticky ? 'translate-y-0' : '-translate-y-full'}`}>
           <img src='../images/logo-light.png'></img>
         </div>
            */}
