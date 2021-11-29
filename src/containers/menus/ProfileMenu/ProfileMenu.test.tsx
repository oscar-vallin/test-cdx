import { ProfileMenu } from './ProfileMenu';
import { shallowWithTheme, mountWithTheme } from '../../../utils/testUtils';
import store from '../../../../src/store/index';
import { StoreProvider } from 'easy-peasy';
import { ROUTE_ACTIVITY_CURRENT, ROUTE_USER_SETTINGS } from '../../../data/constants/RouteConstants';

const defaultProps = {
  id: '__ButtonContext',
  onUserSettings: () => {},
};

describe('Profile Menu Testing Unit...', () => {
  const tree = shallowWithTheme(<ProfileMenu {...defaultProps}></ProfileMenu>);

  it('Should be defined', () => {
    expect(ProfileMenu).toBeDefined();
  });

  it('Should render correctly', () => {
    expect(tree).toMatchSnapshot();
  });

  it('Should sink in the button ButtonContext', () => {
    const tree = mountWithTheme(
      <StoreProvider store={store}>
        <ProfileMenu {...defaultProps}></ProfileMenu>);
      </StoreProvider>
    );

    const btns = tree.find('button[id="__ButtonContext"]');
    btns.simulate('click');
    expect(btns.length).toBe(1);
  });
});
