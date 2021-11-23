import { shallow } from 'enzyme';
import { MainMenu as Component } from './MainMenu';
import { StoreProvider } from 'easy-peasy';
import store from '../../../store/index';

const defaultProps = { id: '', left: false, changeCollapse: () => null, option: '' };

describe('Image', () => {
  const tree = shallow(
    <StoreProvider store={store}>
      <Component {...defaultProps} />
    </StoreProvider>
  );

  it('Should be defined', () => {
    expect(Component).toBeDefined();
  });

  it('Should render correctly', () => {
    expect(Component).toMatchSnapshot();
  });
});
