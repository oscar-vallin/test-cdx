import AdminErrorBoundary from './AdminErrorBoundary';
import { mountWithTheme, shallowWithTheme } from '../../../utils/testUtils';
import { StoreProvider } from 'easy-peasy';
import { ApolloContextProvider } from '../../../contexts/ApolloContext';
import { shallow } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import store from '../../../store/index';

const defaultProps = {
  id: 'AdminErrorBoundary',
  menuOptionSelected: 'admin',
  sidebarOptionSelected: '',
};

describe('AdminErrorBoundary Testing Unit...', () => {
  const tree = shallowWithTheme(
    <StoreProvider store={store}>
      <AdminErrorBoundary {...defaultProps}></AdminErrorBoundary>
    </StoreProvider>
  );

  it('Should be defined', () => {
    expect(AdminErrorBoundary).toBeDefined();
  });

  it('Should render correctly', () => {
    expect(tree).toMatchSnapshot();
  });

  it('Should find the Id AdminErrorBoundary', () => {
    const wrapper = mountWithTheme(
      <StoreProvider store={store}>
        <ApolloContextProvider>
          <Router>
            <AdminErrorBoundary {...defaultProps}></AdminErrorBoundary>
          </Router>
        </ApolloContextProvider>
      </StoreProvider>
    );
    const searchId = wrapper.find('#AdminErrorBoundary').first();
    expect(searchId.length).toBe(1);
  });
});
