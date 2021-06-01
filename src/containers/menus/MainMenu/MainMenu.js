import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
// Components

// Hooks
import { useHistory, useLocation } from 'react-router-dom';

// Styles
import { StyledRow, StyledColumn, StyledMenuButton, StyledButtonIcon } from './MainMenu.styles';

import { ROUTES_ARRAY, ROUTES, ROUTES_ID, URL_ROUTES } from '../../../data/constants/RouteConstants';
import { OutsideComponent } from './OutsideComponent';
// CardSection is called directly cause a restriction warning for that component.
const MainMenu = ({ id = '__MainMenu', option = ROUTES.ROUTE_DASHBOARD.ID, left, changeCollapse }) => {
  const history = useHistory();
  const location = useLocation();
  const [collapse, setCollapse] = React.useState();
  const navItems = (option !== ROUTES_ID.ADMIN)
    ? ROUTES_ARRAY
    : [
        {
          ID: 'USER_DOMAIN',
          TITLE: 'Return to User Domain',
          URL: URL_ROUTES.DASHBOARD,
          MAIN_MENU: true,
        } 
      ];

  const collapseNavMenu = () => {
    setCollapse(!collapse);
    changeCollapse();
  };

  const renderOptions = () => {
    return navItems.map((menuOption) => {
      return menuOption.MAIN_MENU ? (
        <StyledColumn
          id={`${id}__MainMenu__Row-${menuOption.ID}`}
          key={`${id}__MainMenu__Row-${menuOption.ID}`}
          noStyle
        >
          <StyledMenuButton
            selected={location.pathname === menuOption.URL}
            collapse={collapse}
            onClick={() => {
              history.push(menuOption.URL);
            }}
          >
            {menuOption.TITLE}
          </StyledMenuButton>
        </StyledColumn>
      ) : null;
    });
  };

  // Render
  return (
    <OutsideComponent id={id} collapseClick={collapseNavMenu} hide={collapse}>
      <StyledRow id={`${id}__MainMenu--Row`} left={left} collapse={collapse}>
        <StyledButtonIcon
          icon="BulletedListText"
          disabled={false}
          variant={'navbar'}
          size={18}
          onClick={collapseNavMenu}
        />

        {renderOptions()}
      </StyledRow>
    </OutsideComponent>
  );
};

MainMenu.propTypes = {
  changeCollapse: PropTypes.func,
  id: PropTypes.string,
};

export { MainMenu };
