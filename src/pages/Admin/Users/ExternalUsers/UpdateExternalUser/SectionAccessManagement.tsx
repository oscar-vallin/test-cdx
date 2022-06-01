import { CdxWebCommandType, UserAccountForm } from 'src/data/services/graphql';
import { UpdateExternalUserFooter } from './UpdateExternalUserFooter';
import { AccessManagementWizardBody } from 'src/pages/Admin/Users/AccessManagementWizardBody';
import { WizardBody } from 'src/layouts/Panels/Panels.styles';

type SectionAccessProps = {
  form?: UserAccountForm;
  onSubmit: () => any;
  saveOptions: (sids: string[]) => void;
};

const SectionAccessManagement = ({ form, onSubmit, saveOptions }: SectionAccessProps) => {
  const saveCmd = form?.commands?.find((cmd) => cmd.commandType === CdxWebCommandType.Assign);

  return (
    <>
      <WizardBody>
        <AccessManagementWizardBody form={form} saveOptions={saveOptions} />
      </WizardBody>
      <UpdateExternalUserFooter saveCmd={saveCmd} onSave={onSubmit} />
    </>
  );
};

// SectionAccessManagement.defaultProps = defaultProps;

export { SectionAccessManagement };
export default SectionAccessManagement;
