import { useState } from 'react';

type WizardTabsTypes = {
  selectedTab: string;
  handleNext: () => void;
  handlePrev: () => void;
  handleTabChange: (hash: string) => void;
  resetTabs: () => void;
};

export const useWizardTabs = (tabs: string[]): WizardTabsTypes => {
  const [step, setStep] = useState(tabs[0]);

  const handleNext = () => {
    const index = tabs.indexOf(step) + 1;
    if (index < tabs.length) {
      setStep(tabs[index]);
    }
  };

  const handlePrev = () => {
    const index = tabs.indexOf(step) - 1;
    if (index >= 0) {
      setStep(tabs[index]);
    }
  };

  const handleTabChange = (hash: string): void => {
    setStep(hash);
  };

  const reset = (): void => {
    setStep(tabs[0]);
  };

  return {
    selectedTab: step,
    handleNext,
    handlePrev,
    handleTabChange,
    resetTabs: reset,
  };
};
