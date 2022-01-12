import { ReactElement } from 'react';
import { Button } from 'src/components/buttons';
import { WizardButtonRow } from 'src/layouts/Panels/Panels.styles';

type UpdateUserFooterProps = {
  onSave: () => any;
};

const UpdateUserFooter = ({ onSave }: UpdateUserFooterProps): ReactElement => {
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

export { UpdateUserFooter };
export default UpdateUserFooter;
