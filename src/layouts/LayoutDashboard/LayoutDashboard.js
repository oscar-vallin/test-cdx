import React from 'react';
import PropTypes from 'prop-types';
import { NavBar } from '../../containers/bars/NavBar';
import { StyleConstants } from '../../data/constants/StyleConstants';
import { BoxStyled } from './LayoutDashboard.styles';
import { Breadcrumb } from '../../components/breadcrumbs/Breadcrumb';
import { ROUTE_FILE_STATUS } from '../../data/constants/RouteConstants';

const LayoutDashboard = ({ id = 'LayoutDashboard', menuOptionSelected = 'dashboard', routeId, children }) => {
  const breadcrumbItems = [routeId, { ID: 'work-packet-details', TITLE: 'Work Packet Details' }];

  return (
    <BoxStyled id={`${id}__Box`} direction={StyleConstants.DIRECTION_COLUMN} top>
      <NavBar menuOptionSelected={menuOptionSelected} />
      {/* <Breadcrumb items={{ text: ROUTE_FILE_STATUS.TITLE, key: ROUTE_FILE_STATUS.API_ID }} /> */}
      {children}
    </BoxStyled>
  );
};

LayoutDashboard.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  direction: PropTypes.string,
};

export { LayoutDashboard };
