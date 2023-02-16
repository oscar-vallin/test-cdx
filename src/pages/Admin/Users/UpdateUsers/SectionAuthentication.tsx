import { useEffect, useState } from 'react';
import { CdxWebCommandType, UiOption, UserAccountForm } from 'src/data/services/graphql';
import { WizardBody } from 'src/layouts/Panels/Panels.styles';
import { ChoiceGroup, Stack } from '@fluentui/react';
import { Text } from 'src/components/typography';
import { Spacing } from 'src/components/spacings/Spacing';
import UpdateUserFooter from './UpdateUserFooter';

type SectionAuthProps = {
    form?: UserAccountForm;
    onSave: (identityProvider: string) => any;
};

const SectionAuthentication = ({ form, onSave }: SectionAuthProps) => {
  const [authenticationMethod, setAuthenticationMethod] = useState('');
  const [authenticationMethods, setAuthenticationMethods] = useState<UiOption[] | null>();

  useEffect(() => {
    const methods = form?.options?.find((opt) => opt.key === 'AuthenticationMethod');
    // const singleSingOnMethods = methods?.values?.filter((method) => method.category && method);
    // setPasswordBasedLogin(methods?.values && methods.values[0]);
    setAuthenticationMethods(methods?.values);
  }, []);

  const handleSave = () => {
    onSave(authenticationMethod);
  };

  return (
    <>
      <WizardBody>
        <ChoiceGroup
          defaultSelectedKey={form?.authenticationMethod?.value?.value}
          options={
            authenticationMethods?.map((method, indexMethod) => ({
              key: `${method?.value}`,
              text: `${method?.label}`,
              onRenderField: (props, render) => (
                <Stack>
                  {render!(props)}
                  {indexMethod === 0 && (
                    <Spacing margin={{ bottom: 'normal' }} />
                  )}
                  {authenticationMethods && authenticationMethods.length > 1
                    && indexMethod === 0 && (
                      <Text variant="semiBold">Single Sign On</Text>
                  )}
                </Stack>
              ),
            }))
          }
          onChange={(e, newValue) => setAuthenticationMethod(newValue?.key ?? '')}
        />
      </WizardBody>
      {form?.commands?.find((cmd) => cmd?.commandType === CdxWebCommandType.Update) && (
        <UpdateUserFooter onSave={handleSave} />
      )}
    </>
  )
};

export { SectionAuthentication };
export default SectionAuthentication;
