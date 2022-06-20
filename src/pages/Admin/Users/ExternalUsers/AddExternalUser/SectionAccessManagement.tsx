import { UserAccountForm } from 'src/data/services/graphql';
import { AccessManagementWizardBody } from 'src/pages/Admin/Users/AccessManagementWizardBody';
import { WizardBody } from 'src/layouts/Panels/Panels.styles';
import AddExternalUsersAccessFooter from './AddExternalUsersAccessFooter';

type SectionAccessProps = {
  form?: UserAccountForm;
  onPrev: () => void;
  onNext: () => void;
  saveOptions: (sids: string[]) => void;
};

const SectionAccessManagement = ({ form, onPrev, onNext, saveOptions }: SectionAccessProps) => {
  const handlePrev = () => {
    onPrev();

    return null;
  };

  const handleNext = () => {
    onNext();
    return null;
  };

  return (
    <>
      <WizardBody>
        <AccessManagementWizardBody form={form} saveOptions={saveOptions} />
      </WizardBody>
      <AddExternalUsersAccessFooter onPrev={handlePrev} onNext={handleNext} />
    </>
  );
};

// SectionAccessManagement.defaultProps = defaultProps;

export { SectionAccessManagement };
export default SectionAccessManagement;
