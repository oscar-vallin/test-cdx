import { useEffect, useState } from 'react';
import { InputText } from 'src/components/inputs/InputText';
import FormLabel from 'src/components/labels/FormLabel';
import { Row, Column } from 'src/components/layouts';
import { Spacing } from 'src/components/spacings/Spacing';
import { useInputValue } from 'src/hooks/useInputValue';

import CreateUsersFooter from './CreateUsersFooter';
import { FormUserType } from './CreateUsersPanel.service';

type SectionAccountProps = {
  form: FormUserType | undefined;
  onNext: () => null;
  saveOptions: (newForm: FormUserType) => void;
};

const SectionAccount = ({ form, onNext, saveOptions }: SectionAccountProps) => {
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const formFirstName = useInputValue('First Name', '', '', 'text');
  const formLastName = useInputValue('Last Name', '', '', 'text');
  const formEmail = useInputValue('Username / Email', '', '', 'text');

  const [firstNm, setFormFirstName] = useState<any | undefined>();
  const [lastNm, setFormLastName] = useState<any | undefined>();
  const [email, setFormEmail] = useState<any | undefined>();
  const [organization, setOrganization] = useState<any | undefined>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (form) {
      setFormFirstName(form?.account?.fields.find((field) => field.id === 'firstNm') ?? undefined);
      setFormLastName(form?.account?.fields.find((field) => field.id === 'lastNm') ?? undefined);
      setFormEmail(form?.account?.fields.find((field) => field.id === 'email') ?? undefined);
      setOrganization(form?.account?.title ?? '');
      setLoading(false);
    }

    return () => {
      setLoading(true);
      setFormFirstName(undefined);
      setFormLastName(undefined);
      setFormEmail(undefined);
    };
  }, [form]);

  const handleNext = () => {
    const newForm = {
      ...form,
      account: {
        ...form?.account,
        title: organization,
        fields: [
          { ...firstNm, value: formFirstName.value },
          { ...lastNm, value: formLastName.value },
          { ...email, value: formEmail.value },
        ],
      },
    };

    saveOptions(newForm);

    return onNext();
  };

  return (
    <>
      {loading && <> Loading... </>}
      {!loading && (
        <>
          <Spacing margin={{ top: 'normal' }} />
          <Row bottom>
            {firstNm?.visible && (
              <Column lg={lastNm?.visible ? '6' : '12'}>
                <InputText {...firstNm} {...formFirstName} label={firstNm.label} />
              </Column>
            )}
            {lastNm?.visible && (
              <Column lg={firstNm?.visible ? '6' : '12'}>
                <InputText {...lastNm} {...formLastName} label={lastNm.label} />
              </Column>
            )}
          </Row>
          <Row bottom>
            {email?.visible && (
              <Column lg="12">
                <InputText {...email} {...formEmail} label={email.label} />
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
      )}
    </>
  );
};

export { SectionAccount };
export default SectionAccount;
