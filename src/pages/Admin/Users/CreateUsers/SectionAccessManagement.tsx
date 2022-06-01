import { UserAccountForm } from 'src/data/services/graphql';
import CreateUsersFooter from './CreateUsersFooter';
import { AccessManagementWizardBody } from 'src/pages/Admin/Users/AccessManagementWizardBody';
import { WizardBody } from 'src/layouts/Panels/Panels.styles';

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
      <WizardBody>
        <AccessManagementWizardBody form={form} saveOptions={saveOptions} />
      </WizardBody>
      <CreateUsersFooter onPrev={handlePrev} onNext={handleNext} />
    </>
  );
};

// SectionAccessManagement.defaultProps = defaultProps;

export { SectionAccessManagement };
export default SectionAccessManagement;
