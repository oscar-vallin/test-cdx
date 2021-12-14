import { ProfileMenu } from './ProfileMenu';
import { shallowWithTheme, mountWithTheme } from '../../../utils/testUtils';
import store from '../../../../src/store/index';
import { StoreProvider } from 'easy-peasy';
import { ApolloProvider, ApolloClient } from '@apollo/client';

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
    const dummyClient = {} as ApolloClient<any>;
    const tree = mountWithTheme(
      <ApolloProvider client={dummyClient}>
        <StoreProvider store={store}>
          <ProfileMenu {...defaultProps}></ProfileMenu>);
        </StoreProvider>
      </ApolloProvider>
    );

    const btns = tree.find('button[id="__ButtonContext"]');
    btns.simulate('click');
    expect(btns.length).toBe(1);
  });
});
