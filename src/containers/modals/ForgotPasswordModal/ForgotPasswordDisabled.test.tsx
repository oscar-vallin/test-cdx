import { StoreProvider } from 'easy-peasy';
import { mountWithTheme } from 'src/utils/testUtils';
import store from 'src/store/index';
import { ForgotPasswordModal } from './ForgotPasswordModal';

jest.mock('src/data/services/graphql', () => ({
  useForgotPasswordMutation: () => [
    jest.fn(async () => {}),
    {
      data: {
        forgotPassword: {},
      },
    },
  ],
  useBeginLoginMutation: () => [
    jest.fn(async () => {}),
    {
      data: {
        beginLogin: {
          forgotPasswordEnabled: false,
          forgotPasswordMsg: '<p>Please call (800)-555-5555</p>',
        },
      },
      loading: false,
    },
  ],
}));

describe('Forgot Password Disabled', () => {
  it('Only receive a dialog with a message', () => {
    const onOpen = jest.fn();
    const wrapper = mountWithTheme(
      <StoreProvider store={store}>
        <ForgotPasswordModal open={true} isOpen={onOpen} currentUserId="jim@example.com" />
      </StoreProvider>
    );

    expect(wrapper.find('input[id="emailVerify"]')).toHaveLength(0);
    expect(wrapper.find('button[id="__ForgotPassword_submit_button"]')).toHaveLength(0);
    expect(wrapper.find('button[id="__ForgotPassword_message_ok_button"]')).toHaveLength(1);

    expect(wrapper.find('div[id="__ForgotPasswordDisabled_Msg"]')).toHaveLength(1);
  });
});
