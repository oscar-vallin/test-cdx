import { ReactElement } from 'react';
import { SpinnerSize } from '@fluentui/react';
import { StyledBox } from './LayoutAdmin.styles';
import { LayoutDashboard } from '../LayoutDashboard';
import { getRouteByApiId } from 'src/data/constants/RouteConstants';
import { Spinner } from 'src/components/spinners/Spinner';
import { Spacing } from 'src/components/spacings/Spacing';

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
  children,
}: LayoutAdminProps): ReactElement => {

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
