import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { UserToken } from '../../../components/images/UserToken';
import { useAuthContext } from '../../../contexts/AuthContext';

// Components

// Hooks

// Styles
import { StyledBox } from './ProfileMenu.styles';
import { ButtonContextual } from '../../../components/buttons/ButtonContextual';

const ProfileMenu = ({ id = '__ProfileMenu' }) => {
  const { authLogout } = useAuthContext();
  const history = useHistory();

  const userName = localStorage.getItem('USER_NAME');

  //* HandleLogout
  const handleLogout = () => {
    authLogout();
    history.push('/');
  };

  const items = [
    { key: 'ProfileMenu_ChangePassword', text: 'Change Password', onClick: () => console.log('Change Password') },
    { key: 'ProfileMenu_DarkMode', text: 'Dark Mode', onClick: () => console.log('Dark Mode') },
    { key: 'ProfileMenu_Logout', text: 'Logout', onClick: () => handleLogout() },
  ];

  // Render
  return (
    <StyledBox id={id} noStyle>
      <ButtonContextual items={items}>
        <UserToken name={userName} />
      </ButtonContextual>
    </StyledBox>
  );
};

ProfileMenu.propTypes = {
  id: PropTypes.string,
};

export { ProfileMenu };
