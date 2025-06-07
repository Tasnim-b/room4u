import React, { useState } from 'react';
import '../styles/FormulaireTestCompatibilite.css';
import NavbarColoc from '../components/NavbarColoc'; 
import { Link } from 'react-router-dom';

const FormulaireTestCompatibilite = () => {
  const [formData, setFormData] = useState({
    horaire_de_reveil: '',
    horaire_de_coucher: '',
    fréquence_sortie_nocturne: '',
    fréquence_invitation_amis: '',
    fréquence_consommation_alcool: '',
    fréquence_de_menage: '',
    niveau_exigence_proprote: '',
    attitude_partage_taches: '',
    preference_niveau_sonore: '',
    sensibilite_bruit: '',
    preferences: '',
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const choices = {
    reveil: [
      { value: 'tôt', label: 'Tôt', icon: '🌅' },
      { value: 'moyen', label: 'Moyen', icon: '⏰' },
      { value: 'tard', label: 'Tard', icon: '🌙' },
    ],
    frequence: [
      { value: 'jamais', label: 'Jamais', icon: '❌' },
      { value: 'rarement', label: 'Rarement', icon: '⏳' },
      { value: 'souvent', label: 'Souvent', icon: '🔄' },
      { value: 'toujours', label: 'Toujours', icon: '✅' },
    ],
    menage: [
      { value: 'jamais', label: 'Jamais', icon: '🚫' },
      { value: 'hebdomadaire', label: 'Hebdomadaire', icon: '🗓️' },
      { value: 'quotidien', label: 'Quotidien', icon: '🧹' },
    ],
    proprote: [
      { value: 'faible', label: 'Faible', icon: '😌' },
      { value: 'moyen', label: 'Moyen', icon: '😐' },
      { value: 'élevé', label: 'Élevé', icon: '🧐' },
    ],
    planning: [
      { value: 'participatif', label: 'Participatif', icon: '👥' },
      { value: 'indépendant', label: 'Indépendant', icon: '🦸' },
    ],
    ambiance: [
      { value: 'calme', label: 'Calme', icon: '🤫' },
      { value: 'modéré', label: 'Modéré', icon: '🔈' },
      { value: 'bruyant', label: 'Bruyant', icon: '🔊' },
    ],
    preferences: [
      { value: 'aucune', label: 'Aucune préférence', icon: '🙂' },
      { value: 'fumeurs', label: 'Fumeurs acceptés', icon: '🚬' },
      { value: 'non_fumeurs', label: 'Non-fumeurs', icon: '🚭' },
      { value: 'animaux', label: 'Animaux acceptés', icon: '🐾' },
    ]
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const nextStep = () => {
    setCurrentStep(prev => prev + 1);
    window.scrollTo(0, 0);
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
    window.scrollTo(0, 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulation d'un appel API
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Form data submitted:', formData);
      setSubmitSuccess(true);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderRadioGroup = (label, name, options) => (
    <div className="form-group radio-group">
      <label>{label}</label>
      <div className="radio-options">
        {options.map(opt => (
          <label key={opt.value} className={`radio-option ${formData[name] === opt.value ? 'selected' : ''}`}>
            <input
              type="radio"
              name={name}
              value={opt.value}
              checked={formData[name] === opt.value}
              onChange={handleChange}
              required
            />
            <span className="radio-icon">{opt.icon}</span>
            <span className="radio-label">{opt.label}</span>
          </label>
        ))}
      </div>
    </div>
  );

  const renderStepIndicator = () => (
    <div className="step-indicator">
      {[1, 2, 3].map(step => (
        <div 
          key={step} 
          className={`step ${currentStep === step ? 'active' : ''} ${step < currentStep ? 'completed' : ''}`}
        >
          <span className="step-number">{step}</span>
        </div>
      ))}
    </div>
  );

  if (submitSuccess) {
    return (
      <div className="success-container">
        <div className="success-card">
          <div className="success-icon">🎉</div>
          <h2>Merci pour votre participation !</h2>
          <p>Vos préférences ont été enregistrées avec succès.</p>
          <p>Nous vous contacterons dès que nous aurons trouvé des colocataires compatibles.</p>
          <button 
            className="success-button" 
            onClick={() => {
              setSubmitSuccess(false);
              setCurrentStep(1);
              setFormData({
                horaire_de_reveil: '',
                horaire_de_coucher: '',
                fréquence_sortie_nocturne: '',
                fréquence_invitation_amis: '',
                fréquence_consommation_alcool: '',
                fréquence_de_menage: '',
                niveau_exigence_proprote: '',
                attitude_partage_taches: '',
                preference_niveau_sonore: '',
                sensibilite_bruit: '',
                preferences: '',
              });
            }}
          >
            Recommencer
          </button>
            <Link 
            to="/DashboardColoc" 
            className="success-button dashboard-button"
            >
            Retour au dashboard
            </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="form-container">
        <NavbarColoc /> 
      <form onSubmit={handleSubmit}>
        <div className="form-header">
          <h2>Test de Compatibilité Colocation</h2>
          <p>Répondez à ces questions pour trouver des colocataires qui correspondent à votre style de vie</p>
          {renderStepIndicator()}
        </div>

        {currentStep === 1 && (
          <div className="form-step">
            {renderRadioGroup('Horaire de réveil', 'horaire_de_reveil', choices.reveil)}
            {renderRadioGroup('Horaire de coucher', 'horaire_de_coucher', choices.reveil)}
            {renderRadioGroup('Fréquence sortie nocturne', 'fréquence_sortie_nocturne', choices.frequence)}
            
            <div className="form-navigation">
              <button type="button" className="next-button" onClick={nextStep}>
                Suivant
              </button>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="form-step">
            {renderRadioGroup('Fréquence invitation amis', 'fréquence_invitation_amis', choices.frequence)}
            {renderRadioGroup('Fréquence consommation alcool', 'fréquence_consommation_alcool', choices.frequence)}
            {renderRadioGroup('Fréquence de ménage', 'fréquence_de_menage', choices.menage)}
            
            <div className="form-navigation">
              <button type="button" className="prev-button" onClick={prevStep}>
                Précédent
              </button>
              <button type="button" className="next-button" onClick={nextStep}>
                Suivant
              </button>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="form-step">
            {renderRadioGroup('Niveau exigence propreté', 'niveau_exigence_proprote', choices.proprote)}
            {renderRadioGroup('Attitude partage tâches', 'attitude_partage_taches', choices.planning)}
            {renderRadioGroup('Préférence niveau sonore', 'preference_niveau_sonore', choices.ambiance)}
            {renderRadioGroup('Sensibilité au bruit', 'sensibilite_bruit', choices.proprote)}
            {renderRadioGroup('Préférences', 'preferences', choices.preferences)}
            
            <div className="form-navigation">
              <button type="button" className="prev-button" onClick={prevStep}>
                Précédent
              </button>
              <button type="submit" className="submit-button" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <span className="spinner"></span>
                    Envoi en cours...
                  </>
                ) : 'Terminer et envoyer'}
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default FormulaireTestCompatibilite;