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

  const [selectedSids, setSelectedSids] = useState<string[]>(getSelectedAccessGroupSids(form));
  const [groupOptions, setGroupOptions] = useState<UiOption[]>(getAccessGroupOptions(form));

  useEffect(() => {
    if (form) {
      setSelectedSids(getSelectedAccessGroupSids(form));
      setGroupOptions(getAccessGroupOptions(form));
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
            <UICheckboxList id="__Access_Groups_List"
                            uiField={form?.accessPolicyGroups ?? undefined}
                            options={groupOptions}
                            value={selectedSids}
                            onChange={(sids) => {
                              onFormChange();
                              setSelectedSids(sids);
                            }}
                            emptyMessage="No configured Access Policy Groups"
            />
          </Column>
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
