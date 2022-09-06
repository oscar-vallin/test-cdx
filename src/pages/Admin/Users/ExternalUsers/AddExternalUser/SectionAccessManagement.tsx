import { AccessManagementWizardBody } from 'src/pages/Admin/Users/AccessManagementWizardBody';
import { WizardBody } from 'src/layouts/Panels/Panels.styles';
import { SectionAccessManagementProps } from 'src/pages/Admin/Users/WizardTypes';
import AddExternalUsersAccessFooter from './AddExternalUsersAccessFooter';

const SectionAccessManagement = ({
  form, onPrev, onNext, saveOptions,
}: SectionAccessManagementProps) => (
  <>
    <WizardBody>
      <AccessManagementWizardBody form={form} saveOptions={saveOptions} />
    </WizardBody>
    <AddExternalUsersAccessFooter onPrev={onPrev} onNext={onNext} />
  </>
);

export { SectionAccessManagement };
export default SectionAccessManagement;
