import { LayoutLogin } from 'src/layouts/LayoutLogin';
import React, { useEffect, useState } from 'react';
import {
  BigTitle,
  Card500,
  CenteredWrapper,
  K2ULogo,
  LogoRow,
  PrimaryButton100,
} from 'src/layouts/LayoutLogin/LayoutLogin.styles';
import { Column } from 'src/components/layouts';
import { FormRow } from 'src/components/layouts/Row/Row.styles';
import { Text } from 'src/components/typography/Text';
import { PasswordRules } from 'src/pages/UserSettings/PasswordRules';
import { useLocation } from 'react-router-dom';
import {
  GqOperationResponse,
  useUpdatePasswordMutation,
  useVerifyPasswordResetTokenLazyQuery,
} from 'src/data/services/graphql';
import { SessionUser } from 'src/store/SessionStore/SessionTypes';
import { InputText } from 'src/components/inputs/InputText';
import { useDelayedInputValue, useInputValue } from 'src/hooks/useInputValue';
import { MessageBar, MessageBarType } from '@fluentui/react';

export const PasswordResetPage = () => {
  // eslint-disable-next-line no-shadow
  enum PageState {
    LOADING,
    BAD_TOKEN,
    SHOW_FORM,
    COMPLETE,
  }

  const [user, setUser] = useState<SessionUser>();
  const newPassword = useDelayedInputValue('New Password', 'Create a new password', '', 'password');
  const confirmPassword = useInputValue('Retype new password', 'Re-enter the new password', '', 'password');
  const [validationPassed, setValidationPassed] = useState<boolean>(false);
  const [validationMessage, setValidationMessage] = useState<string | null>(null);

  const [pageState, setPageState] = useState<PageState>(PageState.LOADING);

  const passwordValidationStateChange = (passes: boolean) => {
    setValidationPassed(passes);
  };

  const location = useLocation();
  const getToken = (): string => {
    const idx = location.pathname.lastIndexOf('/');
    if (idx > 0) {
      return location.pathname.substring(idx + 1);
    }
    return '';
  };

  const token = getToken();

  const [callVerifyToken, {
    data: dataVerifyToken, loading: loadingVerifyToken,
  }] = useVerifyPasswordResetTokenLazyQuery();

  const [callUpdatePassword, {
    data: dataUpdatePassword, loading: dataUpdatePasswordLoading,
  }] = useUpdatePasswordMutation();

  useEffect(() => {
    callVerifyToken({
      variables: {
        token,
      },
    });
  }, [token]);

  useEffect(() => {
    if (!loadingVerifyToken && dataVerifyToken) {
      if (dataVerifyToken.verifyPasswordResetToken?.response === GqOperationResponse.Success) {
        // Set the User
        setUser({
          userId: dataVerifyToken?.verifyPasswordResetToken?.userSid,
          id: dataVerifyToken?.verifyPasswordResetToken?.userSid,
          token: '',
          defaultAuthorities: [],
          firstName: '',
          orgSid: dataVerifyToken?.verifyPasswordResetToken?.orgSid,
        });
        setPageState(PageState.SHOW_FORM);
      } else {
        // Invalid Token
        setPageState(PageState.BAD_TOKEN);
      }
    }
  }, [dataVerifyToken, loadingVerifyToken]);

  useEffect(() => {
    if (pageState === PageState.SHOW_FORM) {
      if (!newPassword.value || !confirmPassword.value) {
        setValidationMessage('Please fill all the required fields');
      } else if (!validationPassed) {
        setValidationMessage('Please fulfill all the security requirements');
      } else if (newPassword.value !== confirmPassword.value) {
        setValidationMessage("Passwords don't match");
      } else {
        setValidationMessage(null);
      }
    } else {
      setValidationMessage(null);
    }
  }, [pageState, newPassword.value, confirmPassword.value, validationPassed]);

  useEffect(() => {
    if (dataUpdatePassword && !dataUpdatePasswordLoading) {
      if (dataUpdatePassword?.updatePassword?.response === GqOperationResponse.Success) {
        setPageState(PageState.COMPLETE);
      } else {
        setValidationMessage(
          dataUpdatePassword?.updatePassword?.errMsg
            ?? 'An unexpected error occurred updating your password. Please contact your administrator.',
        );
      }
    }
  }, [dataUpdatePassword, dataUpdatePasswordLoading]);

  const handleUpdatePassword = async () => {
    await callUpdatePassword({
      variables: {
        updatePasswordInput: {
          token,
          newPassword: newPassword.value,
          verifyPassword: confirmPassword.value,
        },
      },
    });
  };

  const renderLoading = () => (
    <FormRow>
      <Column>
        <Text>Loading...</Text>
      </Column>
    </FormRow>
  );

  const renderComplete = () => (
    <>
      <FormRow>
        <Column>
          <Text>Your Password has been successfully updated.</Text>
        </Column>
      </FormRow>
      <FormRow>
        <Column>
          <PrimaryButton100 id="__ReturnToLogin_Btn" href="/login">
            Login to CDX Dashboard
          </PrimaryButton100>
        </Column>
      </FormRow>
    </>
  );

  const renderInvalidToken = () => (
    <FormRow>
      <MessageBar id="__Invalid_Token_Msg" messageBarType={MessageBarType.error} isMultiline>
        <Text>The given token is invalid or has expired.</Text>
        <Text>
          Please contact your administrator to Reset your
          Password and have another token sent to you.
        </Text>
      </MessageBar>
    </FormRow>
  );

  const renderForm = () => {
    if (user) {
      return (
        <>
          <FormRow>
            <Column>
              <Text>Please create a new password</Text>
            </Column>
          </FormRow>
          <FormRow>
            <Column>
              <InputText id="__New_Password" autofocus canRevealPassword required {...newPassword} />
            </Column>
            <Column>
              <InputText id="__Confirm_Password" autofocus canRevealPassword required {...confirmPassword} />
            </Column>
          </FormRow>
          <FormRow>
            <Column>
              <PasswordRules
                user={user}
                password={newPassword.delayedValue}
                onChange={passwordValidationStateChange}
              />
            </Column>
          </FormRow>
          <FormRow>
            <Column>
              <PrimaryButton100 id="__Save_Button" disabled={validationMessage !== null} onClick={handleUpdatePassword}>
                Save
              </PrimaryButton100>
            </Column>
          </FormRow>
        </>
      );
    }
    return '';
  };

  const renderBody = (pState: PageState) => {
    switch (pState) {
      case PageState.LOADING:
        return renderLoading();
      case PageState.BAD_TOKEN:
        return renderInvalidToken();
      case PageState.SHOW_FORM:
        return renderForm();
      case PageState.COMPLETE:
        return renderComplete();
      default:
        return ''
    }
  };

  return (
    <LayoutLogin id="PagePasswordReset">
      <CenteredWrapper id="__FormWrap">
        <LogoRow id="__Logo--Row">
          <Column id="__Logo__Row-Column">
            <K2ULogo name="logo" alt="Known2U Logo" />
          </Column>
        </LogoRow>
        <FormRow>
          <Column id="__FormBody">
            <Card500>
              <FormRow>
                <Column>
                  <BigTitle>CDX DASHBOARD</BigTitle>
                </Column>
              </FormRow>
              {validationMessage && (
                <FormRow>
                  <Column>
                    <MessageBar id="__Validation_Message" messageBarType={MessageBarType.warning} isMultiline>
                      {validationMessage}
                    </MessageBar>
                  </Column>
                </FormRow>
              )}
              {renderBody(pageState)}
            </Card500>
          </Column>
        </FormRow>
      </CenteredWrapper>
    </LayoutLogin>
  );
};
