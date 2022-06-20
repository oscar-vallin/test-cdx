import { ReactElement } from 'react';
import { UserAccountForm } from 'src/data/services/graphql';
import UpdateExternalUserFooter from './UpdateExternalUserFooter';
import { SummaryWizardBody } from 'src/pages/Admin/Users/SummaryWizardBody';

type SectionSummaryPropsType = {
  form: UserAccountForm;
  onSubmit: () => any;
  isProcessing?: boolean;
};

const SectionSummary = ({ form, onSubmit, isProcessing }: SectionSummaryPropsType): ReactElement => {
  const handleSubmit = () => {
    onSubmit();
    return null;
  };

  return (
    <>
      <SummaryWizardBody form={form}/>
      {isProcessing && <>Processing...</>}
      {!isProcessing && <UpdateExternalUserFooter onSave={handleSubmit} />}
    </>
  );
};

export { SectionSummary };
export default SectionSummary;
