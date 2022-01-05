import { ReactElement } from 'react';
import { Button } from 'src/components/buttons';
import { Row } from 'src/components/layouts';
import { Text } from 'src/components/typography/Text';
import { WizardButtonRow } from './CreateUsersPanel.styles';

type CreateUsersFooterProps = {
  onNext?: () => null;
  onPrev?: () => null;
  onSubmit?: () => null;
  errorMessage?: string;
};

const CreateUsersFooter = ({ onNext, onPrev, onSubmit, errorMessage }: CreateUsersFooterProps): ReactElement => {
  return (
    <>
      <Row>{errorMessage && <Text>{errorMessage}</Text>}</Row>
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
            <Button id="__Next_Button" onClick={onNext} variant="primary">
              Next
            </Button>
          </span>
        )}
        {onSubmit && (
          <span>
            <Button id="__Submit_Button" onClick={onSubmit} variant="primary">
              Finish and Create User
            </Button>
          </span>
        )}
      </WizardButtonRow>
    </>
  );
};

export { CreateUsersFooter };
export default CreateUsersFooter;
