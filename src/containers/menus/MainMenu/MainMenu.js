import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// Components

// Hooks
import { useHistory, useLocation } from 'react-router-dom';

// Styles
import queryString from 'query-string';
import { StyledRow, StyledColumn, StyledMenuButton, StyledButtonIcon } from './MainMenu.styles';

import { ROUTES, ROUTES_ID, getRouteByApiId } from '../../../data/constants/RouteConstants';
import { OutsideComponent } from './OutsideComponent';
import { useActiveDomainStore } from '../../../store/ActiveDomainStore';

// CardSection is called directly cause a restriction warning for that component.
const MainMenu = ({ id = '__MainMenu', option = ROUTES.ROUTE_DASHBOARD.ID, left, changeCollapse }) => {
  const ActiveDomainStore = useActiveDomainStore();
  const history = useHistory();
  const location = useLocation();
  const { search } = location;
  const [filterParam, _setFilterParam] = useState(search);
  const [collapse, setCollapse] = React.useState();

  const collapseNavMenu = () => {
    setCollapse(!collapse);
    changeCollapse();
  };

  const renderOptions = () => {
    return ActiveDomainStore.nav.dashboard.map((menuOption, index) => {
      const opt = getRouteByApiId(menuOption.label !== 'Admin' ? menuOption.destination : 'ADMIN');

      return opt.MAIN_MENU ? (
        <StyledColumn
          id={`${id}__MainMenu__Row-${opt.ID}-${index}`}
          key={`${id}__MainMenu__Row-${opt.ID}-${index}`}
          noStyle
        >
          <StyledMenuButton
            selected={location.pathname === opt.URL}
            collapse={collapse}
            onClick={() => {
              history.push(opt.URL);
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
      <StyledRow id={`${id}__MainMenu--Row`} left={left} collapse={collapse}>
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

MainMenu.propTypes = {
  changeCollapse: PropTypes.func,
  id: PropTypes.string,
};

export { MainMenu };
