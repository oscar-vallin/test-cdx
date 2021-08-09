import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// Components

// Hooks
import { useHistory, useLocation } from 'react-router-dom';

// Styles
import { StyledRow, StyledColumn, StyledMenuButton, StyledButtonIcon } from './MainMenu.styles';

import { ROUTES_ARRAY, ROUTES, ROUTES_ID, URL_ROUTES } from '../../../data/constants/RouteConstants';
import { OutsideComponent } from './OutsideComponent';
import { useAuthContext } from './../../../contexts/AuthContext';
import { useUserDomain } from './../../../contexts/hooks/useUserDomain';
import { getRouteByApiId } from './../../../data/constants/RouteConstants';
import { useNavigateToNewDomainLazyQuery } from './../../../data/services/graphql';
import queryString from 'query-string';
import { useOrgSid } from '../../../hooks/useOrgSid';

// CardSection is called directly cause a restriction warning for that component.
const MainMenu = ({ id = '__MainMenu', option = ROUTES.ROUTE_DASHBOARD.ID, left, changeCollapse }) => {
  const history = useHistory();
  const location = useLocation();
  const { search } = location;
  const [filterParam, _setFilterParam] = useState(search);
  const filter = new URLSearchParams(filterParam).get('filter');
  const [collapse, setCollapse] = React.useState();
  const { authData } = useAuthContext();
  const { orgSid } = useOrgSid();

  const [domain, setDomain] = useState({
    navItems: [],
  });

  const cache = localStorage.getItem('DASHBOARD_NAV');

  const [fetchNav, { data, loading, error }] = useNavigateToNewDomainLazyQuery({
    variables: {
      domainNavInput: {
        orgSid,
        appDomain: 'DASHBOARD',
        selectedPage: 'DASHBOARD',
      },
    },
  });

  useEffect(() => {
    if (orgSid) {
      fetchNav();
    }
  }, [orgSid]);

  useEffect(() => {
    if (cache) {
      const domain = JSON.parse(cache);

      setDomain(domain);

      return;
    }

    if (data && !loading) {
      const { navigateToNewDomain: domain } = data;

      localStorage.setItem('DASHBOARD_NAV', JSON.stringify(domain));

      setDomain(domain);

      return;
    }
  }, [data, loading]);

  const collapseNavMenu = () => {
    setCollapse(!collapse);
    changeCollapse();
  };

  const renderOptions = () => {
    const { authData } = useAuthContext();

    return domain.navItems.map((menuOption) => {
      const page = menuOption?.page;
      const opt = getRouteByApiId(menuOption.label !== 'Admin' ? page?.type : 'ADMIN');

      return opt.MAIN_MENU ? (
        <StyledColumn id={`${id}__MainMenu__Row-${opt.ID}`} key={`${id}__MainMenu__Row-${opt.ID}`} noStyle>
          <StyledMenuButton
            selected={location.pathname === opt.URL}
            collapse={collapse}
            onClick={() => {
              const { parameters } = page;

              const search = queryString.parse(location.search);

              const urlResult = parameters
                .map(({ name, idValue }) => {
                  if (name === 'orgSid') {
                    return `orgSid=${search.orgSid || idValue}`;
                  }

                  return `${name}=${idValue}`;
                })
                .join('&');

              let url = `${opt.URL}?${urlResult}`;

              if (opt.URL === `/${ROUTES_ID.FILE_STATUS}`) {
                url = `${url}&filter=${filter || ''}`;
              }

              history.push(url);
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
