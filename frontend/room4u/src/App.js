import './App.css';
import React ,{ useState }from 'react';
import Navbar from '../src/components/navbar'
import { BrowserRouter as Router} from 'react-router-dom';
import PopupManager from './components/PopupManager';
import AppRoutes from './routes/AppRoutes';
function App() {
  
    const [showSignupPopup, setShowSignupPopup] = useState(false);
    const [showLoginPopup, setShowLogin] = useState(false); 

  return (
    <Router>
      <Navbar onSignupClick={() => setShowSignupPopup(true)} 
              onLoginClick={() => setShowLogin(true)}
      /> 

    <PopupManager
        showLoginPopup={showLoginPopup}
        setShowLogin={setShowLogin}
        showSignupPopup={showSignupPopup}
        setShowSignupPopup={setShowSignupPopup}
      />

      <AppRoutes/>
    </Router>
  );
   


}

export default App;
