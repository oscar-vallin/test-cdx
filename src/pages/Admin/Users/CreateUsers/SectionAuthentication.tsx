import { Checkbox } from '@fluentui/react/lib-commonjs/Checkbox';
import { useEffect, useState } from 'react';
import { InputText } from 'src/components/inputs/InputText';
import { FormLabel } from 'src/components/labels/FormLabel';
import { Row, Column } from 'src/components/layouts';
import { Spacing } from 'src/components/spacings/Spacing';

import CreateUsersFooter from './CreateUsersFooter';
import { FormUserType } from './CreateUsersPanel.service';
import { StyledOptionRow } from './CreateUsersPanel.styles';

type SectionAuthProps = {
  form: FormUserType | undefined;
  onPrev: () => null;
  onNext: () => null;
  saveOptions: any;
};

const SectionAuthentication = ({ form, onPrev, onNext, saveOptions }: SectionAuthProps) => {
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [groupOption, setGroupOption] = useState<boolean[] | undefined>([]);
  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    console.log('🚀 ~ file: SectionAuthentication.tsx ~ line 27 ~ useEffect ~ form?.auth', form?.auth);
    if (form?.auth) {
      setLoading(false);

      if (form?.auth?.options) {
        setGroupOption(form?.auth?.options.map((option) => option.checked));
      }
    }
  }, [form]);

  const handleSaveChanges = () => {
    // !TODO: Dialog: Discard Changes or Save Changes.
    const newForm = { ...form, auth: { ...form?.auth, options: groupOption } };
    saveOptions(newForm);
  };

  const handlePrev = () => {
    handleSaveChanges();
    onPrev();

    return null;
  };

  const handleNext = () => {
    handleSaveChanges;
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
            form?.auth?.options?.map((group, index) => (
              <StyledOptionRow key={`AuthenticationOptions-${index}`} bottom>
                <Column lg="12">
                  <Checkbox
                    label={group.label}
                    checked={groupOption[index] ?? false}
                    onChange={() => handleGroupOption(index)}
                  />
                </Column>
              </StyledOptionRow>
            ))}
          <CreateUsersFooter onPrev={handlePrev} onNext={handleNext} errorMessage={errorMessage} />
        </>
      )}
    </>
  );
};

// SectionAuthentication.defaultProps = defaultProps;

export { SectionAuthentication };
export default SectionAuthentication;
