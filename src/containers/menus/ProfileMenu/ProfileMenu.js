import React from 'react';
import PropTypes from 'prop-types';
import { UserToken } from '../../../components/images/UserToken';
// Components

// Hooks

// Styles
import { StyledBox } from './ProfileMenu.styles';
import { ButtonContextual } from '../../../components/buttons/ButtonContextual';

const items = [
  { key: 'ProfileMenu_ChangePassword', text: 'Change Password', onClick: () => console.log('Change Password') },
  { key: 'ProfileMenu_DarkMode', text: 'Dark Mode', onClick: () => console.log('Dark Mode') },
  { key: 'ProfileMenu_Logout', text: 'Logout', onClick: () => console.log('Logout') },
];

const ProfileMenu = ({ id = '__ProfileMenu' }) => {
  // Render
  return (
    <StyledBox id={id} noStyle>
      <ButtonContextual items={items}>
        <UserToken name="Edison Sanchez" />
      </ButtonContextual>
    </StyledBox>
  );
};

ProfileMenu.propTypes = {
  id: PropTypes.string,
};

export { ProfileMenu };
