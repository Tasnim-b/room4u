import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import FormulaireProprietaire from '../pages/FormulaireProprietaire';
import FormulaireColocataire from '../pages/FormulaireColocataire';
import FAQ from '../pages/FAQ';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/connexion" element={<Login />} />
      <Route path="/FormulaireProprietaire" element={<FormulaireProprietaire />} />
      <Route path="/FormulaireColocataire" element={<FormulaireColocataire />} />
      <Route path="/FAQ" element={<FAQ/>} />


    </Routes>
  );
};

export default AppRoutes;
