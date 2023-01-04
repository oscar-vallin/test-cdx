import { useEffect, useState } from 'react';
import { Column } from 'src/components/layouts';

import { UiOption, UserAccountForm } from 'src/data/services/graphql';
import { WizardBody } from 'src/layouts/Panels/Panels.styles';
import { UIInputCheck } from 'src/components/inputs/InputCheck';
import { ChoiceGroup } from '@fluentui/react';
import { Spacing } from 'src/components/spacings/Spacing';
import CreateUsersFooter from './CreateUsersFooter';

type SectionAuthProps = {
  form: UserAccountForm;
  onPrev: () => void;
  onNext: () => void;
  saveOptions: (sendActivationEmail: boolean, authMethod?: UiOption) => void;
};

const SectionAuthentication = ({
  form, onPrev, onNext, saveOptions,
}: SectionAuthProps) => {
  const [sendEmail, setSendEmail] = useState<boolean>(form.sendActivationEmail?.value ?? true);
  const [authenticationMethods, setAuthenticationMethods] = useState<UiOption[] | null>();
  const [authenticationMethod, setAuthenticationMethod] = useState<UiOption>();

  useEffect(() => {
    const checked = form.sendActivationEmail?.value ?? true;
    setSendEmail(checked);
  }, [form]);

  useEffect(() => {
    const authMethod = form.options?.find((opt) => opt.key === 'AuthenticationMethod');
    setAuthenticationMethods(authMethod?.values);
  }, []);

  const handleSaveChanges = () => {
    saveOptions(sendEmail, authenticationMethod);
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
        <ChoiceGroup
          defaultSelectedKey="-1"
          options={
            authenticationMethods?.map((method, indexMethod) => ({
              key: `${method.value}`,
              text: `${method.label}`,
              onRenderField: (props, render) => (
                <>
                  {render!(props)}
                  {method.label === 'Password based login' && (
                     <Spacing margin={{ top: 'normal', bottom: 'normal' }}>
                      <Column lg="12">
                        <UIInputCheck
                          id="__userSendActivation"
                          uiField={form?.sendActivationEmail}
                          value={sendEmail}
                        />
                      </Column>
                   </Spacing>
                  )}
                </>
              )
            }))
          }
          onChange={(e, newValue) => {
            const value = authenticationMethods?.find((method) => method.value === newValue?.key);
            if (value?.category) {
              setAuthenticationMethod(value);
              setSendEmail(false);
              saveOptions(false, value);
            } else {
              onCheck()
            }
          }}
        />
      </WizardBody>
      <CreateUsersFooter onPrev={handlePrev} onNext={handleNext} />
    </>
  );
};

export { SectionAuthentication };
export default SectionAuthentication;
