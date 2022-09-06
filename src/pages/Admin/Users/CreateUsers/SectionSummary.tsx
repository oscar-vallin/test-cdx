import { ReactElement } from 'react';
import { SummaryWizardBody } from 'src/pages/Admin/Users/SummaryWizardBody';
import { SectionSummaryPropsType } from 'src/pages/Admin/Users/WizardTypes';
import CreateUsersFooter from './CreateUsersFooter';

const SectionSummary = ({
  form, onPrev, onSubmit, isProcessing,
}: SectionSummaryPropsType): ReactElement => (
  <>
    <SummaryWizardBody form={form} />
    {isProcessing && <>Processing</>}
    {!isProcessing && <CreateUsersFooter onPrev={onPrev} onSubmit={onSubmit} />}
  </>
);

export { SectionSummary };
export default SectionSummary;
