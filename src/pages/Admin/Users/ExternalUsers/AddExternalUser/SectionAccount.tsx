import { UIInputText } from 'src/components/inputs/InputText';
import { Column } from 'src/components/layouts';
import { useFormInputValue } from 'src/hooks/useInputValue';

import { FormRow } from 'src/components/layouts/Row/Row.styles';
import { UserAccount, UserAccountForm } from 'src/data/services/graphql';
import { UIInputTextReadOnly } from 'src/components/inputs/InputText/InputText';
import { WizardBody } from 'src/layouts/Panels/Panels.styles';
import AddExternalUsersAccessFooter from './AddExternalUsersAccessFooter';
import { TagPicker } from 'src/components/inputs/TagPicker';
import { FormLabel } from 'src/components/labels/FormLabel';
import { useState } from 'react';

type SectionAccountProps = {
  form: UserAccountForm;
  onNext: () => null;
  saveOptions: (userAccount: UserAccount) => void;
  searchExternalUsers: any;
  showCreateExternalUserForm: boolean;
};

const SectionAccount = ({ form, onNext, saveOptions, searchExternalUsers, showCreateExternalUserForm}: SectionAccountProps) => {
  const formFirstName = useFormInputValue(form.person?.firstNm?.value ?? '');
  const formLastName = useFormInputValue(form.person?.lastNm?.value ?? '');
  const formEmail = useFormInputValue(form.email?.value ?? '');

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

  return (
    <>
      <WizardBody>        
        <FormRow>
          <Column lg={'12'}>
            <FormLabel
              id='findExtrernalUsers-Input-Label'
              label='Search for and external user by email to grant them access to this organization'
              />   
            <TagPicker
              id="__ExternalUsersPicker"              
              doSearch={(searchText) => searchExternalUsers(searchText)}
              onChange={(item) => {
                const selectedItem: any = item;
                if(selectedItem.length>0)
                  saveFields(selectedItem[0].firstName ?? '', selectedItem[0].lastName ?? '', selectedItem[0].email ?? '', selectedItem[0].key ?? '')
              }}
            />
          </Column>
        </FormRow>
        { showCreateExternalUserForm && ( 
          <>
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
          </>
        )}
      </WizardBody>
      <AddExternalUsersAccessFooter onNext={handleNext} />
    </>
  );
};

export { SectionAccount };
export default SectionAccount;
