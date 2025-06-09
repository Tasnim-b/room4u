import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/modifierProfil.css';
import NavbarDash from '../components/NavbarDash';

const ModifierProfil = () => {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    sexe: '',
    date_de_naissance: '',
    email: '',
    role: '',
    avatar: null,
    password: '',
  });
  const [preview, setPreview] = useState('https://via.placeholder.com/150');
  const navigate = useNavigate();

useEffect(() => {
  const fetchUserData = async () => {
    try {
      const response = await fetch('http://localhost:8000/me/', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });
      if (!response.ok) throw new Error('Erreur utilisateur non trouvé');
      const userData = await response.json();
      setFormData({
        ...userData,
        avatar: null, // Pour permettre le changement via file input
        password: '',
      });
      setPreview(`${import.meta.env.VITE_BACKEND_URL}/photos_chercheurs/${userData.avatar?.split('/').pop()}`);
    } catch (error) {
      console.error('Erreur de récupération des données utilisateur', error);
    }
  };

  fetchUserData();
}, []);


  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'avatar') {
      const file = files[0];
      setPreview(URL.createObjectURL(file));
      setFormData({ ...formData, [name]: file });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Créer FormData pour gérer le fichier image
      const formDataToSend = new FormData();

      for (const key in formData) {
        if (key === 'avatar') {
          if (formData.avatar instanceof File) {
            formDataToSend.append('avatar', formData.avatar);
          }
        } else {
          formDataToSend.append(key, formData[key]);
        }
      }

    try {
      const response = await fetch('http://localhost:8000/update/', {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
        body: formDataToSend,
      });

      if (response.ok) {
        navigate('/ModifierProfil');
      } else {
        console.error('Erreur lors de la mise à jour');
      }
    } catch (error) {
      console.error('Erreur réseau', error);
    }
  };

  return (
    <div className="modifier-profil-container">
    <NavbarDash/>
      <div className="profil-form-wrapper">
        <h2>Modifier le profil</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group photo-upload">
            <label htmlFor="avatar">
              <img 
                src={preview} 
                alt="Preview" 
                className="profile-preview"
              />
              <span className="upload-text">Changer la photo</span>
            </label>
            <input
              type="file"
              id="avatar"
              name="avatar"
              onChange={handleChange}
              accept="image/*"
              hidden
            />
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label>Nom</label>
              <input
                type="text"
                name="nom"
                value={formData.nom}
                onChange={handleChange}
                className="modern-input"
                required
              />
            </div>

            <div className="form-group">
              <label>Prénom</label>
              <input
                type="text"
                name="prenom"
                value={formData.prenom}
                onChange={handleChange}
                className="modern-input"
                required
              />
            </div>
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label>Sexe</label>
              <select
                name="sexe"
                value={formData.sexe}
                onChange={handleChange}
                className="modern-input"
                required
              >
                <option value="H">Homme</option>
                <option value="F">Femme</option>
              </select>
            </div>

            <div className="form-group">
              <label>Date de naissance</label>
              <input
                type="date"
                name="date_de_naissance"
                value={formData.date_de_naissance}
                onChange={handleChange}
                className="modern-input"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="modern-input"
              required
            />
          </div>

          <div className="form-group">
            <label>Rôle</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="modern-input"
              required
            >
              <option value="chercheur">Chercheur</option>
              <option value="propriétaire">Propriétaire</option>
            </select>
          </div>

          <div className="form-group">
            <label>Nouveau mot de passe</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="modern-input"
              placeholder="••••••••"
            />
          </div>

          <div className="form-actions">
            <button 
              type="button" 
              className="cancel-btn"
              onClick={() => navigate('/profil')}
            >
              Annuler
            </button>
            <button type="submit" className="save-btn">
              Enregistrer les modifications
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModifierProfil;