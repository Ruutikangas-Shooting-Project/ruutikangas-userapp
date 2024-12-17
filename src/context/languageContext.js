import React, { useState, createContext } from "react";

// Create LanguageContext
export const LanguageContext = createContext();

// Create a LanguageProvider component
export const LanguageProvider = ({ children }) => {
  // Default language set to FI (Finnish)
  const [multiLang, setMultiLang] = useState('FI');

  // Function to change the language
  const ChangeLanguage = (lang) => {
    setMultiLang(lang);
  };

  // Return the context provider
  return (
    <LanguageContext.Provider value={{ multiLang, ChangeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
