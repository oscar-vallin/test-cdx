/* eslint-disable no-shadow */
/* eslint-disable react-hooks/rules-of-hooks */
import { ReactElement, useState } from 'react';
// Components

// Hooks
import { useHistory, useLocation } from 'react-router-dom';

// Styles

import { getRouteByApiId } from 'src/data/constants/RouteConstants';
import { useActiveDomainStore } from 'src/store/ActiveDomainStore';
import { useOrgSid } from 'src/hooks/useOrgSid';
import { OutsideComponent } from './OutsideComponent';
import { StyledRow, StyledColumn, StyledMenuButton, StyledButtonIcon } from './MainMenu.styles';

const defaultProps = {
  id: '',
  left: false,
  option: '',
};

type MainMenuProps = {
  id?: string;
  left?: boolean;
  changeCollapse?: any | null;
  option?: string;
} & typeof defaultProps;

const MainMenu = ({ id, changeCollapse }: MainMenuProps): ReactElement => {
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
          id="__MainMenu"
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
