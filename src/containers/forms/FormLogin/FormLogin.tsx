/* eslint-disable no-nested-ternary */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { ReactElement, useState, useEffect } from 'react';
import { MessageBar, MessageBarType } from '@fluentui/react';
import {
  BigTitle, Card500, CenteredWrapper, K2ULogo, LogoRow,
} from 'src/layouts/LayoutLogin/LayoutLogin.styles';
import { Column } from 'src/components/layouts';
import { InputText } from 'src/components/inputs/InputText';
import { Spinner } from 'src/components/spinners/Spinner';
import { ButtonLink } from 'src/components/buttons';
import { useLoginUseCase } from 'src/use-cases/Authentication';
import { ForgotPasswordModal } from 'src/containers/modals/ForgotPasswordModal';
import { useSessionStore } from 'src/store/SessionStore';
import {
  StyledRow, StyledButton, StyledText, StyledButtonIcon,
} from './FormLogin.styles';

const defaultProps = {
  id: '',
};

type FormLoginProps = {
  id?: string;
} & typeof defaultProps;

const INITIAL_STATE = { userId: '', password: '' };

const FormLogin = ({ id }: FormLoginProps): ReactElement => {
  const SessionStore = useSessionStore();

  const {
    performUserIdVerification, performUserAuthentication, returnToInitialStep, state,
  } = useLoginUseCase();

  const [values, setValues] = useState({ ...INITIAL_STATE });
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);

  useEffect(() => {
    setIsValidEmail(state.step === 'PASSWORD');

    if (state.reset) {
      setValues({ ...INITIAL_STATE });
      SessionStore.setGlobalError(null);
    }
    if (state.error) {
      SessionStore.setGlobalError(state.error);
    } else if (state.data) {
      SessionStore.setGlobalError(null);
    }
  }, [state]);

  const handleReturnToInitialStep = (): null => {
    returnToInitialStep();
    return null;
  };

  const renderGlobalError = () => {
    if (SessionStore.globalError) {
      return (
        <StyledRow id="__Global_Error">
          <MessageBar messageBarType={MessageBarType.error} isMultiline>
            {SessionStore.globalError}
          </MessageBar>
        </StyledRow>
      );
    }
    return null;
  };

  return (
    <CenteredWrapper id={id}>
      <LogoRow id={`${id}__Logo--Row`}>
        <Column id={`${id}__Logo__Row-Column`}>
          <K2ULogo name="logo" alt="Known2U Logo" />
        </Column>
      </LogoRow>
      <StyledRow id={`${id}--Row`}>
        <Column id={`${id}__Row-Column`}>
          <Card500 id={`${id}-Card`}>
            <StyledRow id={`${id}__Card__Row--label`}>
              <Column id={`${id}__Card__Row__Column--label`}>
                <BigTitle>CDX DASHBOARD</BigTitle>
              </Column>
            </StyledRow>
            {renderGlobalError()}
            <StyledRow id={`${id}__Card__Row--sublabel`}>
              <Column id={`${id}__Card__Row__Column--sublabel`}>
                <StyledText>Sign in to access your dashboard</StyledText>
              </Column>
            </StyledRow>
            <StyledRow id={`${id}__Card__Row--Email`}>
              <Column id={`${id}__Card__Row__Column--Email`}>
                <InputText
                  id={`${id}__Card__Row__Input-Email`}
                  autofocus
                  placeholder="Email"
                  disabled={state.loading || isValidEmail}
                  value={values.userId}
                  onKeyEnter={() => performUserIdVerification(values)}
                  onChange={(event, newValue) => setValues({ ...values, userId: newValue ?? '' })}
                />
              </Column>
              {isValidEmail && (
                <Column id={`${id}__Card__Row__Column--label`} right>
                  <StyledButtonIcon
                    id={`${id}__Card__Row__Column__Button--Edit`}
                    disabled={state.loading}
                    onClick={handleReturnToInitialStep}
                    iconName="Edit"
                  >
                    Edit
                  </StyledButtonIcon>
                </Column>
              )}
            </StyledRow>
            {isValidEmail && (
              <StyledRow id={`${id}__Card__Row--Password`}>
                <Column id={`${id}__Card__Row__Column--Password`}>
                  <InputText
                    id={`${id}__Card__Row__Input-Password`}
                    autofocus
                    placeholder="Password"
                    type="password"
                    value={values.password}
                    onKeyEnter={() => performUserAuthentication(values)}
                    onChange={(event, newValue) => setValues({ ...values, password: newValue ?? '' })}
                  />
                </Column>
              </StyledRow>
            )}
            <StyledRow>
              <Column>
                <StyledButton
                  id={`${id}__Card__Row__Column__Button--Button`}
                  variant="secondary"
                  disabled={state.loading}
                  block={false}
                  text=""
                  onClick={() => {
                    if (isValidEmail) {
                      performUserAuthentication(values);
                    } else {
                      performUserIdVerification(values);
                    }
                  }}
                >
                  {state.loading ? <Spinner /> : !isValidEmail ? 'Next' : 'Login'}
                </StyledButton>
                {isValidEmail && (
                  <StyledRow id={`${id}__Card__Row--sublabel`}>
                    <Column id={`${id}__Card__Row__Column--label`}>
                      <ButtonLink onClick={() => setForgotPassword(true)}>
                        Forgot your password?
                      </ButtonLink>
                    </Column>
                  </StyledRow>
                )}

                {forgotPassword && (
                  <ForgotPasswordModal
                    isOpen={setForgotPassword}
                    open={forgotPassword}
                    currentUserId={values.userId}
                  />
                )}
              </Column>
            </StyledRow>
          </Card500>
        </Column>
      </StyledRow>
    </CenteredWrapper>
  );
};

FormLogin.defaultProps = defaultProps;

export { FormLogin };
