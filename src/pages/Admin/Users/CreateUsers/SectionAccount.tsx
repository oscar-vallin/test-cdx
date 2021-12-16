import { useState } from 'react';
import { InputText } from 'src/components/inputs/InputText';
import FormLabel from 'src/components/labels/FormLabel';
import { Row, Column } from 'src/components/layouts';
import { Spacing } from 'src/components/spacings/Spacing';

import CreateUsersFooter from './CreateUsersFooter';

const defaultProps = {
  firstName: '',
  lastName: '',
  email: '',
};

const SectionAccount = ({ form, data, onNext }) => {
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  const { firstNm, lastNm } = form?.person ?? {};
  const { email } = form;
  const { organization } = form;

  console.log('🚀 ~ file: SectionAccount.tsx ~ line 17 ~ SectionAccount ~ lastNm', lastNm);
  console.log('🚀 ~ file: SectionAccount.tsx ~ line 17 ~ SectionAccount ~ firstNm', firstNm);
  console.log('🚀 ~ file: SectionAccount.tsx ~ line 20 ~ SectionAccount ~ email', email);

  const handleNext = () => {
    if (!data.firstName.value) setErrorMessage('First name is required');
    else if (!data.lastName.value) setErrorMessage('Last name is required');
    else if (!data.email.value) setErrorMessage('Email is required');
    else onNext();
  };

  // rCode: null;
  // errMsg: null;
  // errSeverity: null;
  // info: null;
  // label: 'First Name';
  // max: 255;
  // min: 0;
  // readOnly: false;
  // required: true;
  // value: null;
  // visible;

  //   minLength={policyForm.name?.min}
  // maxLength={policyForm.name?.max}
  // value={state.policyName}
  // required={policyForm.name?.required}
  // onChange={({ target }) => setState({ ...state, policyName: target.value })}
  // errorMessage={createdPolicy?.createAccessPolicy?.response === 'FAIL' ? 'Required field' : ''}

  return (
    <>
      <Spacing margin={{ top: 'normal' }} />
      <Row bottom>
        {firstNm?.visible && (
          <Column lg={lastNm.visible ? '6' : '12'}>
            <InputText
              {...data.firstName}
              label={firstNm.label}
              minLength={firstNm.min}
              maxLength={firstNm.max}
              required={firstNm.required}
              disabled={firstNm.readOnly}
              info={firstNm.info}
              errorMessage={data.firstName?.value?.length === 0 && firstNm.errorMessage}
            />
          </Column>
        )}
        {lastNm?.visible && (
          <Column lg={firstNm.visible ? '6' : '12'}>
            <InputText
              {...data.lastName}
              label={lastNm.label}
              minLength={lastNm.min}
              maxLength={lastNm.max}
              required={lastNm.required}
              disabled={lastNm.readOnly}
              info={lastNm.info}
            />
          </Column>
        )}
      </Row>
      <Row bottom>
        {email?.visible && (
          <Column lg="12">
            <InputText
              {...data.email}
              label={email.label}
              minLength={email.min}
              maxLength={email.max}
              required={email.required}
              disabled={email.readOnly}
              info={email.info}
            />
          </Column>
        )}
      </Row>

      <Row bottom>
        <Spacing margin={{ top: 'double' }} />
        <FormLabel label={organization.label} />
      </Row>

      <Row bottom>
        <Column lg="12">{organization.description}</Column>
      </Row>

      <CreateUsersFooter onNext={handleNext} errorMessage={errorMessage} />
    </>
  );
};

SectionAccount.defaultProps = defaultProps;

export { SectionAccount };
export default SectionAccount;
