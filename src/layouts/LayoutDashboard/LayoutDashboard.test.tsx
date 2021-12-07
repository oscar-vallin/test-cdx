import Component from './LayoutDashboard';
import { mountWithTheme, shallowWithTheme } from '../../utils/testUtils';
import { StoreProvider } from 'easy-peasy';
import store from 'src/store';
import { ApolloContextProvider } from 'src/contexts/ApolloContext';
import { BrowserRouter as Router } from 'react-router-dom';

const defaultProps = {
  id: '',
};

describe('Layout Login Container Testing Unit...', () => {
  const themedComponent = shallowWithTheme(
    <StoreProvider store={store}>
      <ApolloContextProvider>
        <Router>
          <Component {...defaultProps}></Component>
        </Router>
      </ApolloContextProvider>
    </StoreProvider>
  );
  const mountedComponent = mountWithTheme(
    <StoreProvider store={store}>
      <ApolloContextProvider>
        <Router>
          <Component {...defaultProps}></Component>
        </Router>
      </ApolloContextProvider>
    </StoreProvider>
  );

  it('Should be defined', () => {
    expect(themedComponent).toBeDefined();
    expect(mountedComponent).toBeDefined();
  });

  it('Should render correctly', () => {
    expect(mountedComponent).toMatchSnapshot();
    expect(mountedComponent).toMatchSnapshot();
  });
});