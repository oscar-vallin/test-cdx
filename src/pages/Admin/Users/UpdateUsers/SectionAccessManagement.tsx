import { useEffect, useState } from 'react';
import { UIFormLabel } from 'src/components/labels/FormLabel';

import { FormRow } from 'src/components/layouts/Row/Row.styles';
import { CheckboxList } from 'src/components/inputs/CheckboxList';
import { Column } from 'src/components/layouts';
import UpdateUserFooter from './UpdateUserFooter';
import { Maybe, UiOption, UserAccountForm } from 'src/data/services/graphql';
import { WizardBody } from "src/layouts/Panels/Panels.styles";

type SectionAccessProps = {
  form?: UserAccountForm;
  onSave: (sids: string[]) => any;
};

const SectionAccessManagement = ({ form, onSave }: SectionAccessProps) => {
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
            <UIFormLabel uiField={form?.accessPolicyGroups ?? undefined} />
            <CheckboxList
              id="__Access_Groups_List"
              items={groupOptions}
              value={selectedSids}
              onChange={setSelectedSids}
            />
          </Column>
        </FormRow>
      </WizardBody>
      <UpdateUserFooter onSave={handleSave} />
    </>
  );
};

export { SectionAccessManagement };
export default SectionAccessManagement;
