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
import { useStoreActions } from 'easy-peasy';

const ProfileMenu = ({ id = '__ProfileMenu', onUserSettings }) => {
  const resetTheme = useStoreActions(({ ThemeStore }) => ThemeStore.resetTheme);
  const { authLogout } = useAuthContext();
  const history = useHistory();

  const userName = localStorage.getItem('USER_NAME');

  //* HandleLogout
  const handleLogout = () => {
    authLogout();
    resetTheme();
    history.push('/');
  };

  const items = [
    {
      key: 'ProfileMenu_UserSettings',
      text: 'Settings',
      onClick: (event) => {
        event.preventDefault();

        onUserSettings();
      },
    },
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
