import { useEffect, useState } from 'react';
import { Column } from 'src/components/layouts';

import { UserAccountForm } from 'src/data/services/graphql';
import { WizardBody } from 'src/layouts/Panels/Panels.styles';
import { UIInputCheck } from 'src/components/inputs/InputCheck';
import CreateUsersFooter from './CreateUsersFooter';
import { StyledOptionRow } from './CreateUsersPanel.styles';

type SectionAuthProps = {
  form: UserAccountForm;
  onPrev: () => void;
  onNext: () => void;
  saveOptions: (sendActivationEmail: boolean) => void;
};

const SectionAuthentication = ({
  form, onPrev, onNext, saveOptions,
}: SectionAuthProps) => {
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
            <UIInputCheck
              id="__userSendActivation"
              uiField={form?.sendActivationEmail}
              value={sendEmail}
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
