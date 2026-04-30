/* ==========================================================================
   CalendarPage — CivicPath AI
   Maps to: Election Deadlines & Reminders (Spec P2)
   ========================================================================== */

import { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { getMilestones } from '../../services/firebase';
import type { JourneyMilestone } from '../../types';
import './CalendarPage.css';

export default function CalendarPage() {
  const { user } = useAuth();
  const [milestones, setMilestones] = useState<JourneyMilestone[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      getMilestones(user.uid).then((data) => {
        setMilestones(data as JourneyMilestone[]);
        setLoading(false);
      });
    }
  }, [user]);

  const deadlines = [
    { title: 'Voter Registration Deadline', date: 'Oct 5, 2026', type: 'registration' },
    { title: 'Absentee Request Deadline', date: 'Oct 27, 2026', type: 'absentee' },
    { title: 'Early Voting Starts', date: 'Oct 19, 2026', type: 'voting' },
    { title: 'Election Day', date: 'Nov 3, 2026', type: 'voting', critical: true },
  ];

  return (
    <div className="calendar-page animate-fade-in">
      <header className="calendar-page__header">
        <h1 className="text-headline-lg">Election Calendar</h1>
        <p className="text-body-md">Stay ahead of critical deadlines in your jurisdiction.</p>
      </header>

      <div className="calendar-page__content">
        <section className="calendar-page__deadlines">
          <h2 className="text-headline-md">Upcoming Deadlines</h2>
          <div className="deadline-grid">
            {deadlines.map((d, i) => (
              <div key={i} className={`deadline-card glass-panel ${d.critical ? 'deadline-card--critical' : ''}`}>
                <div className="deadline-card__date">
                  <span className="material-symbols-outlined">event</span>
                  {d.date}
                </div>
                <h3 className="text-body-lg">{d.title}</h3>
                <span className={`badge badge--${d.type}`}>{d.type}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="calendar-page__journey glass-panel">
          <h2 className="text-headline-md">Your Voter Journey</h2>
          {loading ? (
            <p>Loading milestones...</p>
          ) : (
            <div className="milestone-timeline">
              {milestones.map((m) => (
                <div key={m.id} className={`milestone-item milestone-item--${m.status}`}>
                  <div className="milestone-item__icon">
                    <span className="material-symbols-outlined">
                      {m.status === 'complete' ? 'check_circle' : 'radio_button_unchecked'}
                    </span>
                  </div>
                  <div className="milestone-item__content">
                    <h4 className="text-body-md">{m.title}</h4>
                    <p className="text-caption">{m.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
