import React,{ useState, useEffect, useContext }  from 'react';
import { LanguageContext } from '../context/languageContext';



const Footer = () => {
  const { multiLang, ChangeLanguage } = useContext(LanguageContext);
  //give laguage, other views need to notice this
  const text = {
    FI: {
        contactInfo: "Yhteystiedot",
        siteMap: "Sivukartta",
        contactDetail: {
            name: "Timo Haataja",
            jobTitle: "CEO",
            phone: "040 551 0029",
            email: "timo.haataja@ruutikangas.fi",
        },
        siteLinks: [
            { label: "Etusivu", href: "https://ruutikangas.fi/" },
            { label: "Tietoa Ruutikankaasta", href: "https://ruutikangas.fi/tietoa-ruutikankaasta/" },
            { label: "Ajankohtaista", href: "https://ruutikangas.fi/kategoria/ajankohtaista/"},
            { label:  "Ota yhteyttä", href: "https://ruutikangas.fi/yhteystiedot/" },
            { label:  "Ostoskori", href: "https://ruutikangas.fi/ostoskori/" },
            { label:  "Tietosuojaseloste", href: "https://ruutikangas.fi/tietosuojaseloste/" },
        ],
    },
    EN: {
        contactInfo: "Contact Information",
        siteMap: "Site Map",
        contactDetail: {
            name: "Timo Haataja",
            jobTitle: "CEO",
            phone: "040 551 0029",
            email: "timo.haataja@ruutikangas.fi",
          },
          siteLinks: [
            { label: "Home", href: "https://ruutikangas.fi/" },
            { label: "About Ruutikangas", href: "https://ruutikangas.fi/tietoa-ruutikankaasta/" },
            { label: "News", href: "https://ruutikangas.fi/kategoria/ajankohtaista/"},
            { label:  "Contact", href: "https://ruutikangas.fi/yhteystiedot/" },
            { label:  "Shopping Cart", href: "https://ruutikangas.fi/ostoskori/" },
            { label:  "Privacy Policy", href: "https://ruutikangas.fi/tietosuojaseloste/" },
        ],
    },
    };
    //to give language, other views need to notice this
    const content = text[multiLang];

  return (
    <footer className="bg-black text-white py-8 max-w-screen-sm mx-auto">
         
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-start">
             {/* Contact Section */}

             <div className='w-full md:w-1/2 mb-4 md:mb-0'>
                 {/*<img src='/images/logo-light.png' alt="Shooting Center Logo" className="h-18 w-auto " />*/}
                <h4 className='text-lg font-bold mb-4'>
                {content.siteMap}</h4>
               <ul>
               {content.siteLinks.map((link, index) => (
                <li key={index}>
                    <a href={link.href} className='hover:text-green-500'>
                    {link.label}
                    </a>
                    
                </li>))}
               </ul>
             </div>
           
             {/* Right side: Language & Auth Links (Always Visible) */}
             <div className='w-full md:w-1/2'>
                 {/*<img src='/images/logo-light.png' alt="Shooting Center Logo" className="h-18 w-auto " />*/}
                <h4 className='text-lg font-bold mb-4'>
                {content.contactInfo}</h4>
               <p>{content.contactDetail.name}</p>
               <p>{content.contactDetail.jobTitle}</p>
               <p>{content.contactDetail.phone}</p>
               <p>{content.contactDetail.email}</p>
             </div>
        </div>
           {/* mobile view */}

 
        
        </footer>
  );
}

export default Footer;

{
    /**
     *     <footer
    className="bg-black text-white py-8">
     */
    /*
    const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
});
const handlemessage = (e) => {
    setFormData({
        ...formData,
        [e.target.name]: e.target.value
    });
};
const handleSubmit = (e) => {
    e.preventDefault();
    //check function to send email (e.g., via EmailJS or a backend endpoint)
    console.log('Form submitted',formData);
    setFormData({
        name: '',
        email: '',
        message: ''
    });
};
*/
}
