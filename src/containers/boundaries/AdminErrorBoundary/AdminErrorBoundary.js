import { MessageBarType } from '@fluentui/react';
import { MessageBar } from 'office-ui-fabric-react';
import { useHistory } from 'react-router-dom';
import { StyledBox, StyledNav } from '../../../layouts/LayoutAdmin/LayoutAdmin.styles';
import { StyledColumn } from './AdminErrorBoundary.styles';
import { LayoutDashboard } from '../../../layouts/LayoutDashboard';
import { Row } from '../../../components/layouts';
import { getRouteByApiId } from '../../../data/constants/RouteConstants';

import { useActiveDomainStore } from '../../../store/ActiveDomainStore';

const parseLinks = (links = [], sidebarOpt) => {
  return links.map(({ type, label, destination, subNavItems, page }) => ({
    name: label,
    ...(subNavItems
      ? {
          isExpanded: subNavItems.find((item) => item.type === sidebarOpt),
          links: parseLinks(subNavItems),
        }
      : {}),
    ...(destination
      ? {
          url: getRouteByApiId(destination)?.URL,
          key: type,
          // params: page.parameters,
          // commands: page.commands,
        }
      : {}),
  }));
};

const AdminErrorBoundary = ({
  id = 'AdminErrorBoundary',
  menuOptionSelected = 'admin',
  sidebarOptionSelected = '',
}) => {
  const history = useHistory();
  const ActiveDomainStore = useActiveDomainStore();

  return (
    <LayoutDashboard id={id} menuOptionSelected={menuOptionSelected} showMenu={false}>
      <StyledBox>
        <StyledNav
          selectedKey={sidebarOptionSelected}
          groups={[{ links: parseLinks(ActiveDomainStore.nav.admin, sidebarOptionSelected) }]}
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
