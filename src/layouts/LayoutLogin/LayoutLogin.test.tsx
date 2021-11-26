import Component from './LayoutLogin';
import { mountWithTheme, shallowWithTheme } from '../../utils/testUtils';

const defaultProps = {
  id: '',
};

describe('Layout Login Container Testing Unit...', () => {
  const themedComponent = shallowWithTheme(<Component {...defaultProps}></Component>);
  const mountedComponent = mountWithTheme(<Component {...defaultProps}></Component>);

  it('Should be defined', () => {
    expect(themedComponent).toBeDefined();
    expect(mountedComponent).toBeDefined();
  });

  it('Should render correctly', () => {
    expect(mountedComponent).toMatchSnapshot();
    expect(mountedComponent).toMatchSnapshot();
  });
});
