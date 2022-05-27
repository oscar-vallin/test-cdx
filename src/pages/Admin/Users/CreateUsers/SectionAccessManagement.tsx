import { UserAccountForm } from 'src/data/services/graphql';
import CreateUsersFooter from './CreateUsersFooter';
import { AccessManagementWizardBody } from 'src/pages/Admin/Users/AccessManagementWizardBody';

type SectionAccessProps = {
  form?: UserAccountForm;
  onPrev: () => null;
  onNext: () => null;
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
      <AccessManagementWizardBody form={form} saveOptions={saveOptions} />
      <CreateUsersFooter onPrev={handlePrev} onNext={handleNext} />
    </>
  );
};

// SectionAccessManagement.defaultProps = defaultProps;

export { SectionAccessManagement };
export default SectionAccessManagement;
