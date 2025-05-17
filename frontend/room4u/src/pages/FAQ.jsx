import React, { useState } from 'react';
import '../styles/FAQ.css';

const faqData = [
    {
        question: "Comment fonctionne la plateforme ?",
        answer: "Notre plateforme met en relation les personnes à la recherche d’une colocation avec des propriétaires ou d'autres colocataires. Il vous suffit de créer un compte, remplir votre profil et commencer à échanger gratuitement."
    },
    {
        question: "Est-ce que l’inscription est gratuite ?",
        answer: "Oui, l’inscription et l’utilisation de la plateforme sont entièrement gratuites."
    },

    {
        question: "Je suis propriétaire, dois-je passer un test de personnalité ?",
        answer: "Oui, l’inscription et l’utilisation de la plateforme sont entièrement gratuites."
    },

    {
        question: "Qui peut voir mon profil ?",
        answer: "Votre profil est visible uniquement par les utilisateurs compatibles ou les propriétaires lorsque vous postulez à une annonce."
    },
    
    {
        question: "Comment fonctionne le test de personnalité ?",
        answer: "Le test est basé sur vos habitudes de vie (rythme de sommeil, tabac, animaux, ambiance, etc.). Cela permet de trouver des colocataires avec un mode de vie compatible au vôtre."
    },


  {
    question: "Comment puis-je contacter un annonceur ?",
    answer: "Une fois connecté, vous pouvez contacter les annonceurs via la messagerie intégrée à la plateforme."
  },
   
  {
    question: "Puis-je modifier mes informations après l’inscription ?",
    answer: "Oui, vous pouvez modifier votre profil, vos préférences ou vos annonces à tout moment depuis votre espace personnel."
  },
  {
    question: " Y a-t-il une gestion des paiements ou des contrats de colocation ?",
    answer: "Non, notre plateforme ne prend pas en charge les paiements ou la gestion des contrats. Vous organisez cela directement avec l’autre partie."
  },
  {
    question: "Mes données sont-elles protégées ?",
    answer: "Oui, nous respectons les réglementations en vigueur sur la protection des données personnelles (RGPD). Vos informations ne sont jamais partagées sans votre consentement."
  },
];

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);
  
    const toggleFAQ = (index) => {
      setActiveIndex(index === activeIndex ? null : index);
    };
  
    return (
      <div className="faq-container">
        <h2 className="faq-title">Foire Aux Questions</h2>
        <div className="faq-list">
          {faqData.map((faq, index) => (
            <div
              key={index}
              className={`faq-item ${activeIndex === index ? 'active' : ''}`}
              onClick={() => toggleFAQ(index)}
              role="button"
              aria-expanded={activeIndex === index}
              aria-controls={`answer-${index}`}
            >
              <div className="faq-question-wrapper">
                <h3 className="faq-question">{faq.question}</h3>
                <svg 
                  className="faq-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </div>
              <div 
                id={`answer-${index}`}
                className="faq-answer"
                aria-hidden={activeIndex !== index}
              >
                {faq.answer}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

export default FAQ;
