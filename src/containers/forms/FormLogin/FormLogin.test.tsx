import { FormLogin } from './FormLogin';
import { shallowWithTheme, mountWithTheme } from 'src/utils/testUtils';
import { shallow } from 'enzyme';
import { ApolloContextProvider } from 'src/contexts/ApolloContext';
import { BrowserRouter as Router } from 'react-router-dom';
import { StoreProvider } from 'easy-peasy';
import store from 'src/store/index';

const defaultProps = {
  id: '__FormLogin',
};

describe('FormLogin Testing Unit...', () => {
  const tree = shallowWithTheme(
    <StoreProvider store={store}>
      <FormLogin {...defaultProps} />
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
        <FormLogin {...defaultProps} />
      </StoreProvider>
    );
    wrapper.find('StyledBox[id="FormLoginId"]');
    expect(wrapper).toMatchSnapshot();
  });

  it('Should find the input to enter the Email', () => {
    const wrapper = mountWithTheme(
      <StoreProvider store={store}>
        <ApolloContextProvider bypassLoading={true}>
          <FormLogin {...defaultProps} id="__FormLogin" />
        </ApolloContextProvider>
      </StoreProvider>
    );
    const inputValue = 'user@email.com';
    const input = wrapper.find('#__FormLogin__Card__Row__Input-Email').first();
    input.simulate('change', {
      target: { value: inputValue },
    });
    expect(input.length).toEqual(1);
  });

  it('Should sink in the button Next', () => {
    const wrapper = mountWithTheme(
      <StoreProvider store={store}>
        <ApolloContextProvider bypassLoading={true}>
          <Router>
            <FormLogin {...defaultProps} />
          </Router>
        </ApolloContextProvider>
      </StoreProvider>
    );
    const largeBtn = wrapper.find('button[id="__FormLogin__Card__Row__Column__Button--Button"]');
    largeBtn.simulate('click');
    expect(largeBtn.length).toBe(1);
  });
});
