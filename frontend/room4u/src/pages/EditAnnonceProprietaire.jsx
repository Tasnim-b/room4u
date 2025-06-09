import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/FormulaireProprietaire.css';

const EditAnnonceProprietaire = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);
  const [previews, setPreviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Charger les données de l'annonce existante
    const fetchAnnonce = async () => {
      try {
        const token = localStorage.getItem('access_token');
        const res = await fetch(`http://localhost:8000/annonces-proprietaire/${id}/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error('Erreur lors du chargement');
        const data = await res.json();
        setFormData(data);
        if (data.photo_de_maison) setPreviews([`http://localhost:8000${data.photo_de_maison}`]);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAnnonce();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      const filesArray = Array.from(files);
      setPreviews(filesArray.map(file => URL.createObjectURL(file)));
      setFormData({ ...formData, [name]: filesArray });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (let key in formData) {
      if (key === 'photos' && formData.photos && formData.photos.length > 0) {
        data.append('photo_de_maison', formData.photos[0]);
      } else {
        data.append(key, formData[key]);
      }
    }
    try {
      const token = localStorage.getItem('access_token');
      const res = await fetch(`http://localhost:8000/annonces-proprietaire/${id}/`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
        body: data,
      });
      if (res.ok) {
        navigate('/MesAnnonces');
      } else {
        alert('Erreur lors de la modification');
      }
    } catch (err) {
      alert('Erreur réseau');
    }
  };

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur : {error}</div>;
  if (!formData) return null;

  return (
    <div className="form-container-wrapper">
      <form onSubmit={handleSubmit} className="form-container">
        <h1>Modifier mon annonce</h1>
        {/* Ajoute ici les champs du formulaire comme dans FormulaireProprietaire.jsx, mais avec value={formData.champ} et onChange=handleChange */}
        {/* Pour la démo, juste le titre et la description */}
        <div className="form-group">
          <label>Description</label>
          <textarea name="description" value={formData.description || ''} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Photo principale</label>
          <input type="file" name="photos" accept="image/*" onChange={handleChange} />
          {previews.length > 0 && <img src={previews[0]} alt="Aperçu" className="photo-thumb" />}
        </div>
        <button type="submit" className="submit-button">Enregistrer les modifications</button>
      </form>
    </div>
  );
};

export default EditAnnonceProprietaire;
