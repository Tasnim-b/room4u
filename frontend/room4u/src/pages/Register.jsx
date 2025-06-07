import React, { useState } from 'react';
import '../styles/register.css';

const Register = ({ onClose }) => {
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
const handleSubmit = async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);

  try {
    const response = await fetch("http://localhost:8000/register/", {
      method: 'POST',
      body: formData
    });

    if (response.ok) {
      const data = await response.json();  // récupérer la réponse JSON
      alert("Inscription réussie !");
      onClose(); // Ferme la modale

      // Redirection selon la réponse du backend
      if (data.redirect_url) {
        window.location.href = data.redirect_url;
      } else {
        window.location.href = '/'; // redirection par défaut
      }
    } else {
      const errorData = await response.json();
      console.error("Erreur d'inscription :", errorData);
      alert("Erreur lors de l'inscription !");
    }
  } catch (error) {
    console.error("Erreur réseau :", error);
    alert("Erreur réseau !");
  }
};



  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          &times;
        </button>

        <h2>Créer un compte</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="form-grid">
            <div className="input-group">
              <label>Prénom</label>
              <input type="text" name='prenom' required />
            </div>

            <div className="input-group">
              <label>Nom</label>
              <input type="text" name='nom' required />
            </div>
          </div>

          <div className="input-group">
            <label>Email</label>
            <input type="email" name='email' required />
          </div>

          <div className="input-group">
            <label>Date de naissance</label>
            <input type="date" name='date_de_naissance' required />
          </div>

          <div className="input-group">
            <label>Sexe</label>
            <select name='sexe' required>
              <option value="">Sélectionner</option>
              <option value="Homme">Homme</option>
              <option value="Femme">Femme</option>
            </select>
          </div>

          <div className="input-group">
            <label>Mot de passe</label>
            <input type="password" name="password" required />
          </div>

          <div className="input-group">
            <label>Rôle</label>
            <select name='role' required>
              <option value="">Sélectionner</option>
              <option value="proprietaire">Propriétaire</option>
              <option value="chercheur">Colocataire</option>
            </select>
          </div>

          <div className="input-group">
            <label>Photo de profil</label>
            <div className="file-upload">
              <input 
                name='avatar'
                type="file" 
                onChange={handleFileChange} 
                accept="image/*"
                id="photo-upload"
              />
              <label htmlFor="photo-upload">
                {preview ? (
                  <img src={preview} alt="Preview" className="preview-image" />
                ) : (
                  <span>Choisir une photo</span>
                )}
              </label>
            </div>
          </div>

          <button type="submit" className="submit-button">
            S'inscrire
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
