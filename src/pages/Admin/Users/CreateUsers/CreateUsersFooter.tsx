import { ReactElement } from 'react';
import { Button } from 'src/components/buttons';
import { Row, Column } from 'src/components/layouts';
import { Text } from 'src/components/typography/Text';

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
      <Row left>
        <Column lg="12">
          <Row>
            {onPrev && (
              <Column lg="3">
                <Button onClick={onPrev} variant="secondary">
                  Previous
                </Button>
              </Column>
            )}
            {onNext && (
              <Column lg="3">
                <Button onClick={onNext} variant="primary">
                  Next
                </Button>
              </Column>
            )}
            {onSubmit && (
              <Column lg="3">
                <Button onClick={onSubmit} variant="primary">
                  Finish and Create User
                </Button>
              </Column>
            )}
          </Row>
        </Column>
      </Row>
    </>
  );
};

export { CreateUsersFooter };
export default CreateUsersFooter;
