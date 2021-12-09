import { Button } from '../../../components/buttons';
import { InputText } from '../../../components/inputs/InputText';
import { Row, Column } from '../../../components/layouts';
import { Spacing } from '../../../components/spacings/Spacing';
import { MessageBar } from '../../../components/notifications/MessageBar';

import { useUpdateOwnPasswordMutation } from '../../../data/services/graphql';

import { StyledTitle } from '../UserSettingsPage.styles';

export type PasswordState = {
  current: string;
  new: string;
  confirmation: string;
};

const getValidationMessage = (passwords: PasswordState, isValid: boolean) => {
  if (!passwords.current || !passwords.new || !passwords.confirmation) {
    return 'Please fill all the required fields';
  }

  if (!isValid) {
    return 'Please fulfill all the security requirements';
  }

  if (passwords.new !== passwords.confirmation) {
    return "Passwords don't match";
  }

  return null;
};

const isFormInvalid = (passwords: PasswordState) => {
  return !passwords.current || !passwords.new || !passwords.confirmation || passwords.new !== passwords.confirmation;
};

type PasswordChangeParam = {
  state: any;
  onChange: any;
  validationPassed: boolean;
};

const PasswordChange = ({ state, onChange, validationPassed }: PasswordChangeParam) => {
  const [
    updateOwnPasswordMutation,
    { data: passwordUpdateResult, loading: isUpdatingPassword, error: passwordUpdateError },
  ] = useUpdateOwnPasswordMutation({
    variables: { updateOwnPasswordInput: state.password },
  });

  return (
    <>
      <StyledTitle id="__userSettings_Change_Password">Change password</StyledTitle>

      <Row>
        <Column>
          <InputText
            id="currentPassword"
            required
            type="password"
            label="Existing password"
            value={state.current}
            disabled={isUpdatingPassword}
            canRevealPassword
            onChange={({ target }) => onChange({ ...state, current: target.value })}
          />

          <InputText
            id="newPassword"
            required
            type="password"
            label="Password"
            value={state.new}
            disabled={isUpdatingPassword}
            canRevealPassword
            onChange={({ target }) => onChange({ ...state, new: target.value })}
          />

          <InputText
            id="confirmPassword"
            required
            type="password"
            label="Retype new password"
            canRevealPassword
            disabled={isUpdatingPassword}
            value={state.confirmation}
            onChange={({ target }) => onChange({ ...state, confirmation: target.value })}
          />
        </Column>
      </Row>

      {(isFormInvalid(state) || !validationPassed) && (
        <Row>
          <Column>
            <Spacing margin={{ top: 'normal' }}>
              <MessageBar type="warning" content={getValidationMessage(state, validationPassed)} />
            </Spacing>
          </Column>
        </Row>
      )}

      <Row>
        <Column>
          <Spacing margin={{ top: 'normal' }}>
            <Button
              id="__PasswordChangeId"
              variant="primary"
              text={isUpdatingPassword ? 'Processing...' : 'Save password'}
              disabled={isFormInvalid(state) || !validationPassed || isUpdatingPassword}
              onClick={() => {
                updateOwnPasswordMutation({
                  variables: {
                    updateOwnPasswordInput: {
                      originalPassword: state.current,
                      newPassword: state.new,
                      verifyPassword: state.confirmation,
                    },
                  },
                  errorPolicy: 'all',
                });
                return null;
              }}
            />
          </Spacing>
        </Column>
      </Row>

      <Row>
        <Column>
          <Spacing margin={{ top: 'normal' }}>
            {(passwordUpdateResult || passwordUpdateError) && (
              <MessageBar
                type={!passwordUpdateResult?.updateOwnPassword ? 'error' : 'success'}
                content={
                  !passwordUpdateResult?.updateOwnPassword
                    ? passwordUpdateError?.message
                    : 'Password updated successfully.'
                }
              />
            )}
          </Spacing>
        </Column>
      </Row>
    </>
  );
};

export default PasswordChange;
