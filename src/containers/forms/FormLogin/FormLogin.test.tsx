import { FormLogin } from './FormLogin';
import { shallowWithTheme, mountWithTheme } from '../../../utils/testUtils';
import { SessionContextProvider } from '../../../contexts/SessionContext';
import { shallow } from 'enzyme';
import { ApolloContextProvider } from '../../../contexts/ApolloContext';
import { BrowserRouter as Router } from 'react-router-dom';
import { StoreProvider } from 'easy-peasy';
import store from '../../../store/index';

const defaultProps = {
  id: '__FormLogin',
};

describe('FormLogin Testing Unit...', () => {
  const tree = shallowWithTheme(
    <StoreProvider store={store}>
      <FormLogin {...defaultProps}></FormLogin>
    </StoreProvider>
  );

  it('Should be defined', () => {
    expect(FormLogin).toBeDefined();
  });

  it('Should render correctly', () => {
    expect(tree).toMatchSnapshot();
  });

  it('Should show an alert with message "Save" when click on Save button', () => {
    const wrapper = shallow(
      <StoreProvider store={store}>
        <FormLogin {...defaultProps}></FormLogin>
      </StoreProvider>
    );
    wrapper.find('StyledBox[id="FormLoginId"]');
    expect(wrapper).toMatchSnapshot();
  });

  it('Should find the input to enter the Email', () => {
    const wrapper = mountWithTheme(
      <StoreProvider store={store}>
        <ApolloContextProvider>
          <FormLogin {...defaultProps} id="__FormLogin"></FormLogin>
        </ApolloContextProvider>
      </StoreProvider>
    );
    const inputValue = 'user@email.com';
    const input = wrapper.find('input[id="__FormLogin__Card__Row__Input-Email"]').first();
    input.simulate('change', {
      target: { value: inputValue },
    });
    expect(input.length).toEqual(1);
  });

  it('Should sink in the button Next', () => {
    const wrapper = mountWithTheme(
      <StoreProvider store={store}>
        <ApolloContextProvider>
          <Router>
            <FormLogin {...defaultProps}></FormLogin>
          </Router>
        </ApolloContextProvider>
      </StoreProvider>
    );
    const largeBtn = wrapper.find('button[id="__FormLogin__Card__Row__Column__Button--Button"]');
    largeBtn.simulate('click');
    expect(largeBtn.length).toBe(1);
  });
});
