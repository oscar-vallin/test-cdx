import { UIInputText } from 'src/components/inputs/InputText';
import { Column } from 'src/components/layouts';
import { useFormInputValue } from 'src/hooks/useInputValue';

import { FormRow } from 'src/components/layouts/Row/Row.styles';
import UpdateUserFooter from './UpdateUserFooter';
import { UserAccount, UserAccountForm } from 'src/data/services/graphql';
import { UIInputTextReadOnly } from 'src/components/inputs/InputText/InputText';
import { WizardBody } from "src/layouts/Panels/Panels.styles";

type SectionAccountProps = {
  form: UserAccountForm;
  onSave: (userAccount: UserAccount) => any;
};

const SectionAccount = ({ form, onSave }: SectionAccountProps) => {
  const formFirstName = useFormInputValue(form.person?.firstNm?.value ?? '');
  const formLastName = useFormInputValue(form.person?.lastNm?.value ?? '');
  const formEmail = useFormInputValue(form.email?.value ?? '');

  const handleSave = () => {
    const user: UserAccount = {
      sid: '',
      email: formEmail.value,
      person: {
        sid: '',
        firstNm: formFirstName.value,
        lastNm: formLastName.value,
      },
    };
    onSave(user);
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
        {form.lastLogin ?
          <FormRow>
            <Column lg="12">
              <UIInputTextReadOnly uiField={form.lastLogin } />
            </Column>
          </FormRow> : ''
        }
      </WizardBody>
      <UpdateUserFooter onSave={handleSave} />
    </>
  );
};

export { SectionAccount };
export default SectionAccount;
