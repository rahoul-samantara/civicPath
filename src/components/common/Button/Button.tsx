/* ==========================================================================
   Button — CivicPath AI
   Variants: primary (solid), secondary (outlined), tertiary (text-only)
   Matches Stitch design system §Components.Buttons
   ========================================================================== */

import { type ButtonHTMLAttributes, type ReactNode } from 'react';
import './Button.css';

type ButtonVariant = 'primary' | 'secondary' | 'tertiary';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: string;
  iconPosition?: 'start' | 'end';
  isLoading?: boolean;
  fullWidth?: boolean;
  children: ReactNode;
}

export default function Button({
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'start',
  isLoading = false,
  fullWidth = false,
  children,
  disabled,
  className = '',
  ...rest
}: ButtonProps) {
  return (
    <button
      className={`btn btn--${variant} btn--${size} ${fullWidth ? 'btn--full-width' : ''} ${className}`}
      disabled={disabled || isLoading}
      aria-busy={isLoading}
      {...rest}
    >
      {isLoading && (
        <span className="btn__spinner" aria-hidden="true">
          <span className="material-symbols-outlined btn__spinner-icon">progress_activity</span>
        </span>
      )}
      {icon && iconPosition === 'start' && !isLoading && (
        <span className="material-symbols-outlined btn__icon" aria-hidden="true">
          {icon}
        </span>
      )}
      <span className="btn__label">{children}</span>
      {icon && iconPosition === 'end' && !isLoading && (
        <span className="material-symbols-outlined btn__icon" aria-hidden="true">
          {icon}
        </span>
      )}
    </button>
  );
}
