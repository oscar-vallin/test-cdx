import React from 'react';
import PropTypes from 'prop-types';
import { Breadcrumb } from 'office-ui-fabric-react/lib/Breadcrumb';
import { ROUTE_DASHBOARD } from '../../../data/constants/RouteConstants';

// import {
//   StyledBox,
// } from './Breadcrumb.styles.js';

const parseBreadcrumbItems = routes => routes.map((route, index) => {
  const path = { text: route.TITLE, key: route.ID };

  if (routes.length === index + 1) {
    return { ...path, isCurrentItem: route.isCurrentItem, as: 'h4', };
  }

  /* TODO: Redirect to page */
  return {
    ...path,
    onClick: () => { alert(route.TITLE) },
  };
});

const CDXBreadcrumb = ({ id = '__CDXBreadcrumb', items = []  }) => {
  return <Breadcrumb items={parseBreadcrumbItems([ROUTE_DASHBOARD, ...items])} id={id} />;
};

CDXBreadcrumb.propTypes = {
  id: PropTypes.string,
};

export { CDXBreadcrumb };
