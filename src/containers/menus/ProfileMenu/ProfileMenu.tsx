import React, { ReactElement, useEffect, useState } from 'react';
import { IContextualMenuItem } from '@fluentui/react';
import { UserToken } from 'src/components/images/UserToken';
import { ButtonContextual } from 'src/components/buttons/ButtonContextual';
import { useLogoutUseCase } from 'src/use-cases/Authentication';
import { useSessionStore } from 'src/store/SessionStore';
import { useApplicationStore } from 'src/store/ApplicationStore';
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

  const handleLogout = () => {
    performUserLogout();
  };

  const handleSettings = () => {
    if (onUserSettings) {
      onUserSettings();
    }
  };

  const buildMenuItems = (version: string): IContextualMenuItem[] => {
    return [
      {
        id: '__ProfileMenu_UserSettingsId',
        key: 'ProfileMenu_UserSettings',
        text: 'Settings',
        onClick: handleSettings,
      },
      { id: '__Logout_button', key: 'ProfileMenu_Logout', text: 'Logout', onClick: handleLogout },
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
  };

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
        <ButtonContextual id="__ButtonContext" items={items}>
          <UserToken id="__UserToken" name={SessionStore.user.firstName} />
        </ButtonContextual>
      )}
    </StyledBox>
  );
};

_ProfileMenu.defaultProps = defaultProps;

const ProfileMenu = React.memo(_ProfileMenu);

export { ProfileMenu };
