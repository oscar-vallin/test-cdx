import { UIInputText } from 'src/components/inputs/InputText';
import { Column } from 'src/components/layouts';
import { useFormInputValue } from 'src/hooks/useInputValue';

import { FormRow } from 'src/components/layouts/Row/Row.styles';
import { UserAccount, UserAccountForm } from 'src/data/services/graphql';
import { UIInputTextReadOnly } from 'src/components/inputs/InputText/InputText';
import { WizardBody } from 'src/layouts/Panels/Panels.styles';
import CreateUsersFooter from './CreateUsersFooter';

type SectionAccountProps = {
  form: UserAccountForm;
  onNext: () => void;
  saveOptions: (userAccount: UserAccount) => void;
};

const SectionAccount = ({ form, onNext, saveOptions }: SectionAccountProps) => {
  const formFirstName = useFormInputValue(form.person?.firstNm?.value ?? '');
  const formLastName = useFormInputValue(form.person?.lastNm?.value ?? '');
  const formEmail = useFormInputValue(form.email?.value ?? '');

  const handleNext = () => onNext();

  const saveFields = (firstName: string, lastName: string, email: string) => {
    const user: UserAccount = {
      sid: '',
      email,
      person: {
        sid: '',
        firstNm: firstName,
        lastNm: lastName,
      },
    };
    saveOptions(user);
  };

  return (
    <>
      <WizardBody>
        <FormRow>
          {form.person?.firstNm?.visible && (
            <Column lg={form.person?.lastNm?.visible ? '6' : '12'}>
              <UIInputText
                id="__userFirstNm"
                uiField={form.person?.firstNm}
                value={formFirstName.value}
                onChange={(e, newValue) => {
                  formFirstName.onChange(e);
                  saveFields(newValue ?? '', formLastName.value, formEmail.value);
                }}
              />
            </Column>
          )}
          {form.person?.lastNm?.visible && (
            <Column lg={form.person?.firstNm?.visible ? '6' : '12'}>
              <UIInputText
                id="__userLastNm"
                uiField={form.person?.lastNm}
                value={formLastName.value}
                onChange={(e, newValue) => {
                  formLastName.onChange(e);
                  saveFields(formFirstName.value, newValue ?? '', formEmail.value);
                }}
              />
            </Column>
          )}
        </FormRow>
        <FormRow>
          {form.email?.visible && (
            <Column lg="12">
              <UIInputText
                id="__userEmail"
                uiField={form.email ?? undefined}
                value={formEmail.value}
                onChange={(e, newValue) => {
                  formEmail.onChange(e);
                  saveFields(formFirstName.value, formLastName.value, newValue ?? '');
                }}
              />
            </Column>
          )}
        </FormRow>

        <FormRow>
          <Column lg="12">
            <UIInputTextReadOnly id="__userOrg" uiField={form.organization} />
          </Column>
        </FormRow>
      </WizardBody>
      <CreateUsersFooter onNext={handleNext} />
    </>
  );
};

export { SectionAccount };
export default SectionAccount;
