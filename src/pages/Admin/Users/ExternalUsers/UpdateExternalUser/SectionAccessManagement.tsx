import { CdxWebCommandType, UserAccountForm } from 'src/data/services/graphql';
import { AccessManagementWizardBody } from 'src/pages/Admin/Users/AccessManagementWizardBody';
import { WizardBody } from 'src/layouts/Panels/Panels.styles';
import { UpdateExternalUserFooter } from './UpdateExternalUserFooter';

type SectionAccessProps = {
  form?: UserAccountForm;
  accessManagementSelected?: boolean;
  onSubmit: () => any;
  saveOptions: (sids: string[]) => void;
};

const SectionAccessManagement = ({
  form, onSubmit, saveOptions, accessManagementSelected,
}: SectionAccessProps) => {
  const saveCmd = form?.commands?.find((cmd) => cmd.commandType === CdxWebCommandType.Assign);
  return (
    <>
      <WizardBody>
        <AccessManagementWizardBody form={form} saveOptions={saveOptions} />
      </WizardBody>
      <UpdateExternalUserFooter
        saveCmd={saveCmd}
        onSave={onSubmit}
        accessManagementSelected={accessManagementSelected}
      />
    </>
  );
};

// SectionAccessManagement.defaultProps = defaultProps;

export { SectionAccessManagement };
export default SectionAccessManagement;
