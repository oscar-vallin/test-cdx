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
  const [groupOption, setGroupOption] = useState<boolean[] | undefined>([]);
  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (form?.auth) {
      if (form?.auth?.options) {
        setGroupOption(form?.auth?.options.map((option) => option.checked));
      }
      setLoading(false);
    }
  }, [form]);

  const handleSave = () => {
    const newForm = {
      ...form,
      access: {
        ...form?.access,
        options: form?.access?.options?.map((opt, index) => {
          return { ...opt, checked: groupOption ? groupOption[index] ?? false : false };
        }),
      },
    };

    saveOptions(newForm);
    return newForm;
  };

  const handlePrev = () => {
    handleSave();
    onPrev();

    return null;
  };

  const handleNext = () => {
    const newForm = handleSave();

    saveOptions(newForm);
    onNext();

    return null;
  };

  const handleGroupOption = (index: number) => {
    const newGroupOption = groupOption?.map((item, i) => (i === index ? !item : item));

    setGroupOption(newGroupOption);
  };

  return (
    <>
      <Spacing margin={{ top: 'normal' }} />
      {isLoading && <> Loading... </>}
      {!isLoading && (
        <>
          <Row bottom>
            {form?.access && (
              <Column lg="12">
                <FormLabel {...form.access.title} />
              </Column>
            )}
          </Row>
          {groupOption?.length &&
            form?.access?.options?.map((group, index) => {
              return (
                <StyledOptionRow key={`accessPolicyGroups-${index}`} bottom>
                  <Column lg="12">
                    <Checkbox
                      label={group.label}
                      checked={groupOption[index] ?? false}
                      onChange={() => handleGroupOption(index)}
                    />
                  </Column>
                </StyledOptionRow>
              );
            })}
          <CreateUsersFooter onPrev={handlePrev} onNext={handleNext} errorMessage={errorMessage} />
        </>
      )}
    </>
  );
};

// SectionAccessManagement.defaultProps = defaultProps;

export { SectionAccessManagement };
export default SectionAccessManagement;
