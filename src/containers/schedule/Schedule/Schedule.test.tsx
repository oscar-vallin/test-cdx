import { mountWithTheme } from 'src/utils/testUtils';
import { Schedule as Component } from './Schedule';
import { ApolloContextProvider } from 'src/contexts/ApolloContext';
import { StoreProvider } from 'easy-peasy';
import store from 'src/store/index';

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
      <ApolloContextProvider bypassLoading={true}>
        <Component {...defaultProps} id="__ScheduleMonthId"/>
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
