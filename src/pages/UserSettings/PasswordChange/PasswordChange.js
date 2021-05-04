import React, { useState, useEffect, useCallback, Fragment } from 'react';

import { Button } from '../../../components/buttons/Button';
import { CardSection } from '../../../components/cards';
import { InputText } from '../../../components/inputs/InputText'
import { Row, Column } from '../../../components/layouts';
import { Spacing } from '../../../components/spacings/Spacing';
import { MessageBar } from '../../../components/notifications/MessageBar';

import { useUpdateOwnPasswordMutation } from '../../../data/services/graphql';

import {
  StyledTitle,
} from '../UserSettingsPage.styles';

const isFormInvalid = (passwords) => {
  return !passwords.current
    || !passwords.new
    || !passwords.confirmation
    || passwords.new !== passwords.confirmation
}

const PasswordChange = ({ state, validations, onChange }) => {
  const [
    updateOwnPasswordMutation,
    {
      data: passwordUpdateResult,
      loading: isUpdatingPassword,
      error: passwordUpdateError,
    }
  ] = useUpdateOwnPasswordMutation({
    variables: { updatePasswordInput: state.password },
  });

  useEffect(() => {
    console.log(validations[0]);
  }, [validations])

  return (
    <CardSection>
      <StyledTitle>Change password</StyledTitle>

      <Row>
        <Column>
          <InputText
            required
            type="password"
            label="Existing password"
            value={state.current}
            disabled={isUpdatingPassword}
            canRevealPassword
            onChange={({ target }) => onChange({ ...state, current: target.value })}
          />

          <InputText
            required
            type="password"
            label="Password"
            value={state.new}
            disabled={isUpdatingPassword}
            canRevealPassword
            onChange={({ target }) => onChange({ ...state, new: target.value })}
          />

          <InputText
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

      <Row>
        <Column>
          <Spacing margin={{ top: "normal" }}>
            <Button
              variant="primary"
              text={isUpdatingPassword ? "Processing..." : "Save password"}
              disabled={isFormInvalid(state) || !validations[0].isValid || isUpdatingPassword}
              onClick={() => {
                updateOwnPasswordMutation({
                  variables: {
                    updatePasswordInput: {
                      originalPassword: state.current,
                      newPassword: state.new,
                      verifyPassword: state.confirmation
                    }
                  }
                });
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
                type={(!passwordUpdateResult?.updateOwnPassword) ? "error" : "success"}
                content={(!passwordUpdateResult?.updateOwnPassword)
                  ? passwordUpdateError.message
                  : "Password updated successfully."
                }
              />
            )}
          </Spacing>
        </Column>
      </Row>
    </CardSection>
  );
}

export default PasswordChange;