import { useState } from 'react';
import { TourStep } from 'src/components/help/tours';
import { IButtonProps, TeachingBubble } from '@fluentui/react';

type WalkThroughType = {
  id: string;
  show: boolean;
  tour: TourStep[];
  onDismiss: () => void;
};

export const WalkThrough = ({ id, show, tour, onDismiss }: WalkThroughType) => {
  const [step, setStep] = useState(0);

  const dismiss = () => {
    setStep(0);
    onDismiss();
  };

  const nextButton: IButtonProps = {
    children: step >= tour.length - 1 ? 'Finish' : 'Next',
    onClick: () => {
      if (step >= tour.length - 1) {
        dismiss();
      } else {
        setStep(step + 1);
      }
    },
  };

  const prevButton: IButtonProps = {
    children: 'Previous',
    hidden: step <= 0,
    disabled: step <= 0,
    onClick: () => {
      setStep(step - 1);
    },
  };

  if (show && tour.length > 0) {
    const tourStep = tour[step];
    return (
      <TeachingBubble
        target={tourStep.target}
        onDismiss={dismiss}
        headline={tourStep.title}
        calloutProps={{
          id,
          directionalHint: tourStep.calloutDirection,
        }}
        primaryButtonProps={nextButton}
        secondaryButtonProps={prevButton}
        footerContent={`${step + 1} of ${tour.length}`}
      >
        {tourStep.content}
      </TeachingBubble>
    );
  }
  return null;
};
