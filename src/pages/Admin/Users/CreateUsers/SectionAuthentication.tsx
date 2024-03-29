import { useEffect, useState } from 'react';
import { Column } from 'src/components/layouts';

import { UiOption, UserAccountForm } from 'src/data/services/graphql';
import { WizardBody } from 'src/layouts/Panels/Panels.styles';
import { UIInputCheck } from 'src/components/inputs/InputCheck';
import { Checkbox, ChoiceGroup, Stack } from '@fluentui/react';
import { Text } from 'src/components/typography';
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
  const passwordOption: UiOption = {
    value: '-1',
    label: 'Password login',
  };
  const [sendEmail, setSendEmail] = useState<boolean>(form.sendActivationEmail?.value ?? true);
  const [passwordBasedLoginData, setPasswordBasedLoginData] = useState<UiOption[] | null>();
  const [
    authenticationMethod,
    setAuthenticationMethod,
  ] = useState<UiOption>(form.authenticationMethod?.value ?? passwordOption);
  const [checkedSingleSignOn, setCheckedSingleSignOn] = useState(false);

  useEffect(() => {
    const checked = form.sendActivationEmail?.value ?? true;
    setSendEmail(checked);
    if (form.authenticationMethod?.value?.category) {
      setCheckedSingleSignOn(true);
      setSendEmail(false);
    }
  }, [form]);

  useEffect(() => {
    const authMethod = form.options?.find((opt) => opt.key === 'AuthenticationMethod');
    setPasswordBasedLoginData(authMethod?.values);
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
    saveOptions(toggle, passwordOption);
  };

  return (
    <>
      <WizardBody>
        <ChoiceGroup
          defaultSelectedKey={form?.authenticationMethod?.value?.value}
          options={
            passwordBasedLoginData?.map((method, indexMethod) => ({
              key: `${method.value}`,
              text: `${method.label}`,
              onRenderField: (props, render) => (
                <Stack>
                  {render!(props)}
                  {method.label === 'Password based login' && (
                    <Spacing margin={{ top: 'normal', bottom: 'normal' }}>
                      {!checkedSingleSignOn ? (
                        <Column lg="12">
                          <Spacing margin={{ top: 'normal' }}>
                            <UIInputCheck
                              id="__userSendActivation"
                              uiField={form?.sendActivationEmail}
                              value={sendEmail}
                              onChange={(event, checked: any) => {
                                setSendEmail(checked);
                              }}
                            />
                          </Spacing>
                        </Column>
                      ) : (
                        <Column lg="12">
                          <Spacing margin={{ top: 'normal' }}>
                            <Checkbox
                              id="__userSendActivation"
                              disabled
                              checked={sendEmail}
                              label={form?.sendActivationEmail?.label}
                            />
                          </Spacing>
                        </Column>
                      )}
                    </Spacing>
                  )}
                  {passwordBasedLoginData && passwordBasedLoginData?.length > 1
                     && indexMethod === 0 && (
                       <Text variant="semiBold">Single Sign On</Text>
                  )}
                </Stack>
              ),
            }))
          }
          onChange={(e, newValue) => {
            const value = passwordBasedLoginData?.find((method) => method.value === newValue?.key);
            if (value?.category) {
              setAuthenticationMethod(value);
              setCheckedSingleSignOn(true);
              setSendEmail(false);
              saveOptions(false, value);
            } else {
              setAuthenticationMethod(value ?? passwordOption)
              setCheckedSingleSignOn(false);
              onCheck();
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
