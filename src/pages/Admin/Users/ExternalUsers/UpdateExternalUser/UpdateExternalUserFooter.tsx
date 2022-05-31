import { ReactElement } from 'react';
import { Button } from 'src/components/buttons';
import { WizardButtonRow } from 'src/layouts/Panels/Panels.styles';
import { WebCommand } from 'src/data/services/graphql';

type UpdateExternalUserFooterProps = {
  saveCmd?: WebCommand;
  onSave: () => any;
};

const UpdateExternalUserFooter = ({ saveCmd, onSave }: UpdateExternalUserFooterProps): ReactElement => {
  return (
    <WizardButtonRow>
      { saveCmd && (
        <span>
          <Button id="__User_Save_Button" onClick={onSave} variant="primary">
            Save
          </Button>
        </span>
      )}
    </WizardButtonRow>
  );
};

export { UpdateExternalUserFooter };
export default UpdateExternalUserFooter;
