import { Checkbox } from '@fluentui/react/lib-commonjs/Checkbox';
import { useState } from 'react';
import { Column } from 'src/components/layouts';

import { UserAccountForm } from 'src/data/services/graphql';
import { CheckboxItem } from 'src/data/Types';
import CreateUsersFooter from './CreateUsersFooter';
import { StyledOptionRow, WizardBody } from './CreateUsersPanel.styles';

type SectionAuthProps = {
  form: UserAccountForm;
  onPrev: () => null;
  onNext: () => null;
  saveOptions: (sendActivationEmail: boolean) => void;
};

const SectionAuthentication = ({ form, onPrev, onNext, saveOptions }: SectionAuthProps) => {
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [sendEmail, setSendEmail] = useState<boolean>(true);

  const handleSaveChanges = () => {
    saveOptions(sendEmail);
  };

  const handlePrev = () => {
    handleSaveChanges();
    onPrev();

    return null;
  };

  const handleNext = () => {
    handleSaveChanges();
    onNext();

    return null;
  };

  const onCheck = () => {
    setSendEmail(!sendEmail);
  };

  return (
    <>
      <WizardBody>
        <StyledOptionRow bottom>
          <Column lg="12">
            <Checkbox label={form?.sendActivationEmail?.label} checked={sendEmail} onChange={onCheck} />
          </Column>
        </StyledOptionRow>
      </WizardBody>
      <CreateUsersFooter onPrev={handlePrev} onNext={handleNext} errorMessage={errorMessage} />
    </>
  );
};

export { SectionAuthentication };
export default SectionAuthentication;
