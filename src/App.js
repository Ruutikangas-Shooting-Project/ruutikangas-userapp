import Header from './components/header';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/navbar';
import { useState } from 'react';
import { LanguageProvider } from './context/languageContext';
import Footer from './components/footer';
import Home from './views/home';
import Signin from './views/signin';
import SignUp from './views/signup';

function App() {
  return (
    <LanguageProvider>
      <Router>
        <div className="App">
          <NavBar />
          <Header />
          <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<SignUp />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;
          {/* <Header /> 
          <NavBar onLanguageChange={handleLanguageChange} language={language}/>
          <Header language={language} />
          */}
            /* const [language, setLanguage] = useState('FI'); */
  
/*   const handleLanguageChange = (mutilang) => {
    setLanguage(mutilang);
  }; */
