import { NavBar } from './NavBar';
import { shallowWithTheme, renderWithTheme, mountWithTheme } from '../../../utils/testUtils';
import { shallow, mount } from 'enzyme';
import store from '../../../../src/store/index';
import { StoreProvider } from 'easy-peasy';
import { ApolloContextProvider } from '../../../contexts/ApolloContext';
import { BrowserRouter as Router } from 'react-router-dom';

const defaultProps = {
  id: 'NavBar_Id',
  menuOptionSelected: 'dashboard',
  onUserSettings: () => {},
  visible: true,
};

describe('Badge Testing Unit...', () => {
  const tree = shallowWithTheme(
    <StoreProvider store={store}>
      <NavBar {...defaultProps}></NavBar>
    </StoreProvider>
  );

  it('Should be defined', () => {
    expect(NavBar).toBeDefined();
  });

  it('Should render correctly', () => {
    expect(tree).toMatchSnapshot();
  });

  it('Should return null if progressItem does not exist', () => {
    const tree = shallowWithTheme(<NavBar {...defaultProps} visible={false}></NavBar>);
    expect(tree).toMatchSnapshot();
  });

  it('Should find table with Id TableAccessManagementGroupsId', () => {
    const wrapper = shallow(
      <StoreProvider store={store}>
        <NavBar {...defaultProps}></NavBar>
      </StoreProvider>
    );
    wrapper.find('StyledBox[id="NavBar_Id"]');
    expect(wrapper).toMatchSnapshot();
  });

  it('Should sink in the button Small Font Size', () => {
    const wrapper = mountWithTheme(
      <StoreProvider store={store}>
        <ApolloContextProvider>
          <Router>
            <NavBar {...defaultProps}></NavBar>);
          </Router>
        </ApolloContextProvider>
      </StoreProvider>
    );

    const btns = wrapper.find('button[id="__ProfileMenu_Font_Buttons"]');
    btns.simulate('click');
    const smallBtn = wrapper.find('button[id="__Small_Font_Size_Btn"]');
    smallBtn.simulate('click');
    expect(smallBtn.length).toBe(1);
  });

  it('Should sink in the button Medium Font Size', () => {
    const wrapper = mountWithTheme(
      <StoreProvider store={store}>
        <ApolloContextProvider>
          <Router>
            <NavBar {...defaultProps}></NavBar>);
          </Router>
        </ApolloContextProvider>
      </StoreProvider>
    );

    const btns = wrapper.find('button[id="__ProfileMenu_Font_Buttons"]');
    btns.simulate('click');
    const mediumBtn = wrapper.find('button[id="__Medium_Font_Size_Btn"]');
    mediumBtn.simulate('click');
    expect(mediumBtn.length).toBe(1);
  });

  it('Should sink in the button Large Font Size', () => {
    const wrapper = mountWithTheme(
      <StoreProvider store={store}>
        <ApolloContextProvider>
          <Router>
            <NavBar {...defaultProps}></NavBar>);
          </Router>
        </ApolloContextProvider>
      </StoreProvider>
    );

    const btns = wrapper.find('button[id="__ProfileMenu_Font_Buttons"]');
    btns.simulate('click');
    const largeBtn = wrapper.find('button[id="__Large_Font_Size_Btn"]');
    largeBtn.simulate('click');
    expect(largeBtn.length).toBe(1);
  });
});
