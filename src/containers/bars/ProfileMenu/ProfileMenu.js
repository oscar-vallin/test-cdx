import React from 'react';
import PropTypes from 'prop-types';
// Components

// Hooks
import { useMenu } from './ProfileMenu.services';
// Styles
import { StyledBox, StyledRow, StyledColumn, StyledButtonMenu } from './ProfileMenu.styles';

// CardSection is called directly cause a restriction warning for that component.
const ProfileMenu = ({ id = '__ProfileMenu' }) => {
  const handleMenu = useMenu();

  return (
    <StyledBox id={id} sm="12" open={handleMenu.opened}>
      <StyledRow id={`${id}__Card--Row`}>
        <StyledColumn id={`${id}__Card__Row-Column`}>
          <StyledButtonMenu />
        </StyledColumn>
      </StyledRow>
    </StyledBox>
  );
};

ProfileMenu.propTypes = {
  id: PropTypes.string,
};

export { ProfileMenu };
