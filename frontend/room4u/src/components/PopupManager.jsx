import React from 'react';
import Login from '../pages/Login';
import Register from '../pages/Register';

const PopupManager = ({
  showLoginPopup,
  setShowLogin,
  showRegisterPopup,
  setShowRegisterPopup,
}) => {
  return (
    <>
      {showLoginPopup && (
        <div className="popup-overlay" onClick={() => setShowLogin(false)}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setShowLogin(false)}>X</button>
            <Login
              onClose={() => setShowLogin(false)}
              onSignupClick={() => {
                setShowLogin(false);
                setShowRegisterPopup(true);
              }}
            />
          </div>
        </div>
      )}

      {showRegisterPopup && (
        <div className="popup-overlay" onClick={() => setShowRegisterPopup(false)}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setShowRegisterPopup(false)}>X</button>
            <Register onClose={() => setShowRegisterPopup(false)} />
          </div>
        </div>
      )}
    </>
  );
};

export default PopupManager;
