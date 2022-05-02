import { ReactElement } from 'react';
import { Button } from 'src/components/buttons';
import { WizardButtonRow } from 'src/layouts/Panels/Panels.styles';

type UpdateExternalUserFooterProps = {
  onSave: () => any;
};

const UpdateExternalUserFooter = ({ onSave }: UpdateExternalUserFooterProps): ReactElement => {
  return (
    <WizardButtonRow>
      <span>
        <Button id="__User_Save_Button" onClick={onSave} variant="primary">
          Save
        </Button>
      </span>
    </WizardButtonRow>
  );
};

export { UpdateExternalUserFooter };
export default UpdateExternalUserFooter;
