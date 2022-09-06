import { useState } from 'react';
import { TourStep } from 'src/components/help/tours';
import { IButtonProps, TeachingBubble } from '@fluentui/react';

type WalkThroughType = {
  id: string;
  show: boolean;
  tour: TourStep[];
  onDismiss: () => void;
};

export const WalkThrough = ({
  id, show, tour, onDismiss,
}: WalkThroughType) => {
  const [step, setStep] = useState(0);

  const dismiss = () => {
    setStep(0);
    onDismiss();
  };

  const nextButton = (isLast: boolean): IButtonProps => ({
    children: isLast ? 'Finish' : 'Next',
    onClick: () => {
      if (isLast) {
        dismiss();
      } else {
        setStep(step + 1);
      }
    },
  });

  const prevButton: IButtonProps = {
    children: 'Previous',
    hidden: step <= 0,
    disabled: step <= 0,
    onClick: () => {
      setStep(step - 1);
    },
  };

  if (show && tour.length > 0) {
    const modifiedTour: TourStep[] = [];
    tour.forEach((_step) => {
      const target = _step.target.replace('#', '');
      if (document.getElementById(target)) {
        modifiedTour.push(_step);
      }
    });
    if (step >= modifiedTour.length) {
      return null;
    }
    const tourStep = modifiedTour[step];
    const isLast = step >= modifiedTour.length - 1;
    return (
      <TeachingBubble
        target={tourStep.target}
        onDismiss={dismiss}
        headline={tourStep.title}
        calloutProps={{
          id,
          directionalHint: tourStep.calloutDirection,
        }}
        primaryButtonProps={nextButton(isLast)}
        secondaryButtonProps={prevButton}
        footerContent={`${step + 1} of ${modifiedTour.length}`}
      >
        {tourStep.content}
      </TeachingBubble>
    );
  }
  return null;
};
