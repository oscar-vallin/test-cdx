import { useState } from 'react';
import { InputText } from 'src/components/inputs/InputText';
import FormLabel from 'src/components/labels/FormLabel';
import { Row, Column } from 'src/components/layouts';
import { Spacing } from 'src/components/spacings/Spacing';

import CreateUsersFooter from './CreateUsersFooter';
import { FormUserType } from './CreateUsersPanel.service';

type SectionAccountProps = {
  form: FormUserType | undefined;
  onNext: () => null;
};

const SectionAccount = ({ form, onNext }: SectionAccountProps) => {
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  const firstNm = form?.account?.fields.find((field) => field.id === 'firstNm') ?? undefined;
  const lastNm = form?.account?.fields.find((field) => field.id === 'lastNm') ?? undefined;
  const email = form?.account?.fields.find((field) => field.id === 'email') ?? undefined;
  const organization = form?.account?.title;

  const handleNext = () => {
    console.log('handleNext');
    return onNext();
  };

  return (
    <>
      <Spacing margin={{ top: 'normal' }} />
      <Row bottom>
        {firstNm?.visible && (
          <Column lg={lastNm?.visible ? '6' : '12'}>
            <InputText {...firstNm} />
          </Column>
        )}
        {lastNm?.visible && (
          <Column lg={firstNm?.visible ? '6' : '12'}>
            <InputText {...lastNm} />
          </Column>
        )}
      </Row>
      <Row bottom>
        {email?.visible && (
          <Column lg="12">
            <InputText {...email} />
          </Column>
        )}
      </Row>

      <Row bottom>
        <Spacing margin={{ top: 'double' }} />
        <FormLabel label={organization?.label} />
      </Row>

      <Row bottom>
        <Column lg="12">{organization?.description}</Column>
      </Row>

      <CreateUsersFooter onNext={handleNext} errorMessage={errorMessage} />
    </>
  );
};

export { SectionAccount };
export default SectionAccount;
