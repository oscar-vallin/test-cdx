import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { ROUTE_USER_SETTINGS } from '../../data/constants/RouteConstants';

import { NavBar } from '../../containers/bars/NavBar';
import { StyleConstants } from '../../data/constants/StyleConstants';
import { BoxStyled } from './LayoutDashboard.styles';

const LayoutDashboard = ({ id = 'LayoutDashboard', menuOptionSelected = 'dashboard', showMenu = true, children }) => {
  const history = useHistory();

  return (
    <Fragment>
      <BoxStyled id={`${id}__Box`} direction={StyleConstants.DIRECTION_COLUMN} top>
        <NavBar
          visible={showMenu}
          menuOptionSelected={menuOptionSelected}
          onUserSettings={() => history.push(ROUTE_USER_SETTINGS.URL)}
        />

        {children}
      </BoxStyled>
    </Fragment>
  );
};

LayoutDashboard.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  direction: PropTypes.string,
};

export { LayoutDashboard };
