import { UIInputText } from 'src/components/inputs/InputText';
import { Column } from 'src/components/layouts';
import { useFormInputValue } from 'src/hooks/useInputValue';
import { ITag } from '@fluentui/react';
import { FormRow } from 'src/components/layouts/Row/Row.styles';
import { UserAccount, UserAccountForm } from 'src/data/services/graphql';
import { WizardBody } from 'src/layouts/Panels/Panels.styles';
import AddExternalUsersAccessFooter from './AddExternalUsersAccessFooter';
import { TagPicker } from 'src/components/inputs/TagPicker';
import { FormLabel } from 'src/components/labels/FormLabel';

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
  const getSelectedUser = ()=>{
    let user: any[] = []
    if(form?.person?.sid){
      user = [{ 
        name: form?.email?.value ?? '',
        key: form?.person?.sid ?? '', 
        email: form?.email?.value ?? '',
        firstName: form?.person?.firstNm?.value ?? '',
        lastName: form?.person?.lastNm?.value ?? '',
      }]
    }

    return user
  }
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
              itemLimit={1}
              id="__ExternalUsersPicker"
              defaultSelectedItems={getSelectedUser()}
              doSearch={(searchText) => searchExternalUsers(searchText)}
              onChange={(item) => {
                const selectedItem: any = item;
                if(selectedItem.length>0){
                  saveFields(selectedItem[0].firstName ?? '', selectedItem[0].lastName ?? '', selectedItem[0].email ?? '', selectedItem[0].key ?? '')
                }else{                  
                  saveOptions({
                    sid: '',
                    email: '',
                    person: {
                      sid:  '',
                      firstNm: '',
                      lastNm: '',
                    },
                  });
                }
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
