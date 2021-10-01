import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Breadcrumb } from '@fluentui/react/lib-commonjs/Breadcrumb';
import { ROUTE_DASHBOARD } from '../../../data/constants/RouteConstants';

const parseBreadcrumbItems = (
  routes,
  onClick = () => {
    return {};
  }
) =>
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

const CDXBreadcrumb = ({
  id,
  items = [],
  onClick = () => {
    return {};
  },
}) => {
  const history = useHistory();

  return <Breadcrumb items={parseBreadcrumbItems([ROUTE_DASHBOARD, ...items], onClick || history.push)} id={id} />;
};

export const BreadCrumbs = ({
  id,
  items = [],
  onClick = () => {
    return {};
  },
}) => {
  const history = useHistory();

  return <Breadcrumb items={parseBreadcrumbItems([...items], onClick || history.push)} id={id} />;
};

CDXBreadcrumb.propTypes = {
  id: PropTypes.string,
};

export { CDXBreadcrumb };
