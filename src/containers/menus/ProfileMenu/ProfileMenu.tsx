import { ReactElement, useEffect, useState } from 'react';
import { UserToken } from 'src/components/images/UserToken';

import { StyledBox } from './ProfileMenu.styles';
import { ButtonContextual } from 'src/components/buttons/ButtonContextual';

import { useLogoutUseCase } from 'src/use-cases/Authentication';
import { useSessionStore } from 'src/store/SessionStore';
import { IContextualMenuItem } from '@fluentui/react';
import { ErrorHandler } from 'src/utils/ErrorHandler';
import { useVersionQuery } from 'src/data/services/graphql';

const defaultProps = {
  id: '',
};

type ProfileMenuProps = {
  id?: string;
  onUserSettings?: any | null;
} & typeof defaultProps;

const ProfileMenu = ({ id, onUserSettings }: ProfileMenuProps): ReactElement => {
  const SessionStore = useSessionStore();
  const { performUserLogout } = useLogoutUseCase();
  const { data: verData, loading: verLoading, error: versionError } = useVersionQuery();
  const handleError = ErrorHandler();

  useEffect(() => {
    handleError(versionError);
  }, [versionError]);

  const handleLogout = () => {
    performUserLogout();
  };

  const handleSettings = () => {
    onUserSettings();
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
        id: '__seperator',
        key: 'ProfileMenu_Seperator',
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
    if (verData?.version && !verLoading) {
      setItems(buildMenuItems(verData?.version));
    }
  }, [verData, verLoading]);

  // Render
  return (
    <StyledBox id={id} noStyle>
      {items.length > 0 && (
        <ButtonContextual id="__ButtonContext" items={items}>
          <UserToken id="__UserToken" name={SessionStore.user.firstNm} />
        </ButtonContextual>
      )}
    </StyledBox>
  );
};

ProfileMenu.defaultProps = defaultProps;

export { ProfileMenu };
