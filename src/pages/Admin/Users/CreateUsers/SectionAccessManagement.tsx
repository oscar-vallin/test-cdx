import { useEffect, useState } from 'react';
import { UIFormLabel } from 'src/components/labels/FormLabel';

import { FormRow } from 'src/components/layouts/Row/Row.styles';
import { CheckboxList } from 'src/components/inputs/CheckboxList';
import { Column } from 'src/components/layouts';
import CreateUsersFooter from './CreateUsersFooter';
import { WizardBody } from './CreateUsersPanel.styles';
import { Maybe, UiOption, UserAccountForm } from '../../../../data/services/graphql';

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
      <CreateUsersFooter onPrev={handlePrev} onNext={handleNext} />
    </>
  );
};

// SectionAccessManagement.defaultProps = defaultProps;

export { SectionAccessManagement };
export default SectionAccessManagement;
