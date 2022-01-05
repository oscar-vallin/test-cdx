import { UIInputText } from 'src/components/inputs/InputText';
import { Column } from 'src/components/layouts';
import { useFormInputValue } from 'src/hooks/useInputValue';

import { FormRow } from 'src/components/layouts/Row/Row.styles';
import CreateUsersFooter from './CreateUsersFooter';
import { WizardBody } from './CreateUsersPanel.styles';
import { UserAccount, UserAccountForm } from '../../../../data/services/graphql';
import { UIInputTextReadOnly } from '../../../../components/inputs/InputText/InputText';

type SectionAccountProps = {
  form: UserAccountForm;
  onNext: () => null;
  saveOptions: (userAccount: UserAccount) => void;
};

const SectionAccount = ({ form, onNext, saveOptions }: SectionAccountProps) => {
  const formFirstName = useFormInputValue(form.person?.firstNm?.value ?? '');
  const formLastName = useFormInputValue(form.person?.lastNm?.value ?? '');
  const formEmail = useFormInputValue(form.email?.value ?? '');

  const handleNext = () => {
    const user: UserAccount = {
      sid: '',
      email: formEmail.value,
      person: {
        sid: '',
        firstNm: formFirstName.value,
        lastNm: formLastName.value,
      },
    };
    saveOptions(user);

    return onNext();
  };

  return (
    <>
      <WizardBody>
        <FormRow>
          {form.person?.firstNm?.visible && (
            <Column lg={form.person?.lastNm?.visible ? '6' : '12'}>
              <UIInputText uiStringField={form.person?.firstNm} {...formFirstName} />
            </Column>
          )}
          {form.person?.lastNm?.visible && (
            <Column lg={form.person?.firstNm?.visible ? '6' : '12'}>
              <UIInputText uiStringField={form.person?.lastNm} {...formLastName} />
            </Column>
          )}
        </FormRow>
        <FormRow>
          {form.email?.visible && (
            <Column lg="12">
              <UIInputText uiStringField={form.email ?? undefined} {...formEmail} />
            </Column>
          )}
        </FormRow>

        <FormRow>
          <Column lg="12">
            <UIInputTextReadOnly uiField={form.organization} />
          </Column>
        </FormRow>
      </WizardBody>
      <CreateUsersFooter onNext={handleNext} />
    </>
  );
};

export { SectionAccount };
export default SectionAccount;
