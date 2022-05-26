import { ForgotPasswordModal } from './ForgotPasswordModal';
import { mountWithTheme } from 'src/utils/testUtils';
import { StoreProvider } from 'easy-peasy';
import { ApolloContextProvider } from 'src/contexts/ApolloContext';
import store from 'src/store/index';

const defaultProps = {
  open: true,
  isOpen: (data: boolean) => {},
  currentUserId: ''
};

describe('Forgot Password...', () => {
  const tree = mountWithTheme(
    <StoreProvider store={store}>
      <ApolloContextProvider bypassLoading={true}>
        <ForgotPasswordModal {...defaultProps} />
      </ApolloContextProvider>
    </StoreProvider>
  );

  it('Should be defined', () => {
    expect(ForgotPasswordModal).toBeDefined();
  });

  it('the modal should be closed', () => {
    const wrapper = mountWithTheme(
      <StoreProvider store={store}>
        <ApolloContextProvider bypassLoading={true}>
          <ForgotPasswordModal {...defaultProps} />
        </ApolloContextProvider>
      </StoreProvider>
    );
    wrapper.find('button[id="forgotPaswwordModal-cancel-button"]').simulate('click');
    expect(tree).toMatchSnapshot();
  });

  it('it should show another modal where it is indicated that an email was sent', () => {
    const wrapper = mountWithTheme(
      <StoreProvider store={store}>
        <ApolloContextProvider bypassLoading={true}>
          <ForgotPasswordModal {...defaultProps} />
        </ApolloContextProvider>
      </StoreProvider>
    );
    wrapper.find('button[id="forgotPaswwordModal-submit-button"]').simulate('click');
    expect(tree).toMatchSnapshot();
  });
});
