/* ==========================================================================
   ReadinessGauge — Animated radial progress indicator
   Hackathon Differentiator: "Civic Readiness Score" (Spec §17.1)
   ========================================================================== */

import { useEffect, useState } from 'react';
import './ReadinessGauge.css';

interface ReadinessGaugeProps {
  score: number; // 0–100
  size?: number; // px diameter
  label?: string;
}

export default function ReadinessGauge({
  score,
  size = 160,
  label = 'Voter Readiness',
}: ReadinessGaugeProps) {
  const [animatedScore, setAnimatedScore] = useState(0);
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (animatedScore / 100) * circumference;

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedScore(score), 100);
    return () => clearTimeout(timer);
  }, [score]);

  const getColor = () => {
    if (animatedScore >= 80) return 'var(--color-secondary)';
    if (animatedScore >= 50) return 'var(--color-primary-container)';
    return 'var(--color-tertiary-container)';
  };

  return (
    <div
      className="gauge"
      role="progressbar"
      aria-valuenow={score}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={`${label}: ${score}%`}
    >
      <svg
        className="gauge__svg"
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
      >
        {/* Background track */}
        <circle
          className="gauge__track"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />
        {/* Progress arc */}
        <circle
          className="gauge__progress"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ stroke: getColor() }}
        />
      </svg>
      <div className="gauge__center">
        <span className="gauge__value">{Math.round(animatedScore)}%</span>
        <span className="gauge__label">{label}</span>
      </div>
    </div>
  );
}
