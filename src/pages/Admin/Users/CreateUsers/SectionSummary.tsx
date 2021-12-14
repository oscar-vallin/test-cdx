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

const SectionSummary = (data, onNext) => {
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  const handleNext = () => {
    if (!data.firstName.value) setErrorMessage('First name is required');
    else if (!data.lastName.value) setErrorMessage('Last name is required');
    else if (!data.email.value) setErrorMessage('Email is required');
    else onNext();
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
      <CreateUsersFooter onNext={handleNext} errorMessage={errorMessage} />
    </>
  );
};

SectionSummary.defaultProps = defaultProps;

export { SectionSummary };
export default SectionSummary;
