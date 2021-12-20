import { Checkbox } from '@fluentui/react/lib-commonjs/Checkbox';
import { useEffect, useState } from 'react';
import { InputText } from 'src/components/inputs/InputText';
import FormLabel from 'src/components/labels/FormLabel';
import { Row, Column } from 'src/components/layouts';
import { Spacing } from 'src/components/spacings/Spacing';

import CreateUsersFooter from './CreateUsersFooter';
import { StyledOptionRow } from './CreateUsersPanel.styles';

type OptionLabel = {
  label: string;
  id: number;
  checked: boolean;
};

const SectionAccessManagement = ({ form, data, onPrev, onNext }) => {
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [options, setOptions] = useState<OptionLabel[]>([]);

  const handlePrev = () => {
    onPrev();

    return null;
  };

  const handleNext = () => {
    onNext();

    return null;
  };

  const handleOptionChange = (id: number) => {
    console.log('🚀 ~ file: SectionAccessManagement.tsx ~ line 33 ~ handleOptionChange ~ id', id);
    const newOptions = options.map((option) => {
      console.log('🚀 ~ file: SectionAccessManagement.tsx ~ line 34 ~ newOptions ~ option', option);
      if (option.id === id) {
        return { ...option, checked: !option.checked };
      }

      return option;
    });

    setOptions(newOptions);
    console.log('🚀 ~ file: SectionAccessManagement.tsx ~ line 44 ~ handleOptionChange ~ newOptions', newOptions);
  };

  useEffect(() => {
    console.log('🚀 ~ file: SectionAccessManagement.tsx ~ line 17 ~ SectionAccessManagement ~ form', form);
    console.log(
      '🚀 ~ file: SectionAccessManagement.tsx ~ line 51 ~ useEffect ~ form?.accessPolicyGroup?.options',
      form?.accessPolicyGroups?.options
    );

    const keyOptions = form?.accessPolicyGroups?.options;
    console.log('🚀 ~ file: SectionAccessManagement.tsx ~ line 55 ~ useEffect ~ keyOptions', keyOptions);

    if (keyOptions) {
      const formOptions = form.options.find((option) => option.key === keyOptions);
      console.log('🚀 ~ file: SectionAccessManagement.tsx ~ line 55 ~ useEffect ~ formOptions', formOptions);

      const newOptions: OptionLabel[] = formOptions.values.map((option) => {
        return { label: option.label, id: option.value, checked: false };
      });
      console.log(
        '🚀 ~ file: SectionAccessManagement.tsx ~ line 51 ~ constnewOptions:OptionLabel[]=form.options.accessPolicyGroup.value.map ~ newOptions',
        newOptions
      );

      setOptions(newOptions);
    }

    return () => {
      setOptions([]);
    };
  }, [form]);

  // accessPolicyGroups: {value: null, label: "Access Groups", readOnly: false, info: null, required: false, visible: true,…}
  // errCode: null;
  // errMsg: null;
  // errSeverity: null;
  // info: null;
  // label: 'Access Groups';
  // options: 'AccessPolicyGroup';
  // query: null;
  // readOnly: false;
  // required: false;
  // value: null;
  // visible: tru;

  // 0: {key: "AccessPolicyGroup",…}
  // key: "AccessPolicyGroup"
  // values: [{label: "Auditor", value: "2", info: null, __typename: "UIOption"},…]
  // 0: {label: "Auditor", value: "2", info: null, __typename: "UIOption"}
  // info: null
  // label: "Auditor"
  // value: "2"
  // __typename: "UIOption"
  // 1: {label: "Organization Admin", value: "3", info: null, __typename: "UIOption"}
  // info: null
  // label: "Organization Admin"
  // value: "3"
  // __typename: "UIOption"

  return (
    <>
      <Spacing margin={{ top: 'normal' }} />
      <Row bottom>
        {form.accessPolicyGroups.visible && (
          <Column lg="12">
            <FormLabel
              label={form.accessPolicyGroups.label}
              required={form.accessPolicyGroups.required}
              info={form.accessPolicyGroups.info}
            />
          </Column>
        )}
      </Row>
      {options &&
        options.map((group, index) => (
          <StyledOptionRow key={`accessPolicyGroups-${index}`} bottom>
            <Column lg="12">
              <Checkbox
                checked={group.checked}
                label={group.label}
                onChange={() => handleOptionChange(group?.id ?? 0)}
              />
            </Column>
          </StyledOptionRow>
        ))}
      <CreateUsersFooter onPrev={handlePrev} onNext={handleNext} errorMessage={errorMessage} />
    </>
  );
};

// SectionAccessManagement.defaultProps = defaultProps;

export { SectionAccessManagement };
export default SectionAccessManagement;
