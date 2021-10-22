/* eslint-disable no-shadow */
/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from 'react';
import PropTypes from 'prop-types';
// Components

// Hooks
import { useHistory, useLocation } from 'react-router-dom';

// Styles
import { StyledRow, StyledColumn, StyledMenuButton, StyledButtonIcon } from './MainMenu.styles';

import { getRouteByApiId } from '../../../data/constants/RouteConstants';
import { OutsideComponent } from './OutsideComponent';
import { useActiveDomainStore } from '../../../store/ActiveDomainStore';

const MainMenu = ({ id, left, changeCollapse }) => {
  const ActiveDomainStore = useActiveDomainStore();
  const history = useHistory();
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const orgSid = urlParams.get('orgSid') ?? '-1';

  const [collapse, setCollapse] = useState();

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
              history.push(`${opt.URL}?orgSid=${orgSid}`);
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
