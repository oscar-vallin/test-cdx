import { Checkbox } from '@fluentui/react/lib-commonjs/Checkbox';
import { useEffect, useState } from 'react';
import { UIFormLabel } from 'src/components/labels/FormLabel';
import { Row, Column } from 'src/components/layouts';

import CreateUsersFooter from './CreateUsersFooter';
import { StyledOptionRow, WizardBody } from './CreateUsersPanel.styles';
import { Maybe, UiOption, UserAccountForm } from '../../../../data/services/graphql';

type SectionAccessProps = {
  form?: UserAccountForm;
  onPrev: () => null;
  onNext: () => null;
  saveOptions: (sids: string[]) => void;
};

type CheckboxItem = UiOption & {
  checked: boolean;
};

const SectionAccessManagement = ({ form, onPrev, onNext, saveOptions }: SectionAccessProps) => {
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [selectedSids, setSelectedSids] = useState<string[]>([]);
  const [groupOptions, setGroupOptions] = useState<CheckboxItem[]>([]);

  useEffect(() => {
    if (form) {
      const groupSids: string[] =
        form?.accessPolicyGroups?.value
          ?.filter((grp) => grp && grp.value)
          ?.map((grp) => {
            return grp?.value || '';
          }) ?? [];
      setSelectedSids(groupSids);

      const formOpts: Maybe<UiOption>[] =
        form?.options?.find((itm) => {
          return itm?.key == form?.accessPolicyGroups?.options;
        })?.values ?? [];

      const groupOpts: CheckboxItem[] = [];
      formOpts.forEach((opt) => {
        if (opt) {
          groupOpts.push({
            ...opt,
            checked: selectedSids.includes(opt.value),
          });
        }
      });

      setGroupOptions(groupOpts);
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

  const onItemCheck = (sid: string) => {
    const idx = selectedSids.indexOf(sid);
    const checked = idx > -1;
    const option = groupOptions.find((opt) => opt.value == sid);
    if (option) {
      option.checked = !checked;
    }
    selectedSids.splice(idx, 1);
    setSelectedSids(selectedSids);
    setGroupOptions(groupOptions);
  };

  return (
    <>
      <WizardBody>
        <Row bottom>
          <Column lg="12">
            <UIFormLabel uiField={form?.accessPolicyGroups ?? undefined} />
          </Column>
        </Row>
        {groupOptions.map((item, index) => {
          return (
            <StyledOptionRow key={`accessPolicyGroups-${index}`} bottom>
              <Column lg="12">
                <Checkbox
                  key="chk-idx"
                  label={item.label}
                  checked={item.checked ?? false}
                  onChange={() => onItemCheck(item.value)}
                />
              </Column>
            </StyledOptionRow>
          );
        })}
      </WizardBody>
      <CreateUsersFooter onPrev={handlePrev} onNext={handleNext} errorMessage={errorMessage} />
    </>
  );
};

// SectionAccessManagement.defaultProps = defaultProps;

export { SectionAccessManagement };
export default SectionAccessManagement;
