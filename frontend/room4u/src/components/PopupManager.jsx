import React from 'react';
import Login from '../pages/Login';
import SignupPopup from './SignupPopup';

const PopupManager = ({
  showLoginPopup,
  setShowLogin,
  showSignupPopup,
  setShowSignupPopup,
}) => {
  return (
    <>
      {/* Affichage de la popup de login */}
      {showLoginPopup && (
        <Login
          onClose={() => setShowLogin(false)}
          onSignupClick={() => {
            setShowLogin(false);
            setShowSignupPopup(true);
          }}
        />
      )}

      {/* Affichage de la popup de signup */}
      {showSignupPopup && (
        <SignupPopup onClose={() => setShowSignupPopup(false)} />
      )}
    </>
  );
};

export default PopupManager;
