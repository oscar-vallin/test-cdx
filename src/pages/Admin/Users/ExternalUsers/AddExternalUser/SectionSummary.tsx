import { ReactElement } from 'react';
import { SummaryWizardBody } from 'src/pages/Admin/Users/SummaryWizardBody';
import { SectionSummaryPropsType } from 'src/pages/Admin/Users/WizardTypes';
import AddExternalUsersAccessFooter from './AddExternalUsersAccessFooter';

const SectionSummary = ({
  form, onPrev, onSubmit, isProcessing,
}: SectionSummaryPropsType): ReactElement => {
  const handlePrev = () => {
    onPrev();

    return null;
  };

  const handleSubmit = () => {
    onSubmit();
    return null;
  };

  return (
    <>
      <SummaryWizardBody form={form} />
      {isProcessing && <>Processing...</>}
      {!isProcessing && <AddExternalUsersAccessFooter onPrev={handlePrev} onSubmit={handleSubmit} />}
    </>
  );
};

export { SectionSummary };
export default SectionSummary;
