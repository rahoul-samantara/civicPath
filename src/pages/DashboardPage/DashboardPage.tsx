import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getMilestones } from '../../services/firebase';
import type { JourneyMilestone } from '../../types';
import ReadinessGauge from '../../components/dashboard/ReadinessGauge/ReadinessGauge';
import MilestoneStepper from '../../components/dashboard/MilestoneStepper/MilestoneStepper';
import Button from '../../components/common/Button/Button';
import './DashboardPage.css';

export default function DashboardPage() {
  const { user, login } = useAuth();
  const [milestones, setMilestones] = useState<JourneyMilestone[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      if (user) {
        const ms = await getMilestones(user.uid);
        if (ms.length > 0) {
          setMilestones(ms as JourneyMilestone[]);
        }
      }
      setLoading(false);
    };
    loadData();
  }, [user]);

  if (!user) {
    return (
      <div className="dashboard dashboard--logged-out">
        <h1 className="text-headline-lg">Your Election Journey</h1>
        <p className="text-body-md mb-lg">Sign in to track your voter registration and personalized deadlines.</p>
        <Button onClick={login} icon="login">Sign in with Google</Button>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <header className="dashboard__header">
        <div>
          <h1 className="text-headline-lg">Hello, {user.displayName}</h1>
          <p className="text-body-md dashboard__subtitle">
            {user.county ? `Voter status for ${user.county} County, ${user.state}` : 'Complete your profile to see local deadlines.'}
          </p>
        </div>
        <div className="dashboard__gauge-container">
          <ReadinessGauge score={user.readinessScore} />
        </div>
      </header>

      <div className="dashboard__content">
        <section className="dashboard__main">
          <div className="card">
            <h2 className="text-headline-md card__title">Milestone Tracker</h2>
            <div className="dashboard__stepper">
              {loading ? (
                <p className="text-body-md">Loading your journey...</p>
              ) : (
                <MilestoneStepper milestones={milestones} />
              )}
            </div>
          </div>
        </section>

        <aside className="dashboard__sidebar">
          <div className="card mb-md">
            <h2 className="text-headline-md card__title">Action Plan</h2>
            <p className="text-caption text-muted mb-md">Based on your {user.persona} persona.</p>
            <Button variant="secondary" size="sm" fullWidth className="mb-sm">Add to Calendar</Button>
            <Button variant="tertiary" size="sm" fullWidth>Print Checklist</Button>
          </div>

          <div className="card">
            <h2 className="text-headline-md card__title">Your Polling Place</h2>
            <p className="text-body-md mb-md">Find where you can cast your vote on election day.</p>
            <Button variant="primary" size="sm" fullWidth icon="map">Find on Map</Button>
          </div>
        </aside>
      </div>
    </div>
  );
}
