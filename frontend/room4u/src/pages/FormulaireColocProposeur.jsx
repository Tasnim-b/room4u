import React, { useState } from 'react';
import {
  FaHome, FaMapMarkerAlt, 
  FaCalendarAlt,
  FaCoins,  FaCamera, FaCheckCircle,  FaTimes
} from 'react-icons/fa';

import '../styles/FormulaireProprietaire.css'; 
import NavbarColoc from '../components/NavbarColoc'; 

const FormulaireColocProposeur = () => {
  const [formData, setFormData] = useState({
    gouvernorat: '',
    delegation: '',
    phone: '',
    description: '',
    typeLogement: '',
    nbPieces: '',
    superficie: '',
    photos: [],
    loyer: '',
    caution: '',
    date_de_disponibilite: '',
    commodites: {},
    regles: {}
  });

  const gouvernorats = ['Ariana', 'Béja', 'Ben Arous', 'Bizerte', 'Gabès', 'Gafsa', 'Jendouba', 'Kairouan', 'Kasserine', 'Kébili', 'Kef', 'Mahdia', 'Manouba', 'Médenine', 'Monastir', 'Nabeul', 'Sfax', 'Sidi Bouzid', 'Siliana', 'Sousse', 'Tataouine', 'Tozeur', 'Tunis', 'Zaghouan'];

  const typesLogement = {
    studio: 'Studio',
    appartement: 'Appartement',
    coliving: 'Coliving',
    chambre: 'Chambre individuelle',
    etage_villa: 'Etage de villa',
    residence: 'Résidence'
  };

  const commodites = {
    wifi: 'Wifi',
    parking: 'Parking',
    climatisation: 'Climatisation',
    ascenseur: 'Ascenseur',
    jardin: 'Jardin',
    garage: 'Garage',
    machine_a_laver: 'Machine à laver',
    accessibilite_handicape: 'Accessibilité handicapé',
    balcon: 'Balcon'
  };

  const regles = {
    fille_uniquement: 'Fille uniquement',
    garcon_uniquement: 'Garçon uniquement',
    fumeur_accepte: 'Fumeur accepté',
    non_fumeur_accepte: 'Non fumeur accepté',
    animaux_acceptes: 'Animaux acceptés',
    animaux_non_acceptes: 'Animaux non acceptés'
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleCheckboxChange = (category, key) => {
    setFormData(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: !prev[category][key]
      }
    }));
  };

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    const newPhotos = files.map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }));
    
    setFormData(prev => ({
      ...prev,
      photos: [...prev.photos, ...newPhotos]
    }));
  };

  const removePhoto = (index) => {
    const updatedPhotos = [...formData.photos];
    URL.revokeObjectURL(updatedPhotos[index].preview); // Clean up memory
    updatedPhotos.splice(index, 1);
    
    setFormData(prev => ({
      ...prev,
      photos: updatedPhotos
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('access_token');
      if (!token) {
        alert("Utilisateur non authentifié.");
        return;
      }

      const form = new FormData();
      form.append("gouvernorat", formData.gouvernorat);
      form.append("delegation", formData.delegation);
      form.append("phone", formData.phone);
      form.append("description", formData.description);
      form.append("loyer", formData.loyer);
      form.append("caution", formData.caution);
      form.append("date_de_disponibilite", formData.date_de_disponibilite);
      
      // Append each photo
      formData.photos.forEach((photo, index) => {
  form.append('photo_de_chambre', photo.file);
});

      const response = await fetch("http://localhost:8000/coloc-proposeur-annonces/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: form
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Backend error details:", errorData);
        throw new Error(`Erreur serveur: ${JSON.stringify(errorData)}`);
      }

      const result = await response.json();
      alert("Annonce publiée avec succès !");
      console.log(result);

    } catch (error) {
      console.error("Erreur complète:", error);
      alert(`Échec de l'envoi: ${error.message}`);
    }
  };

  return (
   <div>
    <NavbarColoc />
    <form onSubmit={handleSubmit} className="form-container">
      <h2 className="form-title">Proposez votre logement en colocation</h2>

      {/* Gouvernorat et Délégation */}
      <div className="form-section">
        <div className="grid-2">
          <div>
            <label className="form-label">
              <FaMapMarkerAlt className="input-icon" /> Gouvernorat
            </label>
            <select
              name="gouvernorat"
              value={formData.gouvernorat}
              onChange={handleChange}
              className="form-input"
              required
            >
              <option value="">Sélectionner</option>
              {gouvernorats.map(gouv => (
                <option key={gouv} value={gouv}>{gouv}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="form-label">
              <FaMapMarkerAlt className="input-icon" /> Délégation
            </label>
            <input
              type="text"
              name="delegation"
              value={formData.delegation}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
        </div>
      </div>

      {/* Téléphone */}
      <div className="form-section">
        <label className="form-label">
          <FaMapMarkerAlt className="input-icon" /> Numéro de téléphone
        </label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="form-input"
          required
        />
      </div>

      {/* Description */}
      <div className="form-section">
        <label className="form-label">
          <FaHome className="input-icon" /> Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="form-input"
          rows="4"
        />
      </div>

      {/* Loyer et Caution */}
      <div className="form-section">
        <div className="grid-2">
          <div>
            <label className="form-label">
              <FaCoins className="input-icon" /> Loyer mensuel (DT)
            </label>
            <input
              type="number"
              name="loyer"
              min="0"
              value={formData.loyer}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          <div>
            <label className="form-label">
              <FaCoins className="input-icon" /> Caution (DT)
            </label>
            <input
              type="number"
              name="caution"
              min="0"
              value={formData.caution}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
        </div>
      </div>

      {/* Date de disponibilité */}
      <div className="form-section">
        <label className="form-label">
          <FaCalendarAlt className="input-icon" /> Date de disponibilité
        </label>
        <input
          type="date"
          name="date_de_disponibilite"
          value={formData.date_de_disponibilite}
          onChange={handleChange}
          className="form-input"
          required
        />
      </div>

      {/* Photos */}
      <div className="form-section">
        <label className="form-label">
          <FaCamera className="input-icon" /> Photos du logement
        </label>
        <input
          type="file"
          onChange={handlePhotoUpload}
          className="form-input"
          accept="image/*"
          multiple
          required={formData.photos.length === 0}
        />
        
        <div className="photos-preview-container">
          {formData.photos.map((photo, index) => (
            <div key={index} className="photo-preview-item">
              <img 
                src={photo.preview} 
                alt={`Preview ${index}`} 
                className="photo-thumb" 
              />
              <button 
                type="button" 
                className="remove-photo-btn"
                onClick={() => removePhoto(index)}
              >
                <FaTimes />
              </button>
            </div>
          ))}
        </div>
      </div>

      <button type="submit" className="submit-button">
        <FaCheckCircle className="button-icon" /> Publier l'annonce
      </button>
    </form>
    </div>
  );
};

export default FormulaireColocProposeur;