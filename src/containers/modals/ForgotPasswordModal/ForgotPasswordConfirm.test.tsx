import { StoreProvider } from 'easy-peasy';
import { mountWithTheme } from 'src/utils/testUtils';
import store from 'src/store/index';
import { ForgotPasswordModal } from './ForgotPasswordModal';

jest.mock('src/data/services/graphql', () => ({
  useForgotPasswordMutation: () => [
    jest.fn(async () => {}),
    {
      data: {
        forgotPassword: {
          response: 'SUCCESS',
          responseMsg: 'Check yer email',
        },
      },
    },
  ],
  useBeginLoginMutation: () => [
    jest.fn(async () => {}),
    {
      data: {
        beginLogin: {
          forgotPasswordEnabled: true,
        },
      },
      loading: false,
    },
  ],
}));

describe('Forgot Password Enabled confirmation dialog', () => {
  it('Submit Forgot Password Confirmation', () => {
    const onOpen = jest.fn();
    const wrapper = mountWithTheme(
      <StoreProvider store={store}>
        <ForgotPasswordModal open={true} isOpen={onOpen} currentUserId="jim@example.com" />
      </StoreProvider>
    );

    // Confirmation Dialog should be shown
    expect(wrapper.find('button[id="__ForgotPassword_confirm_ok"]')).toHaveLength(1);
    expect(wrapper.find('span[id="__ForgotPassword_success"]')).toHaveLength(1);
    expect(wrapper.find('span[id="__ForgotPassword_success"]').text()).toEqual('Check yer email');

    wrapper.find('button[id="__ForgotPassword_confirm_ok"]').simulate('click');
  });
});
