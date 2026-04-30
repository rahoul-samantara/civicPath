/* ==========================================================================
   TopBar — CivicPath AI  (Mobile header + user avatar)
   ========================================================================== */

import './TopBar.css';

interface TopBarProps {
  onMenuClick: () => void;
  userName: string;
  userPhoto: string | null;
}

export default function TopBar({ onMenuClick, userName, userPhoto }: TopBarProps) {
  const initials = userName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <header className="topbar" role="banner">
      <button
        className="topbar__menu-btn"
        onClick={onMenuClick}
        aria-label="Open navigation menu"
        type="button"
      >
        <span className="material-symbols-outlined">menu</span>
      </button>

      <div className="topbar__title">
        <span className="material-symbols-outlined topbar__icon">how_to_vote</span>
        <span className="topbar__brand">CivicPath</span>
      </div>

      <button
        className="topbar__avatar"
        aria-label={`User profile for ${userName}`}
        type="button"
      >
        {userPhoto ? (
          <img src={userPhoto} alt="" className="topbar__avatar-img" />
        ) : (
          <span className="topbar__avatar-initials">{initials}</span>
        )}
      </button>
    </header>
  );
}
