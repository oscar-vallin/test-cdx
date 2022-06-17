import { ProfileMenu } from './ProfileMenu';
import { shallowWithTheme, mountWithTheme } from 'src/utils/testUtils';
import store from 'src/store/index';
import { StoreProvider } from 'easy-peasy';
import { ApolloProvider, ApolloClient } from '@apollo/client';

const defaultProps = {
  id: '__ButtonContext',
  onUserSettings: () => {},
};

jest
  .mock('src/data/services/graphql', () => ({
    useVersionQuery: () => ({
      version: '2.0.0.TEST',
    }),
    useVersionLazyQuery: () => ([
      jest.fn(),
      {
        data: {
          version: '2.0.0.TEST',
        },
        loading: false,
        error: null,
      }
    ]),
  }))
  .mock('src/use-cases/Authentication', () => ({
    useLogoutUseCase: () => ({
      performUserLogout: jest.fn(),
    }),
  }))
  .mock('src/utils/ErrorHandler', () => ({
    ErrorHandler: () => jest.fn(),
  }));

describe('Profile Menu Testing Unit...', () => {
  const tree = shallowWithTheme(<ProfileMenu {...defaultProps} />);

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
          <ProfileMenu {...defaultProps} />
          );
        </StoreProvider>
      </ApolloProvider>
    );

    setTimeout(() => {
      const btns = tree.find('button[id="__ButtonContext"]');
      btns.simulate('click');
      expect(btns.length).toBe(1);
    }, 1000);
  });
});
