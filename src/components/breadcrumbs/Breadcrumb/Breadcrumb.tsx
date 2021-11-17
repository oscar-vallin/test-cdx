import { ReactElement } from 'react';
import { useHistory } from 'react-router-dom';
import { Breadcrumb } from '@fluentui/react/lib-commonjs/Breadcrumb';
import { ROUTE_DASHBOARD } from '../../../data/constants/RouteConstants';

const parseBreadcrumbItems = (
  routes: parseBreadcrumbItemsProps[],
  onClick = (param: any) => param
): parseBreadcrumbItemsReturnProps[] =>
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

//
const defaultProps = {
  id: '',
  items: [{ ID: '', TITLE: '', URL: '', MAIN_MENU: true, API_ID: '' }],
  onClick: () => null,
};

type CDXBreadcrumbProps = {
  id?: string;
  items?: parseBreadcrumbItemsProps[] | any;
  onClick?: any | undefined;
} & typeof defaultProps;

const CDXBreadcrumb = ({ id, items, onClick, ...props }: CDXBreadcrumbProps): ReactElement => {
  const history = useHistory();

  return (
    <Breadcrumb
      items={parseBreadcrumbItems([ROUTE_DASHBOARD, ...items], onClick || history?.push)}
      id={id}
      {...props}
    />
  );
};

type parseBreadcrumbItemsProps = {
  TITLE: string;
  ID: string;
  isCurrentItem?: boolean;
  URL: string;
  MAIN_MENU: boolean;
  API_ID: string;
};

type parseBreadcrumbItemsReturnProps = {
  text: string;
  key: string;
  isCurrentItem?: boolean;
  as?: 'h4';
};

CDXBreadcrumb.defaultProps = defaultProps;

export { CDXBreadcrumb };
