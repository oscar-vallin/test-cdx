import React, { useEffect, useState } from 'react';
import { PageHeader } from 'src/containers/headers/PageHeader';
import { LayoutDashboard } from 'src/layouts/LayoutDashboard';
import { Text } from 'src/components/typography/Text';
import { Column, Container, Row } from 'src/components/layouts';
import { PageTitle } from 'src/components/typography';
import { ROUTE_XCHANGE_ALERTS } from 'src/data/constants/RouteConstants';
import { useOrgSid } from 'src/hooks/useOrgSid';
import {
  useXchangeProfileAlertsLazyQuery,
  XchangeProfileAlerts,
  CdxWebCommandType,
  WebCommand,
} from 'src/data/services/graphql';
import { useQueryHandler } from 'src/hooks/useQueryHandler';
import { PageBody } from 'src/components/layouts/Column';
import { Spacing } from 'src/components/spacings/Spacing';
import { IconButton, Spinner, SpinnerSize } from '@fluentui/react';
import { ButtonLink } from 'src/components/buttons';
import { StyledEnvironment, StyledAlertTypes } from './XchangeAlertsPage.style';
import { StyledQualifier } from '../XchangeDetails/XchangeDetailsPage.styles';

const XchangeAlertsPage = () => {
  const { orgSid } = useOrgSid();
  const [xchangeProfileAlerts, { data: dataXchangeAlerts, loading: loadingXchangeAlerts }] = useQueryHandler(
    useXchangeProfileAlertsLazyQuery
  );

  const [xchangeAlerts, setXchangeAlerts] = useState<XchangeProfileAlerts>();

  const fetchData = () => {
    xchangeProfileAlerts({
      variables: {
        orgSid,
      },
    });
  };

  useEffect(() => {
    fetchData();
  }, [useOrgSid]);

  useEffect(() => {
    if (!loadingXchangeAlerts && dataXchangeAlerts) {
      setXchangeAlerts(dataXchangeAlerts.xchangeProfileAlerts);
    }
  }, [dataXchangeAlerts, loadingXchangeAlerts]);

  const typesAlertsRender = (alertTypes: string[]) => {
    const alerts = alertTypes ?? [];
    const typesAlert: string[] = [];
    let typeAlert = '';
    for (let alert = 0; alert < alerts?.length; alert++) {
      const splitAlerts = alerts[alert].split('_');
      if (splitAlerts.length > 1) {
        for (let j = 0; j < splitAlerts.length; j++) {
          let type = splitAlerts[j].toLocaleLowerCase()[0].toUpperCase();
          type += splitAlerts[j].substring(1).toLocaleLowerCase();
          typeAlert += j === splitAlerts.length - 1 ? `${type}` : `${type} `;
        }
        typesAlert.push(typeAlert);
        typeAlert = '';
      } else {
        let type = splitAlerts[0].toLocaleLowerCase()[0].toUpperCase();
        type += splitAlerts[0].substring(1).toLocaleLowerCase();
        typesAlert.push(type);
      }
    }

    if (typesAlert) {
      return (
        <Row>
          <Column lg="2">
            <Text variant="bold">Alert on: </Text>
          </Column>
          {typesAlert.map((type, index) => (
            <StyledAlertTypes width="130px" key={index}>
              <Column lg="2">{type}</Column>
            </StyledAlertTypes>
          ))}
        </Row>
      );
    }
    return null;
  };

  const filenameQualifier = (qualifierType: string) => {
    if (qualifierType) {
      let width = '48px';
      let color = 'blue';
      if (qualifierType === 'TEST') {
        color = 'orange';
      } else if (qualifierType === 'PROD-OE') {
        width = '60px';
      }

      return (
        <Row>
          <Spacing margin={{ bottom: 'normal' }}>
            <Column lg="2">
              <StyledQualifier width={width} color={color}>
                {qualifierType}
              </StyledQualifier>
            </Column>
          </Spacing>
        </Row>
      );
    }

    return null;
  };

  const userPermissionsIcons = (commands: WebCommand[]) => {
    const _updateCmd = commands?.find((cmd) => cmd?.commandType === CdxWebCommandType.Update);
    const _deleteCmd = commands?.find((cmd) => cmd?.commandType === CdxWebCommandType.Delete);

    return (
      <>
        {_updateCmd && (
          <Column lg="1">
            <IconButton iconProps={{ iconName: 'EditSolid12' }} style={{ paddingBottom: '10px' }} />
          </Column>
        )}
        {_deleteCmd && (
          <Column lg="1">
            <IconButton iconProps={{ iconName: 'Trash' }} style={{ paddingBottom: '10px' }} />
          </Column>
        )}
      </>
    );
  };

  const renderAlerts = () => {
    if (loadingXchangeAlerts) {
      return (
        <Spacing margin={{ top: 'double' }}>
          <Spinner size={SpinnerSize.large} label="Loading xchanges alerts" />
        </Spacing>
      );
    }

    return (
      <Container>
        <Spacing margin={{ top: 'double' }}>
          <Row>
            <Column lg="6">
              <Text variant="bold">Alerts on all Xchanges</Text>
              <Spacing margin={{ top: 'double' }}>
                {xchangeAlerts?.globalXchangeAlerts && xchangeAlerts?.globalXchangeAlerts.length <= 0 && (
                  <Text>There are no global alerts configured</Text>
                )}
              </Spacing>
              {xchangeAlerts?.globalXchangeAlerts?.map((globalAlerts) => (
                <>
                  <Spacing margin={{ bottom: 'normal' }}>
                    <Row>
                      <Column lg="2">
                        {globalAlerts?.filenameQualifier && (
                          <StyledEnvironment>{globalAlerts?.filenameQualifier}</StyledEnvironment>
                        )}
                      </Column>
                      {userPermissionsIcons(globalAlerts?.commands ?? [])}
                    </Row>
                  </Spacing>
                  {typesAlertsRender(globalAlerts?.alertTypes ?? [])}
                  <Spacing margin={{ top: 'normal', bottom: 'normal' }}>
                    <Text variant="bold">Suscribers:</Text>
                  </Spacing>
                  {globalAlerts?.subscribers?.map((subscriber) => (
                    <Row>
                      <Column lg="4">
                        <ButtonLink>{subscriber.email}</ButtonLink>
                      </Column>
                      <Column lg="4">
                        <ButtonLink>{subscriber.firstNm}</ButtonLink>
                      </Column>
                    </Row>
                  ))}
                </>
              ))}
            </Column>
            <Column lg="6">
              <Text variant="bold">Alerts on individual Xchanges</Text>
              <Spacing margin={{ top: 'double' }}>
                {xchangeAlerts?.individualXchangeAlerts && xchangeAlerts?.individualXchangeAlerts.length <= 0 && (
                  <Text>There are no Xchange specific alerts configured</Text>
                )}
              </Spacing>
              {xchangeAlerts?.individualXchangeAlerts?.map((individualAlerts) => (
                <>
                  <Spacing margin={{ bottom: 'normal', top: 'normal' }}>
                    <Row>
                      <Column lg="3">
                        <ButtonLink>{individualAlerts.coreFilename}</ButtonLink>
                      </Column>
                      {userPermissionsIcons(individualAlerts?.commands ?? [])}
                    </Row>
                  </Spacing>
                  {filenameQualifier(individualAlerts.filenameQualifier ?? '')}
                  {typesAlertsRender(individualAlerts?.alertTypes ?? [])}
                  <Spacing margin={{ top: 'normal', bottom: 'normal' }}>
                    <Text variant="bold">Suscribers:</Text>
                  </Spacing>
                  {individualAlerts?.subscribers?.map((subscriber, index) => (
                    <Row key={index}>
                      <Column lg="3">
                        <ButtonLink>{subscriber.firstNm}</ButtonLink>
                      </Column>
                      <Column lg="4">
                        <ButtonLink>{subscriber.email}</ButtonLink>
                      </Column>
                    </Row>
                  ))}
                </>
              ))}
            </Column>
          </Row>
        </Spacing>
      </Container>
    );
  };

  return (
    <LayoutDashboard id="XchangeAlertsPage" menuOptionSelected={ROUTE_XCHANGE_ALERTS.API_ID}>
      <PageHeader id="__XchangeAlertsHeader">
        <Container>
          <Row>
            <Column lg="6" direction="row">
              <PageTitle id="__Page_Title_Alerts" title="Xchange Alerts" />
            </Column>
          </Row>
        </Container>
      </PageHeader>
      <PageBody>{renderAlerts()}</PageBody>
    </LayoutDashboard>
  );
};

export { XchangeAlertsPage };
