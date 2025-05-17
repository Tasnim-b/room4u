import React, { useState } from 'react';
import { 
  FaHome, 
  FaMapMarkerAlt, 
  FaDoorOpen, 
  FaRulerCombined,
  FaWifi, 
  FaCar, 
  FaSnowflake,
  FaTree,
  FaWarehouse,
  FaTshirt,
  FaWheelchair,
  FaCalendarAlt,
  FaCoins,
  FaCouch,
  FaCamera,
  FaCheckCircle,
  FaArrowUp
} from 'react-icons/fa';
import { GiBathtub } from 'react-icons/gi';
import { MdPets, MdSmokeFree } from 'react-icons/md';
import '../styles/FormulaireProprietaire.css';

const FormulaireProprietaire = () => {
  const [formData, setFormData] = useState({
    adresse: '',
    typeLogement: '',
    nbPieces: '',
    superficie: '',
    commodites: {},
    regles: {},
    disponibilite: '',
    loyer: '',
    caution: '',
    meuble: false,
    photos: []
  });

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
    const photos = files.map(file => URL.createObjectURL(file));
    setFormData(prev => ({ ...prev, photos }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h2 className="form-title">Proposez votre logement dès maintenant</h2>

      {/* Adresse */}
      <div className="form-section">
        <label className="form-label">
          <FaMapMarkerAlt className="input-icon" /> Adresse exacte
        </label>        
        <input
          type="text"
          name="adresse"
          value={formData.adresse}
          onChange={handleChange}
          className="form-input"
          required
        />
      </div>

      {/* Type / Pièces / Superficie */}
      <div className="form-section">
        <div className="grid-3">
          <div>
           <label className="form-label">
              <FaHome className="input-icon" /> Type de logement
            </label>
            <select
              name="typeLogement"
              value={formData.typeLogement}
              onChange={handleChange}
              className="form-input"
              required
            >
              <option value="">Sélectionner</option>
              {Object.entries(typesLogement).map(([key, value]) => (
                <option key={key} value={key}>{value}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="form-label">
              <FaDoorOpen className="input-icon" /> Nombre de pièces
            </label>
            <input
              type="number"
              name="nbPieces"
              min="1"
              value={formData.nbPieces}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          <div>
            <label className="form-label">
              <FaRulerCombined className="input-icon" /> Superficie (m²)
            </label>
            <input
              type="number"
              name="superficie"
              min="1"
              value={formData.superficie}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
        </div>
      </div>

      {/* Commodités */}
      <div className="form-section">
        <h3 className="form-label">
          <FaCheckCircle className="input-icon" /> Équipements et services
        </h3>       
         <div className="checkbox-group">
          {Object.entries(commodites).map(([key, value]) => (
            <label key={key} className="checkbox-item">
              <input
                type="checkbox"
                checked={formData.commodites[key] || false}
                onChange={() => handleCheckboxChange('commodites', key)}
                className="checkbox-input"
              />
              {key === 'wifi' && <FaWifi className="checkbox-icon" />}
              {key === 'parking' && <FaCar className="checkbox-icon" />}
              {key === 'climatisation' && <FaSnowflake className="checkbox-icon" />}
              {key === 'ascenseur' && <FaArrowUp className="checkbox-icon" />}
              {key === 'jardin' && <FaTree className="checkbox-icon" />}
              {key === 'garage' && <FaWarehouse className="checkbox-icon" />}
              {key === 'machine_a_laver' && <GiBathtub className="checkbox-icon" />}
              {key === 'accessibilite_handicape' && <FaWheelchair className="checkbox-icon" />}
              {key === 'balcon' && <FaTshirt className="checkbox-icon" />}
              <span>{value}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Règles */}
      <div className="form-section">
        <h3 className="form-label">
          <MdSmokeFree className="input-icon" /> Règles de vie
        </h3>        <div className="checkbox-group">
          {Object.entries(regles).map(([key, value]) => (
            <label key={key} className="checkbox-item">
              <input
                type="checkbox"
                checked={formData.regles[key] || false}
                onChange={() => handleCheckboxChange('regles', key)}
                className="checkbox-input"
              />
              {key.includes('animaux') && <MdPets className="checkbox-icon" />}
              {key.includes('fumeur') && <MdSmokeFree className="checkbox-icon" />}
              <span>{value}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Disponibilité / Loyer / Caution */}
      <div className="form-section">
        <div className="grid-3">
          <div>
            <label className="form-label">
              <FaCalendarAlt className="input-icon" /> Date de disponibilité
            </label>            <input
              type="date"
              name="disponibilite"
              value={formData.disponibilite}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

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

      {/* Meublé */}
      <div className="form-section">
        <label className="form-label">
          <FaCouch className="input-icon" /> Logement meublé
        </label>
          <div className="radio-group">
            <label className="radio-item">
              <input
                type="checkbox"
                name="meuble"
                value="true"
                checked={formData.meuble === true}
                onChange={() => setFormData({ ...formData, meuble: true })}
                className="radio-input"
              />
              Oui
            </label>
            <label className="radio-item">
              <input
                type="checkbox"
                name="meuble"
                value="false"
                checked={formData.meuble === false}
                onChange={() => setFormData({ ...formData, meuble: false })}
                className="radio-input"
              />
              Non
            </label>
          </div>
        </div>


      {/* Photos */}
      <div className="form-section">
        <label className="form-label">
          <FaCamera className="input-icon" /> Photos du logement
        </label>
        <input
          type="file"
          multiple
          onChange={handlePhotoUpload}
          className="form-input"
          accept="image/*"
          required
        />
        <div className="photo-preview">
          {formData.photos.map((photo, index) => (
            <img
              key={index}
              src={photo}
              alt={`Preview ${index}`}
              className="photo-thumb"
            />
          ))}
        </div>
      </div>

      <button type="submit" className="submit-button">
        <FaCheckCircle className="button-icon" /> Inscrivez-vous en publiant votre annonce
      </button>
    </form>
  );
};

export default FormulaireProprietaire;
