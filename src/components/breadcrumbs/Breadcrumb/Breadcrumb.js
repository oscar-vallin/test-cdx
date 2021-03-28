import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Breadcrumb } from 'office-ui-fabric-react/lib/Breadcrumb';
import { ROUTE_DASHBOARD } from '../../../data/constants/RouteConstants';

// import {
//   StyledBox,
// } from './Breadcrumb.styles.js';

const parseBreadcrumbItems = (routes, onClick = () => {}) =>
  routes.map((route, index) => {
    const path = { text: route.TITLE, key: route.ID };

    if (routes.length === index + 1) {
      return { ...path, isCurrentItem: route.isCurrentItem, as: 'h4' };
    }

    return {
      ...path,
      onClick: () => onClick(route.URL),
    };
  });

const CDXBreadcrumb = ({ id = '__CDXBreadcrumb', items = [] }) => {
  const history = useHistory();

  return <Breadcrumb items={parseBreadcrumbItems([ROUTE_DASHBOARD, ...items], history.push)} id={id} />;
};

export const BreadCrumbs = ({ id = '__CDXBreadcrumb', items = [] }) => {
  const history = useHistory();

  return <Breadcrumb items={parseBreadcrumbItems([...items], history.push)} id={id} />;
};

CDXBreadcrumb.propTypes = {
  id: PropTypes.string,
};

export { CDXBreadcrumb };
