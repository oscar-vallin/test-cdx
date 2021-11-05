import { ReactElement } from 'react';
import { useHistory } from 'react-router-dom';
import { StyledBox, StyledNav } from './LayoutAdmin.styles';
import { LayoutDashboard } from '../LayoutDashboard';
import { getRouteByApiId } from '../../data/constants/RouteConstants';
import { Spinner } from '../../components/spinners/Spinner';
import { Spacing } from '../../components/spacings/Spacing';

import { useOrgSid } from '../../hooks/useOrgSid';
import { useActiveDomainStore } from '../../store/ActiveDomainStore';

const defaultProps = {
  id: '',
  // menuOptionSelected: 'admin',
  // sidebarOptionSelected: '',
  // children: '',
};

type LayoutAdminProps = {
  id?: string;
  menuOptionSelected?: string;
  sidebarOptionSelected?: string;
  children?: ReactElement | string;
} & typeof defaultProps;

type mapProps = {
  type?: string;
  label?: string;
  destination?: string;
  subNavItems?: { type: string }[] | any;
};

const parseLinks = (links = [], sidebarOpt: string) => {
  return links.map(({ type, label, destination, subNavItems }: mapProps) => ({
    name: label,
    ...(subNavItems
      ? {
          isExpanded: subNavItems.find((item) => item.type === sidebarOpt),
          links: parseLinks(subNavItems, ''),
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

const LayoutAdmin = ({
  id,
  menuOptionSelected = 'admin',
  sidebarOptionSelected = '',
  children,
}: LayoutAdminProps): ReactElement => {
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
            onLinkClick={(evt: any, route: { links: string; url: string }) => {
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

LayoutAdmin.defaultProps = defaultProps;

export { LayoutAdmin };
