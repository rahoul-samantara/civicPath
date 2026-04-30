/* ==========================================================================
   Sidebar Navigation — CivicPath AI
   Maps to: Stitch sidebar (all screens have identical left nav)
   ========================================================================== */

import { NavLink } from 'react-router-dom';
import { navItems } from '../../../data/mockData';
import './Sidebar.css';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="sidebar-backdrop"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`sidebar ${isOpen ? 'sidebar--open' : ''}`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="sidebar__header">
          <NavLink to="/" className="sidebar__logo" aria-label="CivicPath AI Home">
            <span className="material-symbols-outlined sidebar__logo-icon">
              how_to_vote
            </span>
            <div className="sidebar__logo-text">
              <span className="sidebar__brand">CivicPath</span>
              <span className="sidebar__badge">Non-Partisan AI</span>
            </div>
          </NavLink>
        </div>

        <nav className="sidebar__nav">
          <ul className="sidebar__list" role="list">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `sidebar__link ${isActive ? 'sidebar__link--active' : ''}`
                  }
                  aria-label={item.ariaLabel}
                  onClick={onClose}
                >
                  <span className="material-symbols-outlined sidebar__icon">
                    {item.icon}
                  </span>
                  <span className="sidebar__label">{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="sidebar__footer">
          <p className="sidebar__source-note">
            Data sourced from official .gov portals
          </p>
        </div>
      </aside>
    </>
  );
}
