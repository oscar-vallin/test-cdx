import React, { useEffect } from 'react';
import { MessageBar, MessageBarType } from '@fluentui/react';
import { LayoutLogin } from 'src/layouts/LayoutLogin';
import { useSessionStore } from 'src/store/SessionStore';
import { useLoginUseCase } from 'src/use-cases/Authentication';
import { StyledRow } from 'src/containers/forms/FormLogin/FormLogin.styles';
import { Card500 } from 'src/layouts/LayoutLogin/LayoutLogin.styles';
import { Column } from 'src/components/layouts';

const SSOLoginPage = () => {
  const SessionStore = useSessionStore();
  const { callCurrentUser, state } = useLoginUseCase();

  useEffect(() => {
    callCurrentUser();
  }, []);

  useEffect(() => {
    if (state.error) {
      SessionStore.setGlobalError(state.error);
    } else {
      SessionStore.setGlobalError(null);
    }
  }, [state]);

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
    <LayoutLogin id="SSOLogin">
      <Card500 id="SSOLoginCard">
        <StyledRow id="SSOLoginCard__Row--label">
          <Column id="SSOLoginCard__Row__Column--label">
            Signing you in...
          </Column>
        </StyledRow>
        {renderGlobalError()}
      </Card500>
    </LayoutLogin>
  );
};

export { SSOLoginPage };
