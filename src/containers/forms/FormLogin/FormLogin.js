import React from 'react';
import PropTypes from 'prop-types';
// Components
import { Column } from '../../../components/layouts';
import { InputText } from '../../../components/inputs/InputText';
import { Spinner } from '../../../components/spinners/Spinner';
// Hooks
import { useLogin } from './FormLogin.services';
import { useLoginBegin } from '../../../contexts/hooks/useLogin';
// Styles
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

// CardSection is called directly cause a restriction warning for that component.
const FormLogin = ({ id = '__FormLogin', onLogin }) => {
  const handlerLogin = useLogin(onLogin);
  const { apiBeginLogin, isValidEmail, editUser, errorMessage, isProcessingBegin } = useLoginBegin();
  const { email, password } = handlerLogin;

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
            <StyledRow id={`${id}__Card__Row--label`}>
              <Column id={`${id}__Card__Row__Column--label`}>
                <StyledTitle>CDX DASHBOARD</StyledTitle>
              </Column>
            </StyledRow>
            <StyledRow id={`${id}__Card__Row--label`}>
              <Column id={`${id}__Card__Row__Column--label`}>
                <StyledText>Sign in to access your dashboard</StyledText>
              </Column>
            </StyledRow>
            <StyledRow id={`${id}__Card__Row--Email`}>
              <Column id={`${id}__Card__Row__Column--Email`}>
                <InputText
                  id={`${id}__Card__Row__Input-Email`}
                  autoFocus
                  disabled={handlerLogin.isProcessing || isValidEmail}
                  errorMessage={isValidEmail ? '' : handlerLogin.validationError}
                  {...email}
                />
              </Column>
              {isValidEmail && (
                <Column id={`${id}__Card__Row__Column--label`} right>
                  <StyledButtonIcon
                    id={`${id}__Card__Row__Column__Button--Edit`}
                    disabled={handlerLogin.isProcessing}
                    onClick={() => editUser()}
                    icon="edit"
                  >
                    Edit
                  </StyledButtonIcon>
                </Column>
              )}
            </StyledRow>
            {isValidEmail && (
              <StyledRow id={`${id}__Card__Row--Email`}>
                <Column id={`${id}__Card__Row__Column--Email`}>
                  <InputText
                    id={`${id}__Card__Row__Input-Email`}
                    autoFocus
                    type="password"
                    errorMessage={handlerLogin.validationError}
                    {...password}
                  />
                </Column>
              </StyledRow>
            )}
            <StyledRow id={`${id}__Card__Row--Email`}>
              <Column id={`${id}__Card__Row__Column--Email`}>
                <StyledButton
                  id={`${id}__Card__Row__Column__Button--Button`}
                  disabled={handlerLogin.isProcessing}
                  onClick={() => (isValidEmail ? handlerLogin.submitLogin() : apiBeginLogin(email.value))}
                >
                  {handlerLogin.isProcessing || isProcessingBegin ? <Spinner /> : !isValidEmail ? 'Next' : 'Login'}
                </StyledButton>
              </Column>
            </StyledRow>
          </StyledCard>
        </Column>
      </StyledRow>
    </StyledBox>
  );
};

FormLogin.propTypes = {
  id: PropTypes.string,
};

export { FormLogin };
