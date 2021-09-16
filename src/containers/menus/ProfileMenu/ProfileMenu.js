import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { UserToken } from '../../../components/images/UserToken';

import { StyledBox } from './ProfileMenu.styles';
import { ButtonContextual } from '../../../components/buttons/ButtonContextual';

import { useLogoutUseCase } from '../../../use-cases/Authentication';
import { useSessionStore } from '../../../store/SessionStore';

const ProfileMenu = ({ id = '__ProfileMenu', onUserSettings }) => {
  const SessionStore = useSessionStore();
  const { performUserLogout } = useLogoutUseCase();

  const items = [
    {
      key: 'ProfileMenu_UserSettings',
      text: 'Settings',
      onClick: (event) => {
        event.preventDefault();

        onUserSettings();
      },
    },
    { key: 'ProfileMenu_Logout', text: 'Logout', onClick: performUserLogout },
  ];

  // Render
  return (
    <StyledBox id={id} noStyle>
      <ButtonContextual items={items}>
        <UserToken name={SessionStore.user.firstNm} />
      </ButtonContextual>
    </StyledBox>
  );
};

ProfileMenu.propTypes = {
  id: PropTypes.string,
};

export { ProfileMenu };
