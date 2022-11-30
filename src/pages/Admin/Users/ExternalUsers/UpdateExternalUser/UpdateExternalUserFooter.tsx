import { ReactElement } from 'react';
import { Button } from 'src/components/buttons';
import { WizardButtonRow } from 'src/layouts/Panels/Panels.styles';
import { WebCommand } from 'src/data/services/graphql';

type UpdateExternalUserFooterProps = {
  saveCmd?: WebCommand;
  accessManagementSelected?: boolean;
  onSave: () => void;
};

const UpdateExternalUserFooter = ({
  saveCmd,
  onSave,
  accessManagementSelected,
}: UpdateExternalUserFooterProps): ReactElement => (
  <WizardButtonRow>
    {saveCmd && (
    <span>
      <Button id="__User_Save_Button" onClick={onSave} variant="primary" disabled={!accessManagementSelected}>
        Save
      </Button>
    </span>
    )}
  </WizardButtonRow>
);

export { UpdateExternalUserFooter };
export default UpdateExternalUserFooter;
