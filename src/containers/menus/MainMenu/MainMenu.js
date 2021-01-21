import React from 'react';
import PropTypes from 'prop-types';
// Components

// Hooks
import { useHistory, useLocation } from 'react-router-dom';

// Styles
import { StyledBox, StyledRow, StyledColumn, StyledMenuButton } from './MainMenu.styles';

import { ROUTES_ARRAY, ROUTES } from '../../../data/constants/RouteConstants';

// CardSection is called directly cause a restriction warning for that component.
const MainMenu = ({ id = '__MainMenu', option = ROUTES.ROUTE_DASHBOARD.ID, left }) => {
  const history = useHistory();
  const location = useLocation();

  const renderOptions = () => {
    return ROUTES_ARRAY.map((menuOption) => {
      return menuOption.MAIN_MENU ? (
        <StyledColumn
          id={`${id}__MainMenu__Row-${menuOption.ID}`}
          key={`${id}__MainMenu__Row-${menuOption.ID}`}
          noStyle
        >
          <StyledMenuButton
            selected={location.pathname === menuOption.URL}
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
    <StyledBox id={id} sm="12">
      <StyledRow id={`${id}__MainMenu--Row`} left={left}>
        {renderOptions()}
      </StyledRow>
    </StyledBox>
  );
};

MainMenu.propTypes = {
  id: PropTypes.string,
};

export { MainMenu };
