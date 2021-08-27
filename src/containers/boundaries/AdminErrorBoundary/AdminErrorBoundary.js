import React, { useEffect, useState } from 'react';
import { MessageBarType } from '@fluentui/react';
import { MessageBar } from 'office-ui-fabric-react';
import { StyledBox, StyledNav } from '../../../layouts/LayoutAdmin/LayoutAdmin.styles';
import { StyledColumn } from './AdminErrorBoundary.styles';
import { LayoutDashboard } from '../../../layouts/LayoutDashboard';
import { Row, Column } from '../../../components/layouts';
import { useHistory } from 'react-router-dom';
import { getRouteByApiId } from '../../../data/constants/RouteConstants';
import { useUserDomain } from '../../../contexts/hooks/useUserDomain';

import { useOrgSid } from '../../../hooks/useOrgSid';

const parseLinks = (links = [], sidebarOpt) => {
  return links.map(({ appDomain, label, subNavItems, page }) => ({
    name: label,
    ...(subNavItems
      ? {
          isExpanded: subNavItems.find((item) => item.page.type === sidebarOpt),
          links: parseLinks(subNavItems),
        }
      : {}),
    ...(page
      ? {
          url: getRouteByApiId(page?.type)?.URL,
          key: page.type,
          params: page.parameters,
          commands: page.commands,
        }
      : {}),
  }));
};

const AdminErrorBoundary = ({
  id = 'AdminErrorBoundary',
  menuOptionSelected = 'admin',
  sidebarOptionSelected = '',
  children,
}) => {
  const { orgSid } = useOrgSid();
  const history = useHistory();
  const {
    userDomain: { organization },
    isFetchingOrgNav,
  } = useUserDomain();

  return (
    <LayoutDashboard id={id} menuOptionSelected={menuOptionSelected} showMenu={false}>
      <StyledBox>
        <StyledNav
          selectedKey={sidebarOptionSelected}
          groups={[{ links: parseLinks(organization?.navItems || [], sidebarOptionSelected) }]}
          onLinkClick={(evt, route) => {
            evt.preventDefault();

            if (!route.links) {
              history.push(route.url);
            }
          }}
        />

        <StyledBox>
          <Row>
            <StyledColumn>
              <MessageBar messageBarType={MessageBarType.error}>
                <strong variant="bold">An error occurred</strong>
                <span>&nbsp; — The desired page could not be retrieved. Please try again.</span>
              </MessageBar>
            </StyledColumn>
          </Row>
        </StyledBox>
      </StyledBox>
    </LayoutDashboard>
  );
};

export default AdminErrorBoundary;
