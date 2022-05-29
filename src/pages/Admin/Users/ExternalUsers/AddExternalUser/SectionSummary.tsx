import { ReactElement } from 'react';

import { UserAccountForm } from 'src/data/services/graphql';
import AddExternalUsersAccessFooter from './AddExternalUsersAccessFooter';
import { SummaryWizardBody } from 'src/pages/Admin/Users/SummaryWizardBody';

type SectionSummaryPropsType = {
  form: UserAccountForm;
  onPrev: () => null;
  onSubmit: () => any;
  isProcessing?: boolean;
};

const SectionSummary = ({ form, onPrev, onSubmit, isProcessing }: SectionSummaryPropsType): ReactElement => {
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
