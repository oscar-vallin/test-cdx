import { useEffect, useState } from 'react';
import { UiOption, UserAccountForm } from 'src/data/services/graphql';
import { FormRow } from 'src/components/layouts/Row/Row.styles';
import { Column } from 'src/components/layouts';
import { UICheckboxList } from 'src/components/inputs/CheckboxList';
import {
  getAccessGroupOptions,
  getOrganizationSpecificGroups,
  getSelectedAccessGroupSids,
  getSystemManagedGroups,
} from 'src/pages/Admin/Users/UserAccountFormUtil';

type AccessManagementWizardBodyType = {
  form?: UserAccountForm;
  saveOptions: (sids: string[]) => void;
};

export const AccessManagementWizardBody = ({ form, saveOptions }: AccessManagementWizardBodyType) => {
  const [selectedSids, setSelectedSids] = useState<string[]>(getSelectedAccessGroupSids(form));
  const [groupOptions, setGroupOptions] = useState<UiOption[]>(getAccessGroupOptions(form));
  const [orgSpecificGroupOptions, setOrgSpecificGroupOptions] = useState<UiOption[]>(
    getOrganizationSpecificGroups(groupOptions),
  );
  const [systemManagedGroupOptions, setSystemManagedGroupOptions] = useState<UiOption[]>(
    getSystemManagedGroups(groupOptions),
  );

  useEffect(() => {
    if (form) {
      setSelectedSids(getSelectedAccessGroupSids(form));
      setGroupOptions(getAccessGroupOptions(form));
      setOrgSpecificGroupOptions(getOrganizationSpecificGroups(groupOptions));
      setSystemManagedGroupOptions(getSystemManagedGroups(groupOptions));
    }
  }, [form]);

  return (
    <FormRow>
      <Column lg="12">
        <UICheckboxList
          id="__System_Access_Groups_List"
          subtitle="System managed groups"
          uiField={form?.accessPolicyGroups ?? undefined}
          options={systemManagedGroupOptions}
          value={selectedSids}
          onChange={saveOptions}
          emptyMessage="No configured Access Policy Groups"
          formatTooltip
        />
      </Column>
      {orgSpecificGroupOptions && orgSpecificGroupOptions.length ? (
        <Column lg="12">
          <UICheckboxList
            id="__Org_Access_Groups_List"
            hideLabel
            subtitle="Organization specific groups"
            uiField={form?.accessPolicyGroups ?? undefined}
            options={orgSpecificGroupOptions}
            value={selectedSids}
            onChange={saveOptions}
            emptyMessage="No configured Access Policy Groups"
            formatTooltip
          />
        </Column>
      ) : null}
    </FormRow>
  );
};
