/* ==========================================================================
   LandingPage — CivicPath AI
   Maps to: Landing & Guided Journey Start
   ========================================================================== */

import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import type { VoterPersona } from '../../types';
import { personaOptions } from '../../data/mockData';
import './LandingPage.css';

export default function LandingPage() {
  const navigate = useNavigate();
  const { updatePersona } = useAuth();

  const handlePersonaSelect = async (personaId: VoterPersona) => {
    await updatePersona(personaId);
    navigate('/dashboard');
  };

  return (
    <div className="landing">
      <div className="landing__hero">
        <span className="material-symbols-outlined landing__logo">how_to_vote</span>
        <h1 className="text-headline-lg landing__title">Informed decisions, delivered simply.</h1>
        <p className="text-body-lg landing__subtitle">
          Your secure, non-partisan AI guide for understanding local policies, tracking deadlines, and preparing for the ballot box.
        </p>
        <p className="text-caption landing__disclaimer">
          All insights are synthesized strictly from official county clerk records, verified .gov sources, and non-partisan fact-checkers.
        </p>
      </div>

      <div className="landing__personas">
        <h2 className="text-headline-md text-center mb-sm">What kind of voter are you?</h2>
        <p className="text-body-md text-center text-muted mb-lg">
          Select a path to tailor your dashboard experience and AI context.
        </p>

        <div className="landing__grid">
          {personaOptions.map((persona) => (
            <button
              key={persona.id}
              className="persona-card"
              onClick={() => handlePersonaSelect(persona.id)}
            >
              <span className="material-symbols-outlined persona-card__icon">
                {persona.icon}
              </span>
              <h3 className="text-headline-md persona-card__title">{persona.title}</h3>
              <p className="text-body-md persona-card__desc">{persona.description}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
