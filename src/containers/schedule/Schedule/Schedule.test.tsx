import { mount } from 'enzyme';
import { mountWithTheme, shallowWithTheme } from '../../../utils/testUtils';
import { Schedule as Component } from './Schedule';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    pathname: 'localhost:3000/file-status?orgSid=1',
  }),
}));

const defaultProps = {};

describe('Schedule tests ...', () => {
  const themedComponent = shallowWithTheme(<Component {...defaultProps} />);
  // const themedMount = mountWithTheme(<Component {...defaultProps} />);

  it('Should be defined', () => {
    expect(themedComponent).toBeDefined();
  });

  it('Should render correctly', () => {
    // expect(themedMount).toMatchSnapshot();
  });
});
