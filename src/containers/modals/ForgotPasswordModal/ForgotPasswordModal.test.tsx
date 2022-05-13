import { ForgotPasswordModal } from './ForgotPasswordModal';
import { mountWithTheme } from '../../../utils/testUtils';
import { StoreProvider } from 'easy-peasy';
import { ApolloContextProvider } from 'src/contexts/ApolloContext';
import store from 'src/store/index';

const defaultProps = {
  open: true,
  isOpen: (data: boolean) => {}
};

describe('Forgot Password...', () => {
  const tree = mountWithTheme(
    <StoreProvider store={store}>
      <ApolloContextProvider bypassLoading={true}>
        <ForgotPasswordModal {...defaultProps}/>
      </ApolloContextProvider>
    </StoreProvider>
  )

  
  it('Should be defined', () => {
    expect(ForgotPasswordModal).toBeDefined();
  });
  
  it('Should show an alert with message "Cancel" when click on Cancel button', () => {
    const wrapper = mountWithTheme(
      <StoreProvider store={store}>
        <ApolloContextProvider bypassLoading={true}>
          <ForgotPasswordModal {...defaultProps}/>
        </ApolloContextProvider>
      </StoreProvider>
    );
    wrapper.find('button[id="forgotPaswwordModal-cancel-button"]').simulate('click');
    expect(tree).toMatchSnapshot();
  });

  it('Should show an alert with message "Submit" when click on Submit button', () => {
    const wrapper = mountWithTheme(
      <StoreProvider store={store}>
        <ApolloContextProvider bypassLoading={true}>
          <ForgotPasswordModal {...defaultProps}/>
        </ApolloContextProvider>
      </StoreProvider>
    );
    wrapper.find('button[id="forgotPaswwordModal-submit-button"]').simulate('click');
    expect(tree).toMatchSnapshot();
  });
  
  });
