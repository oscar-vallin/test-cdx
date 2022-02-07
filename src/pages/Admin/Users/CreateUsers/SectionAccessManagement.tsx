import { useEffect, useState } from 'react';

import { FormRow } from 'src/components/layouts/Row/Row.styles';
import { UICheckboxList } from 'src/components/inputs/CheckboxList';
import { Column } from 'src/components/layouts';
import { Maybe, UiOption, UserAccountForm } from 'src/data/services/graphql';
import { WizardBody } from 'src/layouts/Panels/Panels.styles';
import CreateUsersFooter from './CreateUsersFooter';

type SectionAccessProps = {
  form?: UserAccountForm;
  onPrev: () => null;
  onNext: () => null;
  saveOptions: (sids: string[]) => void;
};

const SectionAccessManagement = ({ form, onPrev, onNext, saveOptions }: SectionAccessProps) => {
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

  const onChange = (selectedSids: string[]) => {
    setSelectedSids(selectedSids);
    saveOptions(selectedSids);
  };

  const handleSave = () => {
    saveOptions(selectedSids);
  };

  const handlePrev = () => {
    handleSave();
    onPrev();

    return null;
  };

  const handleNext = () => {
    handleSave();
    onNext();
    return null;
  };

  return (
    <>
      <WizardBody>
        <FormRow>
          <Column lg="12">
            <UICheckboxList id="__Access_Group_List"
                            uiField={form?.accessPolicyGroups ?? undefined}
                            options={groupOptions}
                            value={selectedSids}
                            onChange={onChange}
                            emptyMessage="No configured Access Policy Groups"
            />
          </Column>
        </FormRow>
      </WizardBody>
      <CreateUsersFooter onPrev={handlePrev} onNext={handleNext} />
    </>
  );
};

// SectionAccessManagement.defaultProps = defaultProps;

export { SectionAccessManagement };
export default SectionAccessManagement;
