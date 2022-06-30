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
          forgotPasswordEnabled: true,
        },
      },
      loading: false,
    },
  ],
}));

describe('Forgot Password Enabled and we can type in our email address', () => {
  it('Enter in User Id', () => {
    const onOpen = jest.fn();
    const wrapper = mountWithTheme(
      <StoreProvider store={store}>
        <ForgotPasswordModal open={true} isOpen={onOpen} currentUserId="jim@example.com" />
      </StoreProvider>
    );

    expect(wrapper.find('input[id="emailVerify"]')).toHaveLength(1);
    expect(wrapper.find('button[id="__ForgotPassword_submit_button"]')).toHaveLength(1);
    expect(wrapper.find('button[id="__ForgotPassword_submit_button"]').props().disabled).toBeTruthy();
    expect(wrapper.find('span[id="__ForgotPassword_error"]')).toHaveLength(0);

    // Type in a mis matched email
    wrapper.find('input[id="emailVerify"]').simulate('change', { target: { value: 'jim@unmatched.com' } });
    expect(wrapper.find('button[id="__ForgotPassword_submit_button"]').props().disabled).toBeFalsy();
    wrapper.find('button[id="__ForgotPassword_submit_button"]').simulate('click');
    expect(wrapper.find('span[id="__ForgotPassword_error"]')).toHaveLength(1);
    expect(wrapper.find('span[id="__ForgotPassword_error"]').text()).toEqual(
      'The email address must match the login address you entered'
    );

    // Re Type in the email
    wrapper.find('input[id="emailVerify"]').simulate('change', { target: { value: 'jim@example.com' } });
    expect(wrapper.find('button[id="__ForgotPassword_submit_button"]').props().disabled).toBeFalsy();
    wrapper.find('button[id="__ForgotPassword_submit_button"]').simulate('click');
    expect(wrapper.find('span[id="__ForgotPassword_error"]')).toHaveLength(0);

    // Close the dialog
    wrapper.find('button[id="__ForgotPassword_cancel_button"]').simulate('click');
    expect(wrapper.find('Dialog').at(0).props().hidden).toBeTruthy();
  });
});
