import { Button } from 'src/components/buttons';
import { Row, Column } from 'src/components/layouts';
import { Text } from 'src/components/typography/Text';

const CreateUsersFooter = (onNext, onPrev, onSubmit, errorMessage) => {
  return (
    <>
      <Row>{errorMessage && <Text>{errorMessage}</Text>}</Row>
      <Row left>
        <Column lg="12">
          <Row>
            {onPrev && (
              <Button onClick={onPrev} variant="secondary">
                Previous
              </Button>
            )}
            {onNext && (
              <Button onClick={onNext} variant="primary">
                Next
              </Button>
            )}
            {onSubmit && (
              <Button onClick={onNext} variant="primary">
                Finish and Create User
              </Button>
            )}
          </Row>
        </Column>
      </Row>
    </>
  );
};

export { CreateUsersFooter };
export default CreateUsersFooter;
