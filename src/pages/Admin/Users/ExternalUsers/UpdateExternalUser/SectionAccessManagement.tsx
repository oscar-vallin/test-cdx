import { useEffect, useState } from 'react';

import { FormRow } from 'src/components/layouts/Row/Row.styles';
import { UICheckboxList } from 'src/components/inputs/CheckboxList';
import { Column } from 'src/components/layouts';
import { Maybe, UiOption, UserAccountForm } from 'src/data/services/graphql';
import { WizardBody } from 'src/layouts/Panels/Panels.styles';
import { UpdateExternalUserFooter } from './UpdateExternalUserFooter';

type SectionAccessProps = {
  form?: UserAccountForm;
  onSubmit: () => any;
  saveOptions: (sids: string[]) => void;
};

const SectionAccessManagement = ({ form, onSubmit, saveOptions }: SectionAccessProps) => {
  const getAccessGroupOptions = (form?: UserAccountForm): UiOption[] => {
    const formOpts: Maybe<UiOption>[] =
      form?.options?.find((itm) => {
        return itm?.key == form?.accessPolicyGroups?.options;
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

  const getSelectedAccessGroupSids = (form?: UserAccountForm): string[] => {
    return (
      form?.accessPolicyGroups?.value
        ?.filter((grp) => grp && grp.value)
        ?.map((grp) => {
          return grp?.value || '';
        }) ?? []
    );
  };

  const getOrganizationSpeficGroups = (groupOptions) => {
    const orgSpecificGroupOptions = groupOptions.filter((g) => g.category === 'Organization specific groups');
    return orgSpecificGroupOptions;
  };

  const getSystemManagedGroups = (groupOptions) => {
    const systemManagedGroupOptions = groupOptions.filter((g) => g.category === 'System managed groups');
    return systemManagedGroupOptions;
  };

  const [selectedSids, setSelectedSids] = useState<string[]>(getSelectedAccessGroupSids(form));
  const [groupOptions, setGroupOptions] = useState<UiOption[]>(getAccessGroupOptions(form));
  const [orgSpecificGroupOptions, setOrgSpecificGroupOptions] = useState<UiOption[]>(
    getOrganizationSpeficGroups(groupOptions)
  );
  const [systemManagedGroupOptions, setSystemManagedGroupOptions] = useState<UiOption[]>(
    getSystemManagedGroups(groupOptions)
  );

  useEffect(() => {
    if (form) {
      setSelectedSids(getSelectedAccessGroupSids(form));
      setGroupOptions(getAccessGroupOptions(form));
      setOrgSpecificGroupOptions(getOrganizationSpeficGroups(groupOptions));
      setSystemManagedGroupOptions(getSystemManagedGroups(groupOptions));
    }
  }, [form]);

  const onChange = (selectedSids: string[]) => {
    setSelectedSids(selectedSids);
    saveOptions(selectedSids);
  };

  const handleSave = () => {
    saveOptions(selectedSids);
  };

  return (
    <>
      <WizardBody>
        <FormRow>
          <Column lg="12">
            <UICheckboxList
              id="__Access_Groups_List"
              subtitle="System managed groups"
              uiField={form?.accessPolicyGroups ?? undefined}
              options={systemManagedGroupOptions}
              value={selectedSids}
              onChange={onChange}
              emptyMessage="No configured Access Policy Groups"
              formatTooltip
            />
          </Column>
          {orgSpecificGroupOptions && orgSpecificGroupOptions.length ? (
            <Column lg="12">
              <UICheckboxList
                hideLabel
                subtitle="Organization specific groups"
                id="__Access_Groups_List"
                uiField={form?.accessPolicyGroups ?? undefined}
                options={orgSpecificGroupOptions}
                value={selectedSids}
                onChange={onChange}
                emptyMessage="No configured Access Policy Groups"
                formatTooltip
              />
            </Column>
          ) : null}
        </FormRow>
      </WizardBody>
      <UpdateExternalUserFooter onSave={onSubmit} />
    </>
  );
};

// SectionAccessManagement.defaultProps = defaultProps;

export { SectionAccessManagement };
export default SectionAccessManagement;
