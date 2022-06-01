import { CdxWebCommandType, UserAccountForm } from 'src/data/services/graphql';
import UpdateUserFooter from './UpdateUserFooter';
import { AccessManagementWizardBody } from 'src/pages/Admin/Users/AccessManagementWizardBody';
import { useState } from 'react';
import { getSelectedAccessGroupSids } from 'src/pages/Admin/Users/UserAccountFormUtil';
import { WizardBody } from 'src/layouts/Panels/Panels.styles';

type SectionAccessProps = {
  form?: UserAccountForm;
  onSave: (sids: string[]) => any;
  onFormChange: () => any;
};

const SectionAccessManagement = ({ form, onSave, onFormChange }: SectionAccessProps) => {
  const [selectedSids, setSelectedSids] = useState<string[]>(getSelectedAccessGroupSids(form));

  const saveOptions = (sids: string[]) => {
    setSelectedSids(sids);
    onFormChange();
  };

  const handleSave = () => {
    onSave(selectedSids);
  };

  return (
    <>
      <WizardBody>
        <AccessManagementWizardBody form={form} saveOptions={saveOptions} />
      </WizardBody>
      {form?.commands?.find((cmd) => cmd?.commandType === CdxWebCommandType.Assign) && (
        <UpdateUserFooter onSave={handleSave} />
      )}
    </>
  );
};

export { SectionAccessManagement };
export default SectionAccessManagement;
