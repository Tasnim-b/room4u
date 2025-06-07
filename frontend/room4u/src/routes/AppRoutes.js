import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import FormulaireProprietaire from '../pages/FormulaireProprietaire';
import FormulaireColocataire from '../pages/FormulaireColocataire';
import FAQ from '../pages/FAQ';
// import NavbarDash from '../components/NavbarDash';
// import Sidebar from '../components/Sidebar';
import Dashboard from '../pages/Dashboard';
import Messagerie from '../pages/Messagerie';
import Register from '../pages/Register';
import DashboardColoc from '../pages/DashboardColoc';
import FormulaireTestCompatibilite from '../pages/FormulaireTestCompatibilite';
import Favoris from '../pages/Favoris';
import Notification from '../pages/Notification';
import ModifierProfil from '../pages/ModifierProfil';
import SignupPopup from '../components/SignupPopup';


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/connexion" element={<Login />} />
      <Route path="/FormulaireProprietaire" element={<FormulaireProprietaire />} />
      <Route path="/FormulaireColocataire" element={<FormulaireColocataire />} />
      <Route path="/FAQ" element={<FAQ/>} />
      {/* <Route path="/NavbarDash" element={<NavbarDash/>} />
      <Route path="/Sidebar" element={<Sidebar/>} /> */}
      <Route path="/Dashboard" element={<Dashboard/>} />
      <Route path="/Messagerie" element={<Messagerie/>} />
      <Route path="/FormulaireTestCompatibilite" element={<FormulaireTestCompatibilite/>} />
      <Route path="/Register" element={<Register/>} />
      <Route path="/DashboardColoc" element={<DashboardColoc/>} />
      <Route path="/Favoris" element={<Favoris/>} />
      <Route path="/Notification" element={<Notification/>} />
      <Route path="/ModifierProfil" element={<ModifierProfil/>} />
      <Route path="/SignupPopup" element={<SignupPopup/>} />
      
      


    </Routes>
  );
};

export default AppRoutes;
