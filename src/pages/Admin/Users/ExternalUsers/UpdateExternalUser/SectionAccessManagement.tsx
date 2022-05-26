import { UserAccountForm } from 'src/data/services/graphql';
import { UpdateExternalUserFooter } from './UpdateExternalUserFooter';
import { AccessManagementWizardBody } from 'src/pages/Admin/Users/AccessManagementWizardBody';

type SectionAccessProps = {
  form?: UserAccountForm;
  onSubmit: () => any;
  saveOptions: (sids: string[]) => void;
};

const SectionAccessManagement = ({ form, onSubmit, saveOptions }: SectionAccessProps) => {

  return (
    <>
      <AccessManagementWizardBody form={form} saveOptions={saveOptions}/>
      <UpdateExternalUserFooter onSave={onSubmit} />
    </>
  );
};

// SectionAccessManagement.defaultProps = defaultProps;

export { SectionAccessManagement };
export default SectionAccessManagement;
