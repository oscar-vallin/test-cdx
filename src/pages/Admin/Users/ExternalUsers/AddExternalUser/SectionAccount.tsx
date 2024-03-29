import { UIInputText } from 'src/components/inputs/InputText';
import { Column } from 'src/components/layouts';
import { useFormInputValue } from 'src/hooks/useInputValue';
import { FormRow } from 'src/components/layouts/Row/Row.styles';
import { ButtonLink } from 'src/components/buttons';
import { UserAccount, UserAccountForm, CdxWebCommandType } from 'src/data/services/graphql';
import { WizardBody } from 'src/layouts/Panels/Panels.styles';
import { TagPicker } from 'src/components/inputs/TagPicker';
import { FormLabel } from 'src/components/labels/FormLabel';
import { Text } from 'src/components/typography/Text';
import { Spacing } from 'src/components/spacings/Spacing';
import { useState } from 'react';
import { UIInputCheck } from 'src/components/inputs/InputCheck';
import { MenuSeparator } from './AddExternalUsersAccessPanel.styles';
import AddExternalUsersAccessFooter from './AddExternalUsersAccessFooter';

type SectionAccountProps = {
  form: UserAccountForm;
  onNext: () => void;
  saveOptions: (userAccount: UserAccount) => void;
  saveActivationEmailOptions: (sendActivationEmail: boolean) => void;
  searchExternalUsers: any;
  userSelected: boolean;
  setUserSelected: (boolean) => void;
  createExternalUser: boolean;
  setCreateExternalUser: (boolean) => void;
};

const SectionAccount = ({
  form,
  onNext,
  saveOptions,
  saveActivationEmailOptions,
  searchExternalUsers,
  userSelected,
  setUserSelected,
  createExternalUser,
  setCreateExternalUser,
}: SectionAccountProps) => {
  const formFirstName = useFormInputValue(form.person?.firstNm?.value ?? '');
  const formLastName = useFormInputValue(form.person?.lastNm?.value ?? '');
  const formEmail = useFormInputValue(form.email?.value ?? '');
  const [sendEmail, setSendEmail] = useState<boolean>(form.sendActivationEmail?.value ?? true);
  const creatUserCmd = form?.commands?.find((cmd) => cmd.commandType === CdxWebCommandType.Create);

  const handleNext = () => onNext();

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

  const handleNoResultsFound = () => (
    <Spacing id="__noResultsFound-Container" margin="normal">
      <FormRow>
        <Text id="__noResultsFound-Label" size="small">
          No matching account found
        </Text>
      </FormRow>
      {creatUserCmd && (
      <FormRow>
        <ButtonLink
          id="__noResultsFound-Link"
          onClick={() => {
            setUserSelected(true);
            setCreateExternalUser(true);
          }}
        >
          Add a new account
        </ButtonLink>
      </FormRow>
      )}
    </Spacing>
  );

  const onCheck = () => {
    const toggle = !sendEmail;
    setSendEmail(toggle);
    saveActivationEmailOptions(toggle);
  };

  return (
    <>
      <WizardBody>
        <FormRow>
          <Column lg="12">
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
                  setUserSelected(true);
                  saveFields(
                    selectedItem[0].firstName ?? '',
                    selectedItem[0].lastName ?? '',
                    selectedItem[0].email ?? '',
                    selectedItem[0].key ?? '',
                  );
                } else {
                  setUserSelected(false);
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
                <Column sm="4" lg="4">
                  <MenuSeparator />
                </Column>
                <Column sm="3" lg="3">
                  <Text center="true">New Account</Text>
                </Column>
                <Column sm="4" lg="4">
                  <MenuSeparator />
                </Column>
              </FormRow>
            </Spacing>
            <FormRow>
              {form.person?.firstNm?.visible && (
                <Column lg="12">
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
                <Column lg="12">
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
                  <UIInputCheck
                    id="__userSendActivation"
                    uiField={form?.sendActivationEmail}
                    value={sendEmail}
                    onChange={onCheck}
                  />
                </Column>
              )}
            </FormRow>
          </>
        )}
      </WizardBody>
      <AddExternalUsersAccessFooter userSelected={userSelected} onNext={handleNext} />
    </>
  );
};

export { SectionAccount };
