import { UIInputText } from 'src/components/inputs/InputText';
import { Column } from 'src/components/layouts';
import { useFormInputValue } from 'src/hooks/useInputValue';
import { Link, Checkbox } from '@fluentui/react';
import { FormRow } from 'src/components/layouts/Row/Row.styles';
import { UserAccount, UserAccountForm } from 'src/data/services/graphql';
import { WizardBody } from 'src/layouts/Panels/Panels.styles';
import AddExternalUsersAccessFooter from './AddExternalUsersAccessFooter';
import { TagPicker } from 'src/components/inputs/TagPicker';
import { FormLabel } from 'src/components/labels/FormLabel';
import { Text } from 'src/components/typography/Text';
import { Spacing } from 'src/components/spacings/Spacing';
import { MenuSeparator } from './AddExternalUsersAccessPanel.styles';
import { useState } from 'react';
import { CdxWebCommandType } from 'src/data/services/graphql';

type SectionAccountProps = {
  form: UserAccountForm;
  onNext: () => null;
  saveOptions: (userAccount: UserAccount) => void;
  saveActivationEmailOptions: (sendActivationEmail: boolean) => void;
  searchExternalUsers: any;
  createExternalUser: boolean;
  setCreateExternalUser: (boolean) => void;
};

const SectionAccount = ({
  form,
  onNext,
  saveOptions,
  saveActivationEmailOptions,
  searchExternalUsers,
  createExternalUser,
  setCreateExternalUser,
}: SectionAccountProps) => {
  const formFirstName = useFormInputValue(form.person?.firstNm?.value ?? '');
  const formLastName = useFormInputValue(form.person?.lastNm?.value ?? '');
  const formEmail = useFormInputValue(form.email?.value ?? '');
  const [sendEmail, setSendEmail] = useState<boolean>(form.sendActivationEmail?.value ?? true);
  const creatUserCmd = form?.commands?.find((cmd) => cmd.commandType === CdxWebCommandType.Create);

  const handleNext = () => {
    return onNext();
  };

  const saveFields = (firstName: string, lastName: string, email: string, sid?: string) => {
    const user: UserAccount = {
      sid: sid ?? '',
      email,
      person: {
        sid: sid ?? '',
        firstNm: firstName,
        lastNm: lastName,
      },
    };
    saveOptions(user);
  };

  const getSelectedUser = () => {
    let user: any[] = [];
    if (form?.person?.sid) {
      user = [
        {
          name: form?.email?.value ?? '',
          key: form?.person?.sid ?? '',
          email: form?.email?.value ?? '',
          firstName: form?.person?.firstNm?.value ?? '',
          lastName: form?.person?.lastNm?.value ?? '',
        },
      ];
    }

    return user;
  };

  const handleNoResultsFound = () => {
    return (
      <Spacing id={`__noResultsFound-Container`} margin="normal">
        <FormRow>
          <Text id={`__noResultsFound-Label`} size="small">
            No matching account found
          </Text>
        </FormRow>
        {creatUserCmd && (
          <FormRow>
            <Link
              id={`__noResultsFound-Link`}
              onClick={() => {
                setCreateExternalUser(true);
              }}
            >
              Add a new account
            </Link>
          </FormRow>
        )}
      </Spacing>
    );
  };

  const onCheck = () => {
    const toggle = !sendEmail;
    setSendEmail(toggle);
    saveActivationEmailOptions(toggle);
  };

  return (
    <>
      <WizardBody>
        <FormRow>
          <Column lg={'12'}>
            <FormLabel
              id="findExtrernalUsers-Input-Label"
              label="Search for and external user by email to grant them access to this organization"
            />
            <TagPicker
              itemLimit={1}
              id="__ExternalUsersPicker"
              defaultSelectedItems={getSelectedUser()}
              pickerProps={{
                suggestionsHeaderText: null,
                loadingText: 'Searching...',
                searchingText: 'Searching...',
                onRenderNoResultFound: handleNoResultsFound,
              }}
              doSearch={(searchText) => searchExternalUsers(searchText)}
              onChange={(item) => {
                setCreateExternalUser(false);
                const selectedItem: any = item;
                if (selectedItem.length > 0) {
                  saveFields(
                    selectedItem[0].firstName ?? '',
                    selectedItem[0].lastName ?? '',
                    selectedItem[0].email ?? '',
                    selectedItem[0].key ?? ''
                  );
                } else {
                  saveOptions({
                    sid: '',
                    email: '',
                    person: {
                      sid: '',
                      firstNm: '',
                      lastNm: '',
                    },
                  });
                }
              }}
            />
          </Column>
        </FormRow>
        {createExternalUser && (
          <>
            <Spacing margin={{ top: 'double', bottom: 'normal' }}>
              <FormRow style={{ justifyContent: 'center' }}>
                <Column sm={'4'} lg={'4'}>
                  <MenuSeparator />
                </Column>
                <Column sm={'3'} lg={'3'}>
                  <Text center="true">New Account</Text>
                </Column>
                <Column sm={'4'} lg={'4'}>
                  <MenuSeparator />
                </Column>
              </FormRow>
            </Spacing>
            <FormRow>
              {form.person?.firstNm?.visible && (
                <Column lg={'12'}>
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
            </FormRow>
            <FormRow>
              {form.person?.lastNm?.visible && (
                <Column lg={'12'}>
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
              {form.sendActivationEmail?.visible && (
                <Column lg="12">
                  <Checkbox
                    id="__userSendActivation"
                    label={form?.sendActivationEmail?.label}
                    checked={sendEmail}
                    onChange={onCheck}
                  />
                </Column>
              )}
            </FormRow>
          </>
        )}
      </WizardBody>
      <AddExternalUsersAccessFooter onNext={handleNext} />
    </>
  );
};

export { SectionAccount };
export default SectionAccount;
