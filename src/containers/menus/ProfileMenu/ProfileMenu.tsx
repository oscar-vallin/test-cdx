import { ReactElement } from 'react';
import { UserToken } from '../../../components/images/UserToken';

import { StyledBox } from './ProfileMenu.styles';
import { ButtonContextual } from '../../../components/buttons/ButtonContextual';

import { useLogoutUseCase } from '../../../use-cases/Authentication';
import { useSessionStore } from '../../../store/SessionStore';

const defaultProps = {
  id: '',
  onUserSettings: () => null,
};

type ProfileMenuProps = {
  id?: string;
  onUserSettings?: any | null;
} & typeof defaultProps;

const ProfileMenu = ({ id, onUserSettings }: ProfileMenuProps): ReactElement => {
  const SessionStore = useSessionStore();
  const { performUserLogout } = useLogoutUseCase();

  const handleLogout = () => {
    performUserLogout();
    return null;
  };

  const handleSettings = () => {
    onUserSettings();
    return null;
  };

  const items = [
    {
      id: '__ProfileMenu_UserSettingsId',
      key: 'ProfileMenu_UserSettings',
      text: 'Settings',
      // onClick: (event: any): null => {
      //   event.preventDefault();

      //   onUserSettings();
      //   return null;
      // },
      onClick: handleSettings,
    },
    { id: '__Logout_button', key: 'ProfileMenu_Logout', text: 'Logout', onClick: handleLogout },
  ];

  // Render
  return (
    <StyledBox id={id} noStyle>
      <ButtonContextual id="__ButtonContext" items={items}>
        <UserToken id="__UserToken" name={SessionStore.user.firstNm} />
      </ButtonContextual>
    </StyledBox>
  );
};

ProfileMenu.defaultProps = defaultProps;

export { ProfileMenu };
