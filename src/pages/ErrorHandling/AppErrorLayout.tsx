import React, { ReactElement } from 'react';
import { LayoutLogin } from 'src/layouts/LayoutLogin';
import {
  Card500, CenteredWrapper, K2ULogo, LogoRow,
} from 'src/layouts/LayoutLogin/LayoutLogin.styles';
import { Column } from 'src/components/layouts';
import { FormRow } from 'src/components/layouts/Row/Row.styles';
import { Button } from 'src/components/buttons';
import { useActiveDomainUseCase } from 'src/use-cases/ActiveDomain';
import { useActiveDomainStore } from 'src/store/ActiveDomainStore';

type AppErrorLayoutType = {
  id: string;
  children?: ReactElement | any;
};

const AppErrorLayout = ({ id, children }: AppErrorLayoutType) => {
  const ActiveDomain = useActiveDomainUseCase();
  const ActiveDomainStore = useActiveDomainStore();

  return (
    <LayoutLogin id={`${id}_Container`}>
      <CenteredWrapper id="__FormWrap">
        <LogoRow id="__Logo--Row">
          <Column id="__Logo__Row-Column">
            <K2ULogo name="logo" alt="Known2U Logo" />
          </Column>
        </LogoRow>
        <FormRow>
          <Column id="__FormBody">
            <Card500>
              {children}
              <FormRow>
                <Column>
                  <Button
                    onClick={() => {
                      ActiveDomain.setCurrentOrg(ActiveDomainStore.domainOrg.origin.orgSid);
                    }}
                  >
                    Click here to return home
                  </Button>
                </Column>
              </FormRow>
            </Card500>
          </Column>
        </FormRow>
      </CenteredWrapper>
    </LayoutLogin>
  );
};

export { AppErrorLayout };
