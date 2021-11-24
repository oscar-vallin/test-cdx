import { mount } from 'enzyme';
import { mountWithTheme, shallowWithTheme } from '../../../utils/testUtils';
import { ScheduleDay as Component } from './ScheduleDay';

const defaultProps = {
  id: '',
  selectedDate: new Date(),
  currentDate: new Date(),
};

describe('Schedule Day Container...', () => {
  // const themedComponent = shallowWithTheme(<Component {...defaultProps} />);
  const themedMount = mountWithTheme(<Component {...defaultProps} />);

  it('Should be defined', () => {
    // expect(themedComponent).toBeDefined();
    expect(themedMount).toBeDefined();
  });

  it('Should render correctly', () => {
    // expect(themedComponent).toMatchSnapshot();
    expect(themedMount).toMatchSnapshot();
  });
});
