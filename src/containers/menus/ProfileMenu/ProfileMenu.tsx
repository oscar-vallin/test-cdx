import React, { ReactElement, useEffect, useState } from 'react';
import { IContextualMenuItem } from '@fluentui/react';
import { UserToken } from 'src/components/images/UserToken';
import { ButtonContextual } from 'src/components/buttons/ButtonContextual';
import { useLogoutUseCase } from 'src/use-cases/Authentication';
import { useSessionStore } from 'src/store/SessionStore';
import { useApplicationStore } from 'src/store/ApplicationStore';
import { UserProfilePanel } from 'src/pages/UserSettings/UserProfile';
import { PasswordChangePanel } from 'src/pages/UserSettings/PasswordChange';
import { AlertsPanel } from 'src/pages/UserSettings/Alerts';
import { ChangeThemePanel } from 'src/pages/UserSettings/ChangeTheme';
import { StyledBox } from './ProfileMenu.styles';

const defaultProps = {
  id: '',
};

type ProfileMenuProps = {
  id?: string;
  onUserSettings?: () => void | null;
} & typeof defaultProps;

const _ProfileMenu = ({ id, onUserSettings }: ProfileMenuProps): ReactElement => {
  const SessionStore = useSessionStore();
  const { performUserLogout } = useLogoutUseCase();
  const ApplicationStore = useApplicationStore();
  const [isOpenPanel, setIsOpenPanel] = useState(false);
  const [isOpenPasswordChangePanel, setIsOpenPasswordChangePanel] = useState(false);
  const [isOpenAlertsPanel, setIsAlertsPanel] = useState(false);
  const [changeTheme, setChangeThemePanel] = useState(false);

  const handleLogout = () => {
    performUserLogout();
  };

  const handleSettings = () => {
    if (onUserSettings) {
      onUserSettings();
    }
  };

  const openPanel = () => setIsOpenPanel(true);
  const openPasswordChange = () => setIsOpenPasswordChangePanel(true);
  const openAlerts = () => setIsAlertsPanel(true);
  const openChangeTheme = () => setChangeThemePanel(true);

  const buildMenuItems = (version: string): IContextualMenuItem[] => [
    {
      id: '__ProfileUser',
      key: 'ProfileMenu_Profile',
      text: 'My Profile',
      onClick: openPanel,
      iconProps: {
        iconName: 'AddFriend',
      },
    },
    {
      id: '__MyAlerts',
      key: 'ProfileMenu_Alerts',
      text: 'My Alerts',
      onClick: openAlerts,
      iconProps: {
        iconName: 'Ringer',
      },
    },
    {
      id: '__PasswordChange',
      key: 'ProfileMenu_ChangePassword',
      text: 'Change Password',
      onClick: openPasswordChange,
    },
    {
      id: '__ChangeTheme',
      key: 'ProfileMenu_ChangeTheme',
      text: 'Change theme',
      onClick: openChangeTheme,
    },
    {
      id: '__ProfileMenu_UserSettingsId',
      key: 'ProfileMenu_UserSettings',
      text: 'Settings',
      onClick: handleSettings,
    },
    {
      id: '__Logout_button', key: 'ProfileMenu_Logout', text: 'Logout', onClick: handleLogout,
    },
    {
      id: '__separator',
      key: 'ProfileMenu_Separator',
      text: '-',
      disabled: true,
    },
    {
      id: '__Version_Info',
      key: 'ProfileMenu_Version',
      text: `version ${version}`,
      disabled: true,
      style: {
        fontSize: '.75em',
      },
    },
  ];

  const [items, setItems] = useState<IContextualMenuItem[]>([]);

  useEffect(() => {
    setItems(buildMenuItems(ApplicationStore.version));

    return () => {
      setItems([]);
    };
  }, [ApplicationStore.version]);

  // Render
  return (
    <StyledBox id={id} noStyle>
      {items.length > 0 && (
        <ButtonContextual id="__ButtonContext" title="Profile menu" items={items}>
          <UserToken id="__UserToken" name={SessionStore.user.firstName} />
        </ButtonContextual>
      )}
      {isOpenPanel && <UserProfilePanel isOpen={isOpenPanel} closePanel={setIsOpenPanel} />}
      {isOpenPasswordChangePanel && (
        <PasswordChangePanel
          isOpen={isOpenPasswordChangePanel}
          closePanel={setIsOpenPasswordChangePanel}
        />
      )}
      {isOpenAlertsPanel && (
        <AlertsPanel isOpen={isOpenAlertsPanel} closePanel={setIsAlertsPanel} />
      )}
      {changeTheme && <ChangeThemePanel isOpen={changeTheme} closePanel={setChangeThemePanel} />}
    </StyledBox>
  );
};

_ProfileMenu.defaultProps = defaultProps;

const ProfileMenu = React.memo(_ProfileMenu);

export { ProfileMenu };
