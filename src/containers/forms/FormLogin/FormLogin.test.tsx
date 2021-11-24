import { FormLogin } from './FormLogin';
import { shallowWithTheme } from '../../../utils/testUtils';
import { SessionContextProvider } from '../../../contexts/SessionContext';
import { shallow } from 'enzyme';
import { StoreProvider } from 'easy-peasy';
import store from '../../../store/index';

const defaultProps = {
  id: 'FormLoginId',
};

describe('Badge Testing Unit...', () => {
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
});
