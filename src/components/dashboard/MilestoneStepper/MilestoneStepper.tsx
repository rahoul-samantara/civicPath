/* ==========================================================================
   MilestoneStepper — CivicPath AI
   Tracks user progress through the 4 stages defined in the spec.
   ========================================================================== */

import { type JourneyMilestone } from '../../../types';
import Button from '../../common/Button/Button';
import './MilestoneStepper.css';

interface MilestoneStepperProps {
  milestones: JourneyMilestone[];
}

export default function MilestoneStepper({ milestones }: MilestoneStepperProps) {
  return (
    <div className="stepper" role="list">
      {milestones.map((milestone, index) => {
        const isComplete = milestone.status === 'complete';
        const isCurrent = milestone.status === 'in-progress';

        let statusIcon = 'radio_button_unchecked';
        if (isComplete) statusIcon = 'check_circle';
        if (isCurrent) statusIcon = 'radio_button_checked';

        return (
          <div
            key={milestone.id}
            className={`stepper__item stepper__item--${milestone.status}`}
            role="listitem"
            aria-current={isCurrent ? 'step' : undefined}
          >
            {/* Step Connector Line */}
            {index < milestones.length - 1 && (
              <div className="stepper__connector" aria-hidden="true" />
            )}

            {/* Step Icon */}
            <div className="stepper__icon-container">
              <span className="material-symbols-outlined stepper__icon">
                {statusIcon}
              </span>
            </div>

            {/* Step Content */}
            <div className="stepper__content">
              <h3 className="text-headline-md stepper__title">
                {milestone.title}
              </h3>
              <p className="text-body-md stepper__desc">
                {milestone.description}
              </p>

              {/* Deadline & Action */}
              <div className="stepper__meta">
                {milestone.deadline && (
                  <span className="stepper__deadline">
                    <span className="material-symbols-outlined">event</span>
                    Due:{' '}
                    {new Date(milestone.deadline).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                )}

                {isCurrent && milestone.actionUrl && (
                  <Button
                    variant="secondary"
                    size="sm"
                    icon="open_in_new"
                    iconPosition="end"
                    onClick={() => window.open(milestone.actionUrl!, '_blank')}
                  >
                    Start Step
                  </Button>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
