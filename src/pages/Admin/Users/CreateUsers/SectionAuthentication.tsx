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

const SectionAuthentication = (data, onPrev, onNext) => {
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  const handleNext = () => {
    if (!data.firstName.value) setErrorMessage('First name is required');
    else if (!data.lastName.value) setErrorMessage('Last name is required');
    else if (!data.email.value) setErrorMessage('Email is required');
    else onNext();

    return null;
  };

  //   options: [{key: "AccessPolicyGroup",…}, {key: "DashTheme", values: [], __typename: "UIOptions"}]
  // 0: {key: "AccessPolicyGroup",…}
  // key: "AccessPolicyGroup"
  // values: [{label: "Auditor", value: "2", info: null, __typename: "UIOption"},…]
  // 0: {label: "Auditor", value: "2", info: null, __typename: "UIOption"}
  // info: null
  // label: "Auditor"
  // value: "2"
  // __typename: "UIOption"
  // 1: {label: "Organization Admin", value: "3", info: null, __typename: "UIOption"}
  // info: null
  // label: "Organization Admin"
  // value: "3"
  // __typename: "UIOption"
  // __typename: "UIOptions"
  // 1: {key: "DashTheme", values: [], __typename: "UIOptions"}
  // key: "DashTheme"
  // values: []
  // __typename: "UIOptions"

  return (
    <>
      <Spacing margin={{ top: 'normal' }} />
      <Row bottom>
        <Column lg="12">
          <InputText {...data.firstName} />
        </Column>
        <Column lg="12">
          xw
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
      <CreateUsersFooter onPrev={onPrev} onNext={handleNext} errorMessage={errorMessage} />
    </>
  );
};

SectionAuthentication.defaultProps = defaultProps;

export { SectionAuthentication };
export default SectionAuthentication;
