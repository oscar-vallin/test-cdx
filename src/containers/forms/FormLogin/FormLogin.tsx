/* eslint-disable no-nested-ternary */
/* eslint-disable react-hooks/exhaustive-deps */
import { ReactElement, useState, useEffect } from 'react';
import { SpinnerSize } from '@fluentui/react';
import { Column } from '../../../components/layouts';
import { InputText } from '../../../components/inputs/InputText';
import { Spacing } from '../../../components/spacings/Spacing';
import { Spinner } from '../../../components/spinners/Spinner';

import {
  StyledBox,
  StyledRow,
  StyledButton,
  StyledCard,
  StyledImage,
  StyledText,
  StyledTitle,
  StyledRowBottom,
  StyledButtonIcon,
} from './FormLogin.styles';

import { useSessionStore } from '../../../store/SessionStore';
import { useLoginUseCase } from '../../../use-cases/Authentication';
import { useNotification } from '../../../hooks/useNotification';

const defaultProps = {
  id: '',
};

type FormLoginProps = {
  id?: string;
} & typeof defaultProps;

const INITIAL_STATE = { userId: '', password: '' };

const FormLogin = ({ id }: FormLoginProps): ReactElement => {
  const SessionStore = useSessionStore();
  const Toast = useNotification();

  const { performUserIdVerification, performUserAuthentication, returnToInitialStep, state } = useLoginUseCase();

  const [values, setValues] = useState({ ...INITIAL_STATE });
  const [isValidEmail, setIsValidEmail] = useState(false);

  useEffect(() => {
    setIsValidEmail(state.step === 'PASSWORD');

    if (state.reset) {
      setValues({ ...INITIAL_STATE });
    }

    if (state.error) {
      Toast.error({ text: state.error });
    }
  }, [state]);

  const handleReturnToInitialStep = (): null => {
    returnToInitialStep();
    return null;
  };

  return (
    <StyledBox id={id}>
      <StyledRowBottom id={`${id}__Card--Row`}>
        <Column id={`${id}__Card__Row-Column`}>
          <StyledImage name="logo" alt="Known2U Logo" />
        </Column>
      </StyledRowBottom>
      <StyledRow id={`${id}--Row`}>
        <Column id={`${id}__Row-Column`}>
          <StyledCard id={`${id}-Card`}>
            {SessionStore.isRehydrating ? (
              <Spacing margin={{ top: 'normal' }}>
                <Spinner size={SpinnerSize.large} label="Checking current user session" />
              </Spacing>
            ) : (
              <>
                <StyledRow id={`${id}__Card__Row--label`}>
                  <Column id={`${id}__Card__Row__Column--label`}>
                    <StyledTitle>CDX DASHBOARD</StyledTitle>
                  </Column>
                </StyledRow>
                <StyledRow id={`${id}__Card__Row--sublabel`}>
                  <Column id={`${id}__Card__Row__Column--sublabel`}>
                    <StyledText>Sign in to access your dashboard</StyledText>
                  </Column>
                </StyledRow>
                <StyledRow id={`${id}__Card__Row--Email`}>
                  <Column id={`${id}__Card__Row__Column--Email`}>
                    <InputText
                      id={`${id}__Card__Row__Input-Email`}
                      autoFocus
                      placeholder="Email"
                      disabled={state.loading || isValidEmail}
                      value={values.userId}
                      onKeyEnter={() => performUserIdVerification(values)}
                      onChange={({ target }) => setValues({ ...values, userId: target.value })}
                    />
                  </Column>
                  {isValidEmail && (
                    <Column id={`${id}__Card__Row__Column--label`} right>
                      <StyledButtonIcon
                        id={`${id}__Card__Row__Column__Button--Edit`}
                        disabled={state.loading}
                        onClick={handleReturnToInitialStep}
                        icon="edit"
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
                        autoFocus
                        placeholder="Password"
                        type="password"
                        value={values.password}
                        onKeyEnter={() => performUserAuthentication(values)}
                        onChange={({ target }) => setValues({ ...values, password: target.value })}
                      />
                    </Column>
                  </StyledRow>
                )}
                <StyledRow id={`${id}__Card__Row--Email`}>
                  <Column id={`${id}__Card__Row__Column--Email`}>
                    <StyledButton
                      id={`${id}__Card__Row__Column__Button--Button`}
                      variant="secondary"
                      disabled={state.loading}
                      block={false}
                      text=""
                      onClick={() => {
                        return isValidEmail ? performUserAuthentication(values) : performUserIdVerification(values);
                      }}
                    >
                      {state.loading ? <Spinner /> : !isValidEmail ? 'Next' : 'Login'}
                    </StyledButton>
                  </Column>
                </StyledRow>
              </>
            )}
          </StyledCard>
        </Column>
      </StyledRow>
    </StyledBox>
  );
};

FormLogin.defaultProps = defaultProps;

export { FormLogin };