import React, { useState } from 'react';
import { FaRegCommentDots, FaRegHeart, FaRegBell, FaPlus, FaFire } from 'react-icons/fa';
import '../styles/navbardash.css';
import logo from '../assets/logo.png';
import { Link, useNavigate } from 'react-router-dom';





const NavbarDash = ({onClose}) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();
  const handleLogout = async () => {
  const refreshToken = localStorage.getItem('refresh_token');

  try {
    const response = await fetch('http://localhost:8000/logout/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
      body: JSON.stringify({ refresh: refreshToken }),
    });

    if (response.status === 205) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      navigate('/');
    } else {
      alert('Erreur lors de la déconnexion.');
    }
  } catch (error) {
    console.error('Erreur réseau lors de la déconnexion', error);
    alert('Erreur de déconnexion');
  }
};


  

  return (
    <nav className="navbar-dash">
      <div className="nav-left">
        <img 
          src={logo} 
          alt="Application Logo" 
          className="logo" 
        />
      </div>

      <div className="nav-right">
        <div className="nav-icons">
          <Link to="/SignupPopup" className="icon-btn add-btn" >
            <FaPlus />
          </Link>
          <Link to="/FormulaireTestCompatibilite" className="icon-btn match-btn">
            <FaFire />
            <span>Match</span>
          </Link>
          <Link to="/messagerie" className="nav-icon-link">
            <FaRegCommentDots className="nav-icon" />
          </Link>
          <Link to="/Favoris">
            <FaRegHeart className="nav-icon" />
          </Link>
          <Link to="/Notification">
            <FaRegBell className="nav-icon" />
          </Link>
          
        </div>

        <div className="profile-section" onClick={() => setIsProfileOpen(!isProfileOpen)}>
          <img 
            src="https://via.placeholder.com/40" 
            alt="Profile" 
            className="profile-pic" 
          />
          
          {isProfileOpen && (
            <div className="profile-dropdown">
              <Link to="/ModifierProfil" className="dropdown-item">Modifier profil</Link>
              <Link to="/MesAnnonces" className="dropdown-item">Mes annonces</Link>
              <div className="dropdown-item logout" onClick={handleLogout}>Se déconnecter</div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavbarDash;