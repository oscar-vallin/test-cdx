import { mount, shallow } from 'enzyme';
import { MainMenu as Component } from './MainMenu';
import { StoreProvider } from 'easy-peasy';
import { mountWithTheme } from '../../../utils/testUtils';
import store from '../../../store/index';
import { BrowserRouter as Router } from 'react-router-dom';

const defaultProps = { id: '__MainMenu', left: false, changeCollapse: () => null, option: '' };

describe('MainMenu Testing Unit...', () => {
  const tree = shallow(
    <StoreProvider store={store}>
      <Component {...defaultProps} />
    </StoreProvider>
  );

  it('Should be defined', () => {
    expect(Component).toBeDefined();
  });

  it('Should render correctly', () => {
    expect(Component).toMatchSnapshot();
  });

  it('Should sink in the button with Id __MainMenu', () => {
    const tree = mountWithTheme(
      <StoreProvider store={store}>
        <Router>
          <Component {...defaultProps}></Component>);
        </Router>
      </StoreProvider>
    );

    const btns = tree.find('button[id="__MainMenu"]');
    btns.simulate('click');
    expect(btns.length).toBe(1);
  });
});
