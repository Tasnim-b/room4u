import './App.css';
import React ,{ useState }from 'react';
import Navbar from '../src/components/navbar'
import { BrowserRouter as Router} from 'react-router-dom';
import PopupManager from './components/PopupManager';
import AppRoutes from './routes/AppRoutes';
function App() {
  
    // const [showSignupPopup, setShowSignupPopup] = useState(false);
    const [showRegisterPopup, setShowRegisterPopup] = useState(false);   
    const [showLoginPopup, setShowLogin] = useState(false); 

  return (
    <Router>
      <Navbar 
        onSignupClick={() => setShowRegisterPopup(true)} 
        onLoginClick={() => setShowLogin(true)} 
      />

      <PopupManager
        showLoginPopup={showLoginPopup}
        setShowLogin={setShowLogin}
        // showSignupPopup={showSignupPopup}
        // setShowSignupPopup={setShowSignupPopup}
        showRegisterPopup={showRegisterPopup}
        setShowRegisterPopup={setShowRegisterPopup}
      />

      <AppRoutes/>
    </Router>
  );
   


}

export default App;
