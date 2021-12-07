import { ReactElement } from 'react';
import { useHistory } from 'react-router-dom';
import { SpinnerSize } from '@fluentui/react';
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
  return links.map(({ label, destination, subNavItems }: mapProps) => ({
    name: label,
    ...(subNavItems
      ? {
          isExpanded: subNavItems.find((item) => item.destination === sidebarOpt),
          links: parseLinks(subNavItems, ''),
        }
      : {}),
    ...(destination
      ? {
          url: getRouteByApiId(destination)?.URL,
          key: destination,
          // params: page.parameters,
          // commands: page.commands,
        }
      : {}),
  }));
};

export const LayoutAdmin = ({
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
          <Spinner size={SpinnerSize.large} label="Loading admin domain" />
        </Spacing>
      ) : (
        <StyledBox>
          <StyledBox>{children}</StyledBox>
        </StyledBox>
      )}
    </LayoutDashboard>
  );
};

LayoutAdmin.defaultProps = defaultProps;

export default LayoutAdmin;
