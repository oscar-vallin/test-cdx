import { useState } from 'react';
import { InputText } from 'src/components/inputs/InputText';
import { Row, Column } from 'src/components/layouts';
import { Spacing } from 'src/components/spacings/Spacing';

import CreateUsersFooter from './CreateUsersFooter';

const defaultProps = {
  firstName: '',
  lastName: '',
  email: '',
};

const SectionAccessManagement = ({ form, data, onPrev, onNext }) => {
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  const handlePrev = () => {
    onPrev();

    return null;
  };

  const handleNext = () => {
    onNext();

    return null;
  };

  return (
    <>
      <Spacing margin={{ top: 'normal' }} />
      <Row bottom>
        <Column lg="12">
          <InputText {...data.firstName} />
        </Column>
        <Column lg="12">
          <InputText {...data.lastName} />
        </Column>
      </Row>
      <Row bottom>
        <Column lg="12">
          <InputText {...data.email} />
        </Column>
      </Row>
      <Row bottom>
        <Column lg="12">Primary Organization</Column>
      </Row>
      <CreateUsersFooter onPrev={handlePrev} onNext={handleNext} errorMessage={errorMessage} />
    </>
  );
};

SectionAccessManagement.defaultProps = defaultProps;

export { SectionAccessManagement };
export default SectionAccessManagement;
