import React, { memo } from 'react';
import { Text } from 'src/components/typography';
import { LayoutLogin } from 'src/layouts/LayoutLogin';
import { Card500, CenteredWrapper, K2ULogo, LogoRow } from 'src/layouts/LayoutLogin/LayoutLogin.styles';
import { Column } from 'src/components/layouts';
import { FormRow } from 'src/components/layouts/Row/Row.styles';
import { Button } from 'src/components/buttons';
import { useActiveDomainStore } from 'src/store/ActiveDomainStore';

const PageNotFound = () => {

  const ActiveDomainStore = useActiveDomainStore();

  return (
    <LayoutLogin id="NotFoundContainer">
      <CenteredWrapper id="__FormWrap">
        <LogoRow id="__Logo--Row">
          <Column id="__Logo__Row-Column">
            <K2ULogo name="logo" alt="Known2U Logo"/>
          </Column>
        </LogoRow>
        <FormRow>
          <Column id="__FormBody">
            <Card500>
              <FormRow>
                <Column>
                  <Text>The Page you are looking for cannot be found.</Text>
                </Column>
              </FormRow>
              <FormRow>
                <Column>
                  <Text>Please contact your administrator of this issue persists.</Text>
                </Column>
              </FormRow>
              <FormRow>
                <Column>
                  <Button
                    onClick={() => {
                      ActiveDomainStore.setCurrentOrg(ActiveDomainStore.domainOrg.origin);
                      return null;
                    }}>
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

const NotFoundPage = memo(PageNotFound);

export { NotFoundPage };
