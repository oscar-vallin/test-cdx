import { Checkbox } from '@fluentui/react';
import { useEffect, useState } from 'react';
import { Column } from 'src/components/layouts';

import { UserAccountForm } from 'src/data/services/graphql';
import { WizardBody } from 'src/layouts/Panels/Panels.styles';
import CreateUsersFooter from './CreateUsersFooter';
import { StyledOptionRow } from './CreateUsersPanel.styles';

type SectionAuthProps = {
  form: UserAccountForm;
  onPrev: () => null;
  onNext: () => null;
  saveOptions: (sendActivationEmail: boolean) => void;
};

const SectionAuthentication = ({ form, onPrev, onNext, saveOptions }: SectionAuthProps) => {
  const [sendEmail, setSendEmail] = useState<boolean>(form.sendActivationEmail?.value ?? true);

  useEffect(() => {
    const checked = form.sendActivationEmail?.value ?? true;
    setSendEmail(checked);
  }, [form]);

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
    const toggle = !sendEmail;
    setSendEmail(toggle);
    saveOptions(toggle);
  };

  return (
    <>
      <WizardBody>
        <StyledOptionRow bottom>
          <Column lg="12">
            <Checkbox
              id="__userSendActivation"
              label={form?.sendActivationEmail?.label}
              checked={sendEmail}
              onChange={onCheck}
            />
          </Column>
        </StyledOptionRow>
      </WizardBody>
      <CreateUsersFooter onPrev={handlePrev} onNext={handleNext} />
    </>
  );
};

export { SectionAuthentication };
export default SectionAuthentication;
