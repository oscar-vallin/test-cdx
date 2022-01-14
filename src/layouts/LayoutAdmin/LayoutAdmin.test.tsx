import Component from './LayoutAdmin';
import { mountWithTheme } from 'src/utils/testUtils';
import { StoreProvider } from 'easy-peasy';
import store from 'src/store';
import { ApolloContextProvider } from 'src/contexts/ApolloContext';
import { BrowserRouter as Router } from 'react-router-dom';

const defaultProps = {
  id: '',
};

describe('Layout Login Container Testing Unit...', () => {
  const themedComponent = mountWithTheme(
    <StoreProvider store={store}>
      <ApolloContextProvider bypassLoading={true}>
        <Router>
          <Component {...defaultProps}/>
        </Router>
      </ApolloContextProvider>
    </StoreProvider>
  );
  const mountedComponent = mountWithTheme(
    <StoreProvider store={store}>
      <ApolloContextProvider>
        <Router>
          <Component {...defaultProps}/>
        </Router>
      </ApolloContextProvider>
    </StoreProvider>
  );

  it('Should be defined', () => {
    expect(themedComponent).toBeDefined();
    expect(mountedComponent).toBeDefined();
  });
});
