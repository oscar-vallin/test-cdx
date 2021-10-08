import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { StyledBox, StyledNav } from './LayoutAdmin.styles';
import { LayoutDashboard } from '../LayoutDashboard';
import { getRouteByApiId } from '../../data/constants/RouteConstants';
import { Spinner } from '../../components/spinners/Spinner';
import { Spacing } from '../../components/spacings/Spacing';

import { useOrgSid } from '../../hooks/useOrgSid';
import { useActiveDomainStore } from '../../store/ActiveDomainStore';

const parseLinks = (links = [], sidebarOpt) => {
  return links.map(({ type, label, destination, subNavItems }) => ({
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

const LayoutAdmin = ({ id, menuOptionSelected = 'admin', sidebarOptionSelected = '', children }) => {
  const { orgSid } = useOrgSid();
  const history = useHistory();
  const ActiveDomainStore = useActiveDomainStore();

  const isFetchingOrgNav = false;

  return (
    <LayoutDashboard id={id} menuOptionSelected={menuOptionSelected} showMenu={false}>
      {isFetchingOrgNav ? (
        <Spacing margin={{ top: 'double' }}>
          <Spinner size="lg" label="Loading admin domain" />
        </Spacing>
      ) : (
        <StyledBox>
          <StyledNav
            selectedKey={sidebarOptionSelected}
            groups={[{ links: parseLinks(ActiveDomainStore.nav.admin, sidebarOptionSelected) }]}
            onLinkClick={(evt, route) => {
              evt.preventDefault();

              if (!route.links) {
                history.push(`${route.url}?orgSid=${orgSid}`);
              }
            }}
          />

          <StyledBox>{children}</StyledBox>
        </StyledBox>
      )}
    </LayoutDashboard>
  );
};

LayoutAdmin.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export { LayoutAdmin };
