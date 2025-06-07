import React from 'react';
import Login from '../pages/Login';
// import SignupPopup from './SignupPopup';
import Register from '../pages/Register';

const PopupManager = ({
  
  showLoginPopup,
  setShowLogin,
  // showSignupPopup,
  // setShowSignupPopup,
  showRegisterPopup,
  setShowRegisterPopup,
}) => {
  return (
    <>
      {showLoginPopup && (
        <Login
          onClose={() => setShowLogin(false)}
          onSignupClick={() => {
            setShowLogin(false);
            setShowRegisterPopup(true);
          }}
        />
      )}

      {/* {showSignupPopup && (
        <SignupPopup onClose={() => setShowSignupPopup(false)} />
      )} */}

      {showRegisterPopup && (
        <div className="popup-overlay" onClick={() => setShowRegisterPopup(false)}>
          <div className="popup-content" onClick={e => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setShowRegisterPopup(false)}>X</button>
            <Register  onClose={() => setShowRegisterPopup(false)} />
          </div>
        </div>
      )}

    </>
  );
};

export default PopupManager;
