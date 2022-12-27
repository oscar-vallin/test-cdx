import React, { useEffect, useState } from 'react';
import { Button } from 'src/components/buttons';
import { PanelType } from '@fluentui/react';
import { useUpdateOwnPasswordMutation } from 'src/data/services/graphql';
import { PanelBody, ThemedPanel } from 'src/layouts/Panels/Panels.styles';
import { useSessionStore } from 'src/store/SessionStore';
import { InputText } from 'src/components/inputs/InputText';
import { Spacing } from 'src/components/spacings/Spacing';
import { MessageBar } from 'src/components/notifications/MessageBar';
import { useNotification } from 'src/hooks/useNotification';
import { PasswordState } from './PasswordChange';
import { PasswordRules } from '../PasswordRules';

type PasswordChangePanelProps = {
    isOpen: boolean;
    closePanel: (data: boolean) => void;
};

const PasswordChangePanel = ({ closePanel, isOpen }: PasswordChangePanelProps) => {
  const { user } = useSessionStore();
  const Toast = useNotification();
  const [validationPassed, setValidationPassed] = useState<boolean>(false);
  const [passwords, setPasswords] = useState<any>({
    current: '',
    new: '',
    confirmation: '',
  });
  const [delayedPassword, setDelayedPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');

  const [
    updateOwnPasswordMutation,
    { data: passwordUpdateResult, loading: isUpdatingPassword, error: passwordUpdateError },
  ] = useUpdateOwnPasswordMutation({
    variables: { updateOwnPasswordInput: passwords.password },
  });

  const passwordValidationStateChange = (passes: boolean) => {
    setValidationPassed(passes);
  };

  const getValidationMessage = (password: PasswordState, isValid: boolean) => {
    if (!password.current || !password.new || !password.confirmation) {
      return 'Please fill all the required fields';
    }

    if (!isValid) {
      return 'Please fulfill all the security requirements';
    }

    if (password.new !== password.confirmation) {
      return "Passwords don't match";
    }

    return null;
  };

  const isFormInvalid = (password: PasswordState) => !password.current || !password.new || !password.confirmation || password.new !== password.confirmation;

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      setDelayedPassword(passwords.new);
    }, 500);
    return () => clearTimeout(timeOutId);
  }, [passwords.new]);

  useEffect(() => {
    if (passwordUpdateResult?.updateOwnPassword) {
      closePanel(false);
      Toast.success({ text: 'Password changed' });
    }

    if (passwordUpdateError) {
      setErrMsg(passwordUpdateError.message);
    }
  }, [passwordUpdateResult, passwordUpdateError]);

  return (
    <ThemedPanel
      closeButtonAriaLabel="Close"
      headerText="Change Password"
      type={PanelType.medium}
      isLightDismiss={false}
      isOpen={isOpen}
      onDismiss={() => closePanel(false)}
    >
      <PanelBody>
        {(isFormInvalid(passwords) || !validationPassed) && (
        <Spacing margin={{ top: 'normal' }}>
          <MessageBar type="warning" content={getValidationMessage(passwords, validationPassed)} />
        </Spacing>
        )}

        <InputText
          id="currentPassword"
          errorMessage={errMsg}
          required
          type="password"
          label="Existing password"
          value={passwords.current}
          disabled={isUpdatingPassword}
          onChange={(event, newValue) => setPasswords({ ...passwords, current: newValue ?? '' })}
        />

        <InputText
          id="newPassword"
          required
          type="password"
          label="Password"
          value={passwords.new}
          disabled={isUpdatingPassword}
          onChange={(event, newValue) => setPasswords({ ...passwords, new: newValue ?? '' })}
        />

        <InputText
          id="confirmPassword"
          required
          type="password"
          label="Retype new password"
          disabled={isUpdatingPassword}
          value={passwords.confirmation}
          onChange={(event, newValue) => setPasswords({ ...passwords, confirmation: newValue ?? '' })}
        />

        <Spacing margin={{ top: 'normal' }} />

        <PasswordRules
          user={user}
          password={delayedPassword}
          onChange={passwordValidationStateChange}
        />

        <Spacing margin={{ top: 'normal' }}>
          <Button
            id="__PasswordChangeId"
            variant="primary"
            text="Save"
            disabled={isFormInvalid(passwords) || !validationPassed || isUpdatingPassword}
            onClick={() => {
              updateOwnPasswordMutation({
                variables: {
                  updateOwnPasswordInput: {
                    originalPassword: passwords.current,
                    newPassword: passwords.new,
                    verifyPassword: passwords.confirmation,
                  },
                },
                errorPolicy: 'all',
              }).then();
            }}
          />
        </Spacing>
      </PanelBody>
    </ThemedPanel>
  )
};

export default PasswordChangePanel;
