import React from 'react';
import PropTypes from 'prop-types';
// Components

import { InputText } from '../../../components/inputs/InputText';
import { Spinner } from '../../../components/spinners/Spinner';
// Hooks
import { useMainMenu } from './MainMenu.services';
// Styles
import { StyledBox, StyledRow, StyledColumn, StyledMenuButton } from './MainMenu.styles';

import { ROUTES_ARRAY, ROUTES } from '../../../data/constants/RouteConstants';

// CardSection is called directly cause a restriction warning for that component.
const MainMenu = ({ id = '__MainMenu', option = ROUTES.ROUTE_DASHBOARD.ID, left }) => {
  const [_option, setOption] = React.useState(option);

  const renderOptions = () => {
    return ROUTES_ARRAY.map((menuOption) => {
      console.log({ menuOption, _option });
      return menuOption.MAIN_MENU ? (
        <StyledColumn id={`${id}__MainMenu__Row-${menuOption.ID}`} noStyle>
          <StyledMenuButton selected={_option === menuOption.ID} onClick={() => setOption(menuOption.ID)}>
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
