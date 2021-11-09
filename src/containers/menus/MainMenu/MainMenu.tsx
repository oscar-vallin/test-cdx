/* eslint-disable no-shadow */
/* eslint-disable react-hooks/rules-of-hooks */
import { ReactElement, useState } from 'react';
// Components

// Hooks
import { useHistory, useLocation } from 'react-router-dom';

// Styles
import { StyledRow, StyledColumn, StyledMenuButton, StyledButtonIcon } from './MainMenu.styles';

import { getRouteByApiId } from '../../../data/constants/RouteConstants';
import { OutsideComponent } from './OutsideComponent';
import { useActiveDomainStore } from '../../../store/ActiveDomainStore';
import { useOrgSid } from '../../../hooks/useOrgSid';

const defaultProps = {
  id: '',
  left: false,
  changeCollapse: () => null,
  option: '',
};

type MainMenuProps = {
  id?: string;
  left?: boolean;
  changeCollapse?: any | null;
  option?: string;
} & typeof defaultProps;

const MainMenu = ({ id, left, changeCollapse, option }: MainMenuProps): ReactElement => {
  const ActiveDomainStore = useActiveDomainStore();
  const history = useHistory();
  const location = useLocation();
  const { orgSid } = useOrgSid();

  const [collapse, setCollapse] = useState(false);

  const collapseNavMenu = () => {
    setCollapse(!collapse);
    changeCollapse();

    return null;
  };

  const renderOptions = () => {
    return ActiveDomainStore.nav.dashboard.map((menuOption: { label: string; destination: string }, index: any) => {
      const opt:
        | {
            ID?: string;
            TITLE?: string;
            URL?: string;
            MAIN_MENU?: boolean;
            API_ID?: string;
          }
        | any = getRouteByApiId(menuOption.label !== 'Admin' ? menuOption.destination : 'ADMIN');

      return opt.MAIN_MENU ? (
        <StyledColumn
          id={`${id}__MainMenu__Row-${opt.ID}-${index}`}
          key={`${id}__MainMenu__Row-${opt.ID}-${index}`}
          noStyle
        >
          <StyledMenuButton
            selected={location.pathname === opt.URL}
            id={`__MainMenuId-${menuOption.label}`}
            collapse={collapse}
            icon="MainMenu"
            disabled={false}
            onClick={() => {
              history.push(`${opt.URL}?orgSid=${orgSid}`);
              return null;
            }}
          >
            {menuOption.label}
          </StyledMenuButton>
        </StyledColumn>
      ) : null;
    });
  };

  // Render
  return (
    <OutsideComponent id={id} collapseClick={collapseNavMenu} hide={collapse}>
      <StyledRow id={`${id}__MainMenu--Row`} collapse={collapse}>
        <StyledButtonIcon
          icon="BulletedListText"
          disabled={false}
          variant="navbar"
          size={18}
          onClick={collapseNavMenu}
        />
        {renderOptions()}
      </StyledRow>
    </OutsideComponent>
  );
};

MainMenu.defaultProps = defaultProps;

export { MainMenu };
