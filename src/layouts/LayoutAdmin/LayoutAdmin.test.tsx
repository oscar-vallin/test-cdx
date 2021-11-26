import Component from './LayoutAdmin';
import { mountWithTheme, shallowWithTheme } from '../../utils/testUtils';
import { StoreProvider } from 'easy-peasy';
import store from 'src/store';

const defaultProps = {
  id: '',
};

describe('Layout Login Container Testing Unit...', () => {
  const themedComponent = shallowWithTheme(
    <StoreProvider store={store}>
      <Component {...defaultProps}></Component>
    </StoreProvider>
  );
  const mountedComponent = mountWithTheme(
    <StoreProvider store={store}>
      <Component {...defaultProps}></Component>
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
