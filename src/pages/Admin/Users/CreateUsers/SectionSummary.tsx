import { ReactElement } from 'react';

import { UserAccountForm } from 'src/data/services/graphql';
import { SummaryWizardBody } from 'src/pages/Admin/Users/SummaryWizardBody';
import CreateUsersFooter from './CreateUsersFooter';

type SectionSummaryPropsType = {
  form: UserAccountForm;
  onPrev: () => void;
  onSubmit: () => void;
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
      {isProcessing && <>Processing</>}
      {!isProcessing && <CreateUsersFooter onPrev={handlePrev} onSubmit={handleSubmit} />}
    </>
  );
};

export { SectionSummary };
export default SectionSummary;
