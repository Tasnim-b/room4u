import  { useState } from "react";
import {
  FaUser,
  FaCalendarAlt,
  FaBriefcase,
  FaMapMarkerAlt,
  FaMoneyBillAlt,
  FaPhone,
  FaInfoCircle,
  FaHeart,
} from "react-icons/fa";
import "../styles/FormulaireChercheur.css";
import NavbarColoc from '../components/NavbarColoc'; 

const FormulaireColocataire = ({ onClose }) => {
  const [formData, setFormData] = useState({
    gouvernorat: "",
    delegation: "",
    phone: "",
    description: "",
    budget_max: "",
    occupation: "",
    age: "",
    date_habite: "",
    preferences: {},
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const gouvernorats = [
    "Ariana", "Béja", "Ben Arous", "Bizerte", "Gabès", "Gafsa", "Jendouba",
    "Kairouan", "Kasserine", "Kébili", "Kef", "Mahdia", "La Manouba", "Médenine",
    "Monastir", "Nabeul", "Sfax", "Sidi Bouzid", "Siliana", "Sousse", "Tataouine",
    "Tozeur", "Tunis", "Zaghouan",
  ];

  const occupations = [
    "Etudiant(e)", "Retraité(e)", "Salarié(e)", "Chômeur(e)",
  ];

  const preferencesOptions = [
    "Musique", "Sport", "Lecture", "Cuisine", "Cinema", "Video games",
    "Casanier", "Aventurier", "Artiste", "Extraverti", "Introverti",
    "Communicatif", "Solitaire", "Calme", "Sérieux", "Amical",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "gouvernorat" ? { delegation: "" } : {}),
    }));
  };

  const handlePreferencesChange = (key) => {
    setFormData((prev) => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [key]: !prev.preferences[key],
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        alert("Utilisateur non authentifié.");
        return;
      }

      const selectedPreferences = Object.entries(formData.preferences)
        .filter(([_, isChecked]) => isChecked)
        .map(([key]) => key);

      const form = new FormData();
      form.append("gouvernorat", formData.gouvernorat);
      form.append("delegation", formData.delegation);
      form.append("phone", formData.phone);
      form.append("description", formData.description);
      form.append("budget_max", formData.budget_max);
      form.append("occupation", formData.occupation);
      form.append("date_habite", formData.date_habite);

      // ✅ Append each preference individually
      selectedPreferences.forEach(pref => {
        form.append("preferences", pref);
      });

      const response = await fetch("http://localhost:8000/coloc-chercheur-annonces/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: form,
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Backend error details:", errorData);
        throw new Error(`Erreur serveur: ${JSON.stringify(errorData)}`);
      }

      alert("Annonce créée avec succès ! 🎉");

      setFormData({
        gouvernorat: "",
        delegation: "",
        phone: "",
        description: "",
        budget_max: "",
        occupation: "",
        age: "",
        date_habite: "",
        preferences: {},
      });

      if (onClose) onClose();
    } catch (error) {
      console.error("Erreur complète:", error);
      alert(`Échec de l'envoi: ${error.message}`);
    }
  };

  return (
    <div>
      <NavbarColoc />
    
    <div className="form-container">
      {onClose && (
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
      )}
      <form onSubmit={handleSubmit}>
        <h2><FaUser /> Recherche une colocation</h2>

        {/* Localisation */}
        <div className="form-section">
          <h3><FaMapMarkerAlt /> Localisation</h3>
          <div className="form-grid">
            <div className="form-group">
              <label><FaMapMarkerAlt /> Gouvernorat</label>
              <select
                name="gouvernorat"
                value={formData.gouvernorat}
                onChange={handleChange}
                required
              >
                <option value="">-- Choisir un gouvernorat --</option>
                {gouvernorats.map((g) => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label><FaMapMarkerAlt /> Délégation</label>
              <input
                type="text"
                name="delegation"
                value={formData.delegation}
                onChange={handleChange}
                placeholder="Entrez votre délégation"
                required
              />
            </div>
          </div>
        </div>

        {/* Informations personnelles */}
        <div className="form-section">
          <h3><FaInfoCircle /> Informations personnelles</h3>
          <div className="form-grid">
            <div className="form-group">
              <label><FaMoneyBillAlt /> Budget maximum (TND)</label>
              <input
                type="number"
                name="budget_max"
                value={formData.budget_max}
                onChange={handleChange}
                min="0"
                step="10"
                required
              />
            </div>
            <div className="form-group">
              <label><FaBriefcase /> Occupation</label>
              <select
                name="occupation"
                value={formData.occupation}
                onChange={handleChange}
                required
              >
                <option value="">-- Sélectionnez votre occupation --</option>
                {occupations.map((occ) => (
                  <option key={occ} value={occ}>{occ}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label><FaCalendarAlt /> Date souhaitée d'emménagement</label>
              <input
                type="date"
                name="date_habite"
                value={formData.date_habite}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>

        {/* Préférences */}
        <div className="form-section">
          <h3><FaHeart /> Préférences</h3>
          <div className="form-group checkbox-group">
            {preferencesOptions.map((pref) => (
              <label key={pref} className="checkbox-label">
                <input
                  type="checkbox"
                  checked={!!formData.preferences[pref]}
                  onChange={() => handlePreferencesChange(pref)}
                />
                {pref}
              </label>
            ))}
          </div>
        </div>

        {/* Contact et description */}
        <div className="form-section">
          <h3><FaInfoCircle /> Contact et description</h3>
          <div className="form-grid">
            <div className="form-group">
              <label><FaPhone /> Téléphone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group full-width">
              <label><FaInfoCircle /> Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                placeholder="Décrivez ce que vous recherchez dans une colocation..."
              />
            </div>
          </div>
        </div>

        <button type="submit" className="submit-btn">
          Publier ma recherche
        </button>

        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
    </div>
    </div>
  );
};

export default FormulaireColocataire;