import React,{ useState }  from 'react';
import headerImage from '../images/header-bg-800x350.jpg'; 

const Header = () => {
      // State for toggling the mobile menu
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header 
    style={{ backgroundImage: `url(${headerImage})` }}
    className="bg-cover bg-center bg-white text-white p-6 h-[280px] md:h-[380px] relative">
        <div className='container mx-auto flex  flex-col  justify-between items-center px-6'>
             {/* Left Section: Logo and Title */}
             <div className='flex items-center'>
                <img src='/images/logo-light.png' alt="Shooting Center Logo" className="h-18 w-auto " />
                <h1 className='text-2xl font-bold md:text-4xl lg:text-5xl'>
                Ruutikankaan ampumaurheilukeskus</h1>
             </div>
             <p className='text-sm md:text-base  mt-4'>   {/* need to adjust position */}
                Ruutikankaan Ampumaurheilukeskuksessa on yli 300 ampumapaikkaa 35 radalla</p>
             {/* Right side: Language & Auth Links (Always Visible) */}
             <div className='absolute top-6 right-6 flex items-center space-x-4'>
                 {/* Language Switch */}
                <div className='flex space-x-2'>
                    <a href='#FI' className='text-white hover:text-green-500'>FI</a>
                    <span className="text-white">|</span>
                    <a href='#EN' className='text-white hover:text-green-500'>EN</a>
                </div>
                 {/* Sign In / Sign Up Buttons (Always Visible) */}
                 <a href='#signin' className='text-white  hover:text-green-500'>Sign in</a>
                 <a href='#signup' className='text-white  hover:text-green-500 py-2 px-4 rounded'>Sign up</a>
                           {/* Hamburger Icon (Visible on mobile) */}
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
             </div>           
        </div>
           {/* mobile view */}
   
        

        </header>
  );
}

export default Header;
