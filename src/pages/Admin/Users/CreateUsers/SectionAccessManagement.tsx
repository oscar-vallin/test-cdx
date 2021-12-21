import { Checkbox } from '@fluentui/react/lib-commonjs/Checkbox';
import { useEffect, useState } from 'react';
import { InputText } from 'src/components/inputs/InputText';
import FormLabel from 'src/components/labels/FormLabel';
import { Row, Column } from 'src/components/layouts';
import { Spacing } from 'src/components/spacings/Spacing';

import CreateUsersFooter from './CreateUsersFooter';
import { FormUserType } from './CreateUsersPanel.service';
import { StyledOptionRow } from './CreateUsersPanel.styles';

type SectionAccessProps = {
  form: FormUserType | undefined;
  onPrev: () => null;
  onNext: () => null;
};

const SectionAccessManagement = ({ form, onPrev, onNext }: SectionAccessProps) => {
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [groupOption, setGroupOption] = useState<boolean[]>([]);

  const handlePrev = () => {
    onPrev();

    return null;
  };

  const handleNext = () => {
    onNext();

    return null;
  };

  const handleGroupOption = (index: number) => {
    const newGroupOption = [...groupOption];
    newGroupOption[index] = !newGroupOption[index];
    setGroupOption(newGroupOption);
  };



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
        {form?.access && (
          <Column lg="12">
            <FormLabel {...form.access.title} />
          </Column>
        )}
      </Row>
      {form?.access?.options?.map((group, index) => (
        <StyledOptionRow key={`accessPolicyGroups-${index}`} bottom>
          <Column lg="12">
            <Checkbox label={group.label} checked={groupOption[index]} onChange={() => form.access.options?.values} />
            {/* <Checkbox label={group.label} checked={groupOption[index]} onChange={() => handleGroupOption(index)} /> */}
            {/* <Checkbox {...group} onChange={() => form?.access?.values?.setGroupOption()} /> */}
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
