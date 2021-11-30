import { mount } from 'enzyme';
import { mountWithTheme, shallowWithTheme } from '../../../utils/testUtils';
import { Schedule as Component } from './Schedule';
import { ApolloContextProvider } from '../../../contexts/ApolloContext';
import { StoreProvider } from 'easy-peasy';
import store from '../../../store/index';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    pathname: 'localhost:3000/file-status?orgSid=1',
  }),
}));

const defaultProps = {};

describe('Schedule tests ...', () => {
  const mountedComponent = mountWithTheme(
    <StoreProvider store={store}>
      <ApolloContextProvider>
        <Component {...defaultProps} id="__ScheduleMonthId"></Component>
      </ApolloContextProvider>
    </StoreProvider>
  );

  it('Should be defined', () => {
    expect(mountedComponent).toBeDefined();
  });

  it('Should render correctly', () => {
    expect(mountedComponent).toMatchSnapshot();
  });

  it('Should contain Calendar Body', () => {
    mountedComponent.find('#__ScheduleMonthId-CalendarBody');
    expect(mountedComponent.length).toBe(1);
    // expect(wrapper).toMatchSnapshot();
  });
});
