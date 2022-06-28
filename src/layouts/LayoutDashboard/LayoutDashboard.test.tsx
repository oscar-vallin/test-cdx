import { BrowserRouter as Router } from 'react-router-dom';
import { mockUseActiveDomainStore } from 'src/utils/mockActiveDomainStore';
import { StoreProvider } from 'easy-peasy';
import store from 'src/store';
import { ApolloContextProvider } from 'src/contexts/ApolloContext';
import { mountWithTheme } from 'src/utils/testUtils';
import { LayoutDashboard } from './LayoutDashboard';

jest.mock('src/store/ActiveDomainStore', () => ({
  useActiveDomainStore: mockUseActiveDomainStore,
}));

describe('Layout Login Container Testing Unit...', () => {
  it('Layout', () => {
    const wrapper = mountWithTheme(
      <StoreProvider store={store}>
        <ApolloContextProvider bypassLoading={true}>
          <Router>
            <LayoutDashboard id="__TestLayout">
              <p id="__hello">Hello</p>
            </LayoutDashboard>
          </Router>
        </ApolloContextProvider>
      </StoreProvider>
    );

    expect(wrapper.find('Box[id="__TestLayout__Box"]')).toHaveLength(1);
    expect(wrapper.find('AppHeader')).toHaveLength(1);
    expect(wrapper.find('LeftNav')).toHaveLength(1);
    expect(wrapper.find('#__hello')).toHaveLength(1);
  });
});
