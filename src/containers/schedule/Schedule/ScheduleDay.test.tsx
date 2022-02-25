import { mountWithTheme } from 'src/utils/testUtils';
import { ScheduleDay } from './ScheduleDay';

const defaultProps = {
  id: '',
  selectedDate: new Date(),
  currentDate: new Date(),
  items: []
};

jest.mock('src/hooks/useOrgSid', () => ({
  useOrgSid: () => ({
    orgSid: 1,
  }),
}));

describe('Schedule Day Container...', () => {
  // const themedComponent = shallowWithTheme(<Component {...defaultProps} />);
  const themedMount = mountWithTheme(<ScheduleDay {...defaultProps} />);

  it('Should be defined', () => {
    // expect(themedComponent).toBeDefined();
    expect(themedMount).toBeDefined();
  });

  it('Should render correctly', () => {
    // expect(themedComponent).toMatchSnapshot();
    expect(themedMount).toMatchSnapshot();
  });
});
