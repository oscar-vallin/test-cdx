import { useEffect, useState } from 'react';

import { FormRow } from 'src/components/layouts/Row/Row.styles';
import { UICheckboxList } from 'src/components/inputs/CheckboxList';
import { Column } from 'src/components/layouts';
import { CdxWebCommandType, Maybe, UiOption, UserAccountForm } from 'src/data/services/graphql';
import { WizardBody } from 'src/layouts/Panels/Panels.styles';
import UpdateUserFooter from './UpdateUserFooter';

type SectionAccessProps = {
  form?: UserAccountForm;
  onSave: (sids: string[]) => any;
  onFormChange: () => any;
};

const SectionAccessManagement = ({ form, onSave, onFormChange }: SectionAccessProps) => {
  const getAccessGroupOptions = (userAccountForm?: UserAccountForm): UiOption[] => {
    const formOpts: Maybe<UiOption>[] =
      userAccountForm?.options?.find((itm) => {
        return itm?.key === userAccountForm?.accessPolicyGroups?.options;
      })?.values ?? [];

    const groupOpts: UiOption[] = [];
    formOpts.forEach((opt) => {
      if (opt) {
        groupOpts.push({
          ...opt,
        });
      }
    });
    return groupOpts;
  };

  const getSelectedAccessGroupSids = (userAccountForm?: UserAccountForm): string[] => {
    return (
      userAccountForm?.accessPolicyGroups?.value
        ?.filter((grp) => grp && grp.value)
        ?.map((grp) => {
          return grp?.value || '';
        }) ?? []
    );
  };

  const getOrganizationSpeficGroups=( groupOptions)=>{
    const orgSpecificGroupOptions = groupOptions.filter((g)=>g.category==="Organization specific groups");
    return orgSpecificGroupOptions;
  }
  
  const getSystemManagedGroups=( groupOptions)=>{
    const systemManagedGroupOptions = groupOptions.filter((g)=>g.category==="System managed groups");
    return systemManagedGroupOptions;
  }

  const [selectedSids, setSelectedSids] = useState<string[]>(getSelectedAccessGroupSids(form));
  const [groupOptions, setGroupOptions] = useState<UiOption[]>(getAccessGroupOptions(form));
  const [orgSpecificGroupOptions, setOrgSpecificGroupOptions] = useState<UiOption[]>(getOrganizationSpeficGroups(groupOptions))
  const [systemManagedGroupOptions, setSystemManagedGroupOptions] = useState<UiOption[]>(getSystemManagedGroups(groupOptions))

  useEffect(() => {
    if (form) {
      setSelectedSids(getSelectedAccessGroupSids(form));
      setGroupOptions(getAccessGroupOptions(form));
      setOrgSpecificGroupOptions(getOrganizationSpeficGroups(groupOptions))
      setSystemManagedGroupOptions(getSystemManagedGroups(groupOptions))
    }
  }, [form]);

  const handleSave = () => {
    onSave(selectedSids);
  };

 
  return (
    <>
      <WizardBody>
        <FormRow>
          <Column lg="12">
            <UICheckboxList
              id="__Access_Groups_List"
              subtitle='System managed groups'
              uiField={form?.accessPolicyGroups ?? undefined}
              options={systemManagedGroupOptions}
              value={selectedSids}
              onChange={(sids) => {
                onFormChange();
                setSelectedSids(sids);
              }}
              emptyMessage="No configured Access Policy Groups"
              formatTooltip
            />
          </Column>
          {(orgSpecificGroupOptions && orgSpecificGroupOptions.length) ? (
            <Column lg="12">
              <UICheckboxList
                hideLabel
                subtitle='Organization specific groups'
                id="__Access_Groups_List"
                uiField={form?.accessPolicyGroups ?? undefined}
                options={orgSpecificGroupOptions}
                value={selectedSids}
                onChange={(sids) => {
                  onFormChange();
                  setSelectedSids(sids);
                }}
                emptyMessage="No configured Access Policy Groups"
                formatTooltip
              />
            </Column>
          ): null}
        </FormRow>
      </WizardBody>
      {form?.commands?.find((cmd) => cmd?.commandType === CdxWebCommandType.Assign) && (
        <UpdateUserFooter onSave={handleSave} />
      )}
    </>
  );
};

export { SectionAccessManagement };
export default SectionAccessManagement;
