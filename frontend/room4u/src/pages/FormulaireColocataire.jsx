import React, { useState } from 'react';
import { 
    FaUser, 
    FaCalendarAlt, 
    FaVenusMars, 
    FaBriefcase, 
    FaHome, 
    FaMapMarkerAlt, 
    FaMoneyBillAlt, 
    FaPhone, 
    FaEnvelope, 
    FaCamera,
    FaInfoCircle
  } from 'react-icons/fa';
import '../styles/FormulaireChercheur.css';

const FormulaireColocataire = () => {
  const [formData, setFormData] = useState({
    photo: null,
    nom: '',
    prenom: '',
    dateNaissance: '',
    sexe: '',
    statut: '',
    ville: '',
    gouvernorat: '',
    localite: '',
    adresse: '',
    budgetMax: '',
    telephone: '',
    email: '',
    description: '',
    typeLogement: '',
  });

// Données complètes des gouvernorats et délégations
const gouvernorats = {
  'Ariana': ['Ariana Ville', 'Raoued', 'Kalaat Landalous', 'Sidi Thabet', 'Ettadhamen', 'Mnihla'],
  'Béja': ['Béja Nord', 'Béja Sud', 'Testour', 'Nefza', 'Amdoun', 'Goubellat'],
  'Ben Arous': ['Ben Arous', 'El Mourouj', 'Hammam Lif', 'Bou Mhel el-Bassatine', 'Ezzahra', 'Rades'],
  'Bizerte': ['Bizerte Nord', 'Bizerte Sud', 'Sejnane', 'Mateur', 'Tinja', 'Ghar El Melh'],
  // Ajouter tous les gouvernorats...
  'Tunis': [
    'Bab El Bhar', 'Bab Souika', 'Carthage', 'Cité El Khadra', 
    'El Kabaria', 'El Menzah', 'El Omrane', 'El Ouardia', 
    'Ettahrir', 'Ezzouhour', 'Hraïria', 'La Goulette', 
    'Le Bardo', 'Le Kram', 'Sidi El Béchir', 'Sidi Hassine'
  ],
  'Zaghouan': ['Zaghouan', 'Zriba', 'Bir Mcherga', 'Nadhour', 'Saouaf']
};

const typesLogement = {
  'studio': 'Studio',
  'appartement': 'Appartement',
  'coliving': 'Coliving',
  'chambre': 'Chambre individuelle',
  'etage_villa': 'Étage de villa',
  'residence': 'Résidence étudiante'
};

const statuts = {
  'etudiant': 'Étudiant(e)',
  'retraite': 'Retraité(e)',
  'salarie': 'Salarié(e)',
  'chomeur': 'Chômeur(e)',
  'professionnel': 'Professionnel(le)'
};

const handleChange = (e) => {
  const { name, value, files } = e.target;
  setFormData(prev => ({
    ...prev,
    [name]: files ? files[0] : value,
    // Réinitialiser les dépendances
    ...(name === 'gouvernorat' && { delegation: '' })
  }));
};

  return (
    <form className="form-container">
      <h2>
      <FaHome />Besoin d’un logement ? <br/>
      <span>Créez votre profil pour échanger gratuitement avec les propriétaires de logement</span> 
      </h2>

      <div className="form-section">
        <h3><FaUser /> Informations personnelles</h3>
        
        <div className="form-grid">
          <div className="form-group">
            <label><FaUser /> Nom</label>
            <input type="text" name="nom" onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label><FaUser /> Prénom</label>
            <input type="text" name="prenom" onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label><FaCalendarAlt /> Date de naissance</label>
            <input type="date" name="dateNaissance" onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label><FaVenusMars /> Sexe</label>
            <select name="sexe" onChange={handleChange} required>
              <option value="">-- Sélectionnez --</option>
              <option value="homme">Homme</option>
              <option value="femme">Femme</option>
            </select>
          </div>

          <div className="form-group">
            <label><FaBriefcase /> Statut social</label>
            <select name="statut" onChange={handleChange} required>
              <option value="">-- Sélectionnez --</option>
              {Object.entries(statuts).map(([key, value]) => (
                <option key={key} value={key}>{value}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="form-section">
        <h3><FaMapMarkerAlt /> Localisation</h3>
        
        <div className="form-grid">
          <div className="form-group">
            <label><FaMapMarkerAlt /> Gouvernorat</label>
            <select name="gouvernorat" onChange={handleChange} required>
              <option value="">-- Choisir un gouvernorat --</option>
              {Object.keys(gouvernorats).map(g => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label><FaMapMarkerAlt /> Délégation</label>
            <select name="delegation" onChange={handleChange} required>
              <option value="">-- Choisir une délégation --</option>
              {(gouvernorats[formData.gouvernorat] || []).map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label><FaHome /> Type de logement</label>
            <select name="typeLogement" onChange={handleChange} required>
              <option value="">-- Choisir un type --</option>
              {Object.entries(typesLogement).map(([key, value]) => (
                <option key={key} value={key}>{value}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label><FaMoneyBillAlt /> Budget max (TND)</label>
            <input type="number" name="budgetMax" onChange={handleChange} required />
          </div>
        </div>
      </div>

      <div className="form-section">
        <h3><FaInfoCircle /> Contact et détails</h3>
        
        <div className="form-grid">
          <div className="form-group">
            <label><FaPhone /> Téléphone</label>
            <input type="tel" name="telephone" onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label><FaEnvelope /> Email</label>
            <input type="email" name="email" onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label><FaCamera /> Photo de profil</label>
            <input type="file" name="photo" accept="image/*" onChange={handleChange} required />
          </div>

          <div className="form-group full-width">
            <label><FaInfoCircle /> Description</label>
            <textarea name="description" onChange={handleChange} required></textarea>
          </div>
        </div>
      </div>

      <button type="submit" className="submit-btn">S'inscrire</button>
    </form>
  );
};

export default FormulaireColocataire;
