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
  saveOptions: any;
};

const SectionAccessManagement = ({ form, onPrev, onNext, saveOptions }: SectionAccessProps) => {
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [groupOption, setGroupOption] = useState<any[] | undefined>([]);

  useEffect(() => {
    if (form?.auth?.options) {
      setGroupOption(form.auth.options);
    }
  }, [form]);

  const handlePrev = () => {
    onPrev();
    const newForm = { ...form, access: { ...form?.access, options: groupOption } };
    saveOptions(newForm);

    return null;
  };

  const handleNext = () => {
    onNext();

    return null;
  };

  const handleGroupOption = (index: number) => {
    const newGroupOption = groupOption?.map((item, i) => {
      if (i === index) {
        return { ...item, checked: !item.checked };
      }
      return item;
    });
    setGroupOption(newGroupOption);
  };

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
            <Checkbox label={group.label} checked={group[index].checked} onChange={() => handleGroupOption(index)} />
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
