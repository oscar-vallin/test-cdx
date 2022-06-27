// noinspection JSUnusedGlobalSymbols

import { mockUseActiveDomainStore } from 'src/utils/mockActiveDomainStore';
import { mountWithTheme } from 'src/utils/testUtils';
import { AppHeader } from './AppHeader';
import { mockLogouts } from 'src/containers/menus/ProfileMenu/ProfileMenu.test';
import store from 'src/store';
import { StoreProvider } from 'easy-peasy';
import { ApolloClient, ApolloProvider } from '@apollo/client';

const mockPush = jest.fn();
jest.mock('react-router', () => ({
  useHistory: () => ({
    push: mockPush,
  }),
  useLocation: () => ({
    pathname: 'active-users',
  }),
}));
jest.mock('src/store/ThemeStore', () => ({
  useThemeStore: () => ({
    userTheme: {
      themeFontSize: '.0875em',
    },
  }),
}));
jest.mock('src/store/ActiveDomainStore', () => ({
  useActiveDomainStore: mockUseActiveDomainStore,
}));
jest.mock('src/hooks/useOrgSid', () => ({
  useOrgSid: () => ({
    orgSid: 8,
    startDate: '2020-11-01',
    endDate: '2020-11-03',
  }),
}));

const mockSetFontSize = jest.fn();
jest.mock('src/hooks/useCurrentUserTheme', () => ({
  useCurrentUserTheme: () => ({
    setFontSize: mockSetFontSize,
  }),
}));

mockLogouts();

describe('App Header Top Navigation', () => {
  it('Render the header', () => {
    const dummyClient = {} as ApolloClient<any>;
    const menuClick = jest.fn();
    const wrapper = mountWithTheme(
      <ApolloProvider client={dummyClient}>
        <StoreProvider store={store}>
          <AppHeader onMenuButtonClick={menuClick} />
        </StoreProvider>
      </ApolloProvider>
    );

    expect(wrapper.find('button[id="__AdminNavBtn"]')).toHaveLength(1);
    wrapper.find('button[id="__AdminNavBtn"]').simulate('click');
    expect(menuClick).toHaveBeenCalled();

    expect(wrapper.find('h2.HeaderBtnText__title').text()).toEqual('FMHP');
    expect(wrapper.find('small.HeaderBtnText__description').text()).toEqual('Farm Hop');

    expect(wrapper.find('button[id="__ProfileMenu_Home_button"]')).toHaveLength(1);

    expect(wrapper.find('button[id="__ProfileMenu_Font_Buttons"]')).toHaveLength(1);

    expect(wrapper.find('button[id="__FILE_STATUS_Tab"]')).toHaveLength(1);
    expect(wrapper.find('button[id="__ARCHIVES_Tab"]')).toHaveLength(1);
    expect(wrapper.find('button[id="__SCHEDULE_Tab"]')).toHaveLength(1);
    expect(wrapper.find('button[id="__TRANSMISSIONS_Tab"]')).toHaveLength(1);
    expect(wrapper.find('button[id="__ERRORS_Tab"]')).toHaveLength(1);
    // Click a tab
    wrapper.find('button[id="__FILE_STATUS_Tab"]').simulate('click');
    expect(mockPush).toHaveBeenCalled();

    expect(wrapper.find('div[id="__ProfileMenu"]')).toHaveLength(1);
    wrapper.find('button[id="__ButtonContext"]').simulate('click');
    wrapper.find('button[id="__ProfileMenu_UserSettingsId"]').simulate('click');
    expect(mockPush).toHaveBeenCalledTimes(2);

    // Change the font size
    wrapper.find('button[id="__ProfileMenu_Font_Buttons"]').simulate('click');
    wrapper.find('button[id="__Small_Font_Size_Btn"]').simulate('click');
    expect(mockSetFontSize).toHaveBeenCalled();
    wrapper.find('button[id="__ProfileMenu_Font_Buttons"]').simulate('click');
    wrapper.find('button[id="__Medium_Font_Size_Btn"]').simulate('click');
    expect(mockSetFontSize).toHaveBeenCalledTimes(2);
    wrapper.find('button[id="__ProfileMenu_Font_Buttons"]').simulate('click');
    wrapper.find('button[id="__Large_Font_Size_Btn"]').simulate('click');
    expect(mockSetFontSize).toHaveBeenCalledTimes(3);
  });
});
