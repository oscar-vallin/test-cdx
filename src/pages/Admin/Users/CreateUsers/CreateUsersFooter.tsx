import { Button } from 'src/components/buttons';
import { Row, Column } from 'src/components/layouts';
import { Spacing } from 'src/components/spacings/Spacing';
import { Text } from 'src/components/typography/Text';

const CreateUsersFooter = (onNext, onPrev, onSubmit, errorMessage) => {
  return (
    <>
      <Spacing margin={{ top: 'double' }} />
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
                <Button onClick={onNext} variant="primary">
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
