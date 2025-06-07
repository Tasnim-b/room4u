import React from 'react';
import NavbarColoc from '../components/NavbarColoc';
import Sidebar from '../components/Sidebar';
import '../styles/dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <NavbarColoc />
      
      <div className="dashboard-content">
        <Sidebar />
        
        <main className="main-content">
          {/* Votre contenu principal ici */}
          <h1>Bienvenue sur votre Tableau de Bord</h1>
          <div className="content-grid">
            {/* Ajoutez vos cartes/statistiques ici */}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;