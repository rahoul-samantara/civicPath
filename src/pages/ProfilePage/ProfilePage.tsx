/* ==========================================================================
   ProfilePage — CivicPath AI
   Maps to: Voter Profile & Settings (Spec §10)
   ========================================================================== */

import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { saveUserProfile } from '../../services/firebase';
import './ProfilePage.css';

export default function ProfilePage() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [address, setAddress] = useState(user?.address || '');
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    await saveUserProfile(user.uid, { address });
    setIsEditing(false);
    setSaving(false);
  };

  return (
    <div className="profile-page animate-fade-in">
      <header className="profile-page__header">
        <h1 className="text-headline-lg">Voter Profile</h1>
        <p className="text-body-md">Manage your civic identity and local data preferences.</p>
      </header>

      <div className="profile-page__grid">
        <section className="profile-section glass-panel">
          <h2 className="text-headline-md">Identity</h2>
          <div className="profile-info">
            <div className="profile-info__row">
              <span className="text-label-md">Name</span>
              <span className="text-body-md">{user?.displayName}</span>
            </div>
            <div className="profile-info__row">
              <span className="text-label-md">Email</span>
              <span className="text-body-md">{user?.email}</span>
            </div>
            <div className="profile-info__row">
              <span className="text-label-md">Persona</span>
              <span className="persona-chip">{user?.persona}</span>
            </div>
          </div>
        </section>

        <section className="profile-section glass-panel">
          <div className="section-header">
            <h2 className="text-headline-md">Voting Address</h2>
            {!isEditing && (
              <button className="btn btn--text" onClick={() => setIsEditing(true)}>Edit</button>
            )}
          </div>
          <p className="text-caption">This address is used to fetch your specific polling places and ballot information.</p>
          
          {isEditing ? (
            <div className="address-edit">
              <input
                type="text"
                className="input"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter your full street address"
              />
              <div className="address-edit__actions">
                <button className="btn btn--secondary btn--sm" onClick={() => setIsEditing(false)}>Cancel</button>
                <button className="btn btn--primary btn--sm" onClick={handleSave} disabled={saving}>
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </div>
          ) : (
            <div className="address-display">
              <span className="material-symbols-outlined">location_on</span>
              <span className="text-body-md">{user?.address || 'No address set'}</span>
            </div>
          )}
        </section>

        <section className="profile-section glass-panel">
          <h2 className="text-headline-md">Security & Data</h2>
          <div className="data-controls">
            <div className="data-control">
              <div>
                <h4 className="text-body-md">Personalized Experience</h4>
                <p className="text-caption">Allow AI to remember your voting goals for better guidance.</p>
              </div>
              <input type="checkbox" defaultChecked />
            </div>
            <div className="data-control">
              <div>
                <h4 className="text-body-md">Deadline Notifications</h4>
                <p className="text-caption">Get browser alerts for upcoming registration deadlines.</p>
              </div>
              <input type="checkbox" defaultChecked />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
