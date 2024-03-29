import { ReactElement } from 'react';
import { Button } from 'src/components/buttons';
import { WizardButtonRow } from 'src/layouts/Panels/Panels.styles';

type AddExternalUsersAccessFooterProps = {
  userSelected?: boolean;
  onNext?: () => void;
  onPrev?: () => void;
  onSubmit?: () => void;
};

const AddExternalUsersAccessFooter = ({
  userSelected = true,
  onNext,
  onPrev,
  onSubmit,
}: AddExternalUsersAccessFooterProps): ReactElement => (
  <WizardButtonRow>
    {onPrev && (
    <span>
      <Button id="__Prev_Button" onClick={onPrev} variant="secondary">
        Previous
      </Button>
    </span>
    )}
    {onNext && (
    <span>
      <Button id="__Next_Button" onClick={onNext} variant="primary" disabled={!userSelected}>
        Next
      </Button>
    </span>
    )}
    {onSubmit && (
    <span>
      <Button id="__Submit_Button" onClick={onSubmit} variant="primary" disabled={!userSelected}>
        Finish and Grant Access
      </Button>
    </span>
    )}
  </WizardButtonRow>
);

export { AddExternalUsersAccessFooter };
export default AddExternalUsersAccessFooter;
